import type { PageContext } from "../../shared/page.type.ts";
import { PlatformElement } from "../../shared/components/platform.element.ts";
import { clearSession } from "../auth/auth.api.ts";
import { rocketRanges } from "./rockets.type.ts";
import type { RocketAddResult, RocketInput } from "./rockets.type.ts";

class RocketForm extends PlatformElement {}
const template = document.createElement("template");
template.innerHTML = `<h2>Add a rocket</h2><form>
<label>Name<input name="name" type="text" required><small data-field="name" role="status"></small></label>
<label>Capacity<input name="capacity" type="number" required><small data-field="capacity" role="status"></small></label>
<label>Range<select name="range" required>${rocketRanges.map((range) => `<option value="${range}">${range}</option>`).join("")}</select><small data-field="range" role="status"></small></label>
<button type="submit">Add rocket</button><p role="status" id="rocket-result"></p></form>`;

export function leaveToLogin(context: PageContext) {
  clearSession();
  context.services.navigation.navigate("/login?returnTo=" + encodeURIComponent(location.pathname));
}
function readInput(form: HTMLFormElement): RocketInput {
  const data = new FormData(form);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  return { name: text("name"), capacity: Number(text("capacity")), range: text("range") };
}
function showResult(element: RocketForm, result: RocketAddResult) {
  const output = element.querySelector("#rocket-result");
  if (!output) return;
  if (result.status === "created") output.textContent = "Rocket added";
  if (result.status === "unavailable") output.textContent = "Rockets unavailable";
  if (result.status !== "rejected") return;
  output.textContent = result.message;
  for (const field of element.querySelectorAll<HTMLElement>("[data-field]"))
    field.textContent = result.fields[field.dataset.field ?? ""] ?? "";
}
export function mountRocketForm(
  context: PageContext,
  add: (input: RocketInput) => Promise<RocketAddResult>,
) {
  if (!customElements.get("rocket-form")) customElements.define("rocket-form", RocketForm);
  const element = new RocketForm();
  element.render(template);
  context.outlet.append(element);
  const form = element.querySelector("form");
  if (!form) throw new Error("Rocket form template is incomplete");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    for (const field of element.querySelectorAll("[data-field]")) field.textContent = "";
    context.services.logger.action("add-rocket", location.pathname);
    void add(readInput(form)).then((result) => {
      if (result.status === "unauthorized") return leaveToLogin(context);
      showResult(element, result);
      if (result.status === "created") form.reset();
    });
  });
}
