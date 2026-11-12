import { ExpectedError } from "../../shared/error.type.ts";
import type { HttpClient } from "../../shared/http.type.ts";
import type { PageContext } from "../../shared/page.type.ts";
import { canManage, readUser } from "../auth/auth.store.ts";
import { createRocketsClient, createRocketsStore, leaveToLogin } from "../rockets/rockets.api.ts";
import { createLaunchesClient } from "./launches.client.ts";
import { mountLaunchForm } from "./launches.component.ts";
import { createStatusControls } from "./launches.status.component.ts";
import { createLaunchesStore } from "./launches.store.ts";
import type { Launch, LaunchInput, LaunchStatusResult, StatusChange } from "./launches.type.ts";

const priceFormat = new Intl.NumberFormat();
type Change = (id: string, change: StatusChange) => Promise<LaunchStatusResult>;
type SeatLaunch = Launch & { availableSeats: number };
function createStatus(launch: Launch) {
  const status = document.createElement("span");
  status.className = "record-badge";
  status.textContent = launch.status;
  if (launch.status !== "suspended") return [status];
  const suspension = document.createElement("small");
  suspension.textContent = ` ${launch.suspensionCause}: ${launch.suspensionMessage}`;
  return [status, suspension];
}
function appendManagement(item: HTMLElement, input: { launch: Launch; change: Change }) {
  const link = document.createElement("a");
  link.href = `/launches/${encodeURIComponent(input.launch.id)}/bookings`;
  link.textContent = "Passengers";
  item.append(
    " ",
    link,
    createStatusControls(input.launch, (statusChange) =>
      input.change(input.launch.id, statusChange),
    ),
  );
}
function createItem(launch: SeatLaunch, change: Change) {
  const item = document.createElement("li");
  const price = priceFormat.format(launch.pricePerPassenger);
  item.textContent = `${launch.date} · ${launch.rocketName} · ${price} per passenger · Available seats: ${launch.availableSeats} · `;
  item.append(...createStatus(launch));
  if (canManage(readUser())) appendManagement(item, { launch, change });
  return item;
}
async function loadSeat(http: HttpClient, launch: Launch): Promise<SeatLaunch> {
  const path = `/api/launches/${encodeURIComponent(launch.id)}/availability`;
  const data = (await (await http.request(path)).json()) as { availableSeats: number };
  return { ...launch, availableSeats: data.availableSeats };
}
function createElement(tag: string, attributes: Record<string, string>) {
  const element = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  return element;
}
export async function mount(context: PageContext) {
  const store = createLaunchesStore(createLaunchesClient(context.services.http));
  const fleet = await createRocketsStore(createRocketsClient(context.services.http)).list();
  if (fleet.status === "unauthorized") return leaveToLogin(context);
  const heading = document.createElement("h1");
  heading.textContent = "Launches";
  const error = createElement("p", { role: "status", id: "launch-status-error" });
  const list = createElement("ul", { "aria-label": "Launches" });
  const status = createElement("p", { role: "status" });
  context.outlet.append(heading, error, list, status);
  async function change(id: string, statusChange: StatusChange) {
    error.textContent = "";
    context.services.logger.action("change-launch-status", location.pathname);
    const result = await store.changeStatus(id, statusChange);
    if (result.status === "unauthorized") leaveToLogin(context);
    if (result.status === "changed") await refresh();
    if (result.status === "unavailable") error.textContent = "Launches unavailable";
    if (result.status === "rejected" && !Object.keys(result.fields).length)
      error.textContent = result.message;
    return result;
  }
  async function loadListedSeats(launches: readonly Launch[]) {
    try {
      return await Promise.all(launches.map((launch) => loadSeat(context.services.http, launch)));
    } catch (error) {
      if (error instanceof ExpectedError && error.details.status === 401) leaveToLogin(context);
      else status.textContent = "Launches unavailable";
      return undefined;
    }
  }
  async function refresh() {
    const state = await store.list();
    if (state.status === "unauthorized") return leaveToLogin(context);
    if (state.status === "unavailable") return void (status.textContent = "Launches unavailable");
    const launches = await loadListedSeats(state.launches);
    if (!launches) return;
    list.replaceChildren(...launches.map((launch) => createItem(launch, change)));
    status.textContent = launches.length ? "" : "No launches yet";
  }
  if (canManage(readUser())) {
    const rockets = fleet.status === "loaded" ? fleet.rockets : [];
    mountLaunchForm(context, {
      rockets,
      schedule: async (input: LaunchInput) => {
        const result = await store.schedule(input);
        if (result.status === "created") await refresh();
        return result;
      },
    });
  }
  await refresh();
}
