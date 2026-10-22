import type { PageContext } from "../../shared/page.type.ts";
import { PlatformElement } from "../../shared/components/platform.element.ts";
import { escapeHtml } from "../../shared/html.escape.ts";
import { leaveToLogin } from "../rockets/rockets.api.ts";
import type { Rocket } from "../rockets/rockets.api.ts";
import type { LaunchInput, LaunchScheduleResult } from "./launches.type.ts";

class LaunchForm extends PlatformElement {}
function createTemplate(rockets: readonly Rocket[]) {
  const options = rockets
    .map((rocket) => `<option value="${escapeHtml(rocket.id)}">${escapeHtml(rocket.name)}</option>`)
    .join("");
  const template = document.createElement("template");
  template.innerHTML = `<h2>Schedule a launch</h2><p role="status" id="launch-result"></p><form>
<label>Rocket<select name="rocketId" required>${options}</select><small data-field="rocketId" role="status"></small></label>
<label>Date<input name="date" type="date" required><small data-field="date" role="status"></small></label>
<label>Price per passenger<input name="pricePerPassenger" type="number" step="any" required><small data-field="pricePerPassenger" role="status"></small></label>
<button type="submit">Schedule launch</button></form>`;
  return template;
}
function readInput(form: HTMLFormElement): LaunchInput {
  const data = new FormData(form);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  return {
    rocketId: text("rocketId"),
    date: text("date"),
    pricePerPassenger: Number(text("pricePerPassenger")),
  };
}
function showResult(element: LaunchForm, result: LaunchScheduleResult) {
  const output = element.querySelector("#launch-result");
  if (!output) return;
  if (result.status === "created") output.textContent = "Launch scheduled";
  if (result.status === "unavailable") output.textContent = "Launches unavailable";
  if (result.status !== "rejected") return;
  output.textContent = Object.keys(result.fields).length ? "" : result.message;
  for (const field of element.querySelectorAll<HTMLElement>("[data-field]"))
    field.textContent = result.fields[field.dataset.field ?? ""] ?? "";
}
export function mountLaunchForm(
  context: PageContext,
  options: {
    rockets: readonly Rocket[];
    schedule: (input: LaunchInput) => Promise<LaunchScheduleResult>;
  },
) {
  if (!customElements.get("launch-form")) customElements.define("launch-form", LaunchForm);
  const element = new LaunchForm();
  element.render(createTemplate(options.rockets));
  context.outlet.append(element);
  const form = element.querySelector("form");
  if (!form) throw new Error("Launch form template is incomplete");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    for (const field of element.querySelectorAll("[data-field]")) field.textContent = "";
    context.services.logger.action("schedule-launch", location.pathname);
    void options.schedule(readInput(form)).then((result) => {
      if (result.status === "unauthorized") return leaveToLogin(context);
      showResult(element, result);
      if (result.status === "created") form.reset();
    });
  });
}
