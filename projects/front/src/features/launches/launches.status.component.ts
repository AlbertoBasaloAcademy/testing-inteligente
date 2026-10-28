import type { Launch, LaunchStatus, LaunchStatusResult, StatusChange } from "./launches.type.ts";

const ACTIONS: Record<LaunchStatus, [LaunchStatus, string][]> = {
  planned: [
    ["confirmed", "Confirm"],
    ["suspended", "Suspend"],
  ],
  confirmed: [
    ["successful", "Success"],
    ["failed", "Fail"],
    ["suspended", "Suspend"],
  ],
  successful: [],
  suspended: [],
  failed: [],
};
const SUSPEND_FORM = `<label>Cause<select name="suspensionCause" required>
<option value="weather">Weather</option><option value="technical">Technical</option><option value="economic">Economic</option>
</select><small data-field="suspensionCause" role="status"></small></label>
<label>Message<input name="suspensionMessage" required><small data-field="suspensionMessage" role="status"></small></label>
<button type="submit">Suspend launch</button>`;
type Change = (change: StatusChange) => Promise<LaunchStatusResult>;

function showFields(form: HTMLFormElement, result: LaunchStatusResult) {
  const fields = result.status === "rejected" ? result.fields : {};
  for (const field of form.querySelectorAll<HTMLElement>("[data-field]"))
    field.textContent = fields[field.dataset.field ?? ""] ?? "";
}
function readSuspension(form: HTMLFormElement): StatusChange {
  const data = new FormData(form);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  const suspensionCause = text("suspensionCause");
  return { status: "suspended", suspensionCause, suspensionMessage: text("suspensionMessage") };
}
function createSuspendForm(change: Change) {
  const form = document.createElement("form");
  form.hidden = true;
  form.setAttribute("aria-label", "Suspend launch");
  form.innerHTML = SUSPEND_FORM;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    void change(readSuspension(form)).then((result) => showFields(form, result));
  });
  return form;
}
function createButton(label: string, action: () => void) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", action);
  return button;
}
export function createStatusControls(launch: Launch, change: Change) {
  const controls = document.createElement("div");
  const actions = ACTIONS[launch.status];
  if (!actions.length) return controls;
  const form = createSuspendForm(change);
  const group = document.createElement("div");
  group.setAttribute("role", "group");
  for (const [status, label] of actions)
    group.append(
      createButton(label, () => {
        if (status === "suspended") form.hidden = false;
        else void change({ status });
      }),
    );
  controls.append(group, form);
  return controls;
}
