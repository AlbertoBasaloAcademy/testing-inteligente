import { ExpectedError } from "../../shared/error.type.ts";
import { escapeHtml } from "../../shared/html.escape.ts";
import type { PageContext } from "../../shared/page.type.ts";
import { leaveToLogin } from "../rockets/rockets.api.ts";

type Passenger = {
  name: string;
  nationality: string;
  identityDocument: string;
  email: string;
  phone: string;
};
type Availability = {
  status: string;
  capacity: number;
  availableSeats: number;
  bookings: Passenger[];
};
const labels = {
  name: "Name",
  nationality: "Nationality",
  identityDocument: "Identity document",
  email: "Email",
  phone: "Phone",
};
const keys = Object.keys(labels) as (keyof Passenger)[];
function formMarkup() {
  return `<form novalidate>${keys.map((key) => `<label>${labels[key]}<input name="${key}" type="${key === "email" ? "email" : "text"}" required><small data-field="${key}" role="status"></small></label>`).join("")}<button>Book passenger</button></form>`;
}
export async function mount(context: PageContext) {
  const path = `/api/launches/${encodeURIComponent(context.parameters.id ?? "")}/bookings`;
  const heading = document.createElement("h1");
  heading.textContent = "Passengers";
  const content = document.createElement("section");
  const error = document.createElement("p");
  error.setAttribute("role", "alert");
  const formArea = document.createElement("div");
  context.outlet.append(heading, content, error, formArea);
  async function refresh() {
    try {
      const data = (await (await context.services.http.request(path)).json()) as Availability;
      content.innerHTML = `<p>Rocket capacity: ${data.capacity} · Available seats: ${data.bookings.length}</p><ul>${data.bookings.map((booking) => `<li>${keys.map((key) => `${labels[key]}: ${escapeHtml(booking[key])}`).join(" · ")}</li>`).join("")}</ul>`;
      const allowed = data.status === "planned" || data.status === "confirmed";
      formArea.innerHTML =
        allowed && data.availableSeats > 0
          ? formMarkup()
          : `<p>${allowed ? "Launch is full" : "Launch does not permit bookings"}</p>`;
      formArea.querySelector("form")?.addEventListener("submit", submit);
    } catch (failure) {
      handleError(failure);
    }
  }
  function handleError(failure: unknown) {
    if (failure instanceof ExpectedError && failure.details.status === 401)
      return leaveToLogin(context);
    error.textContent = failure instanceof ExpectedError ? failure.message : "Bookings unavailable";
    if (failure instanceof ExpectedError)
      for (const field of formArea.querySelectorAll<HTMLElement>("[data-field]"))
        field.textContent = failure.details.fields?.[field.dataset.field ?? ""] ?? "";
  }
  async function submit(event: Event) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    error.textContent = "";
    try {
      await context.services.http.request(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      await refresh();
    } catch (failure) {
      if (failure instanceof ExpectedError && failure.details.status === 409) await refresh();
      handleError(failure);
    }
  }
  await refresh();
}
