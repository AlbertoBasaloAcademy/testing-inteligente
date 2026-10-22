import type { PageContext } from "../../shared/page.type.ts";
import { createRocketsClient, createRocketsStore, leaveToLogin } from "../rockets/rockets.api.ts";
import { createLaunchesClient } from "./launches.client.ts";
import { createLaunchesStore } from "./launches.store.ts";
import { mountLaunchForm } from "./launches.component.ts";
import type { Launch, LaunchInput } from "./launches.type.ts";

const priceFormat = new Intl.NumberFormat();
function createItem(launch: Launch) {
  const item = document.createElement("li");
  const price = priceFormat.format(launch.pricePerPassenger);
  item.textContent = `${launch.date} · ${launch.rocketName} · ${price} per passenger`;
  return item;
}
export async function mount(context: PageContext) {
  const store = createLaunchesStore(createLaunchesClient(context.services.http));
  const fleet = await createRocketsStore(createRocketsClient(context.services.http)).list();
  if (fleet.status === "unauthorized") return leaveToLogin(context);
  const heading = document.createElement("h1");
  heading.textContent = "Launches";
  const list = document.createElement("ul");
  list.setAttribute("aria-label", "Launches");
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  context.outlet.append(heading, list, status);
  async function refresh() {
    const state = await store.list();
    if (state.status === "unauthorized") return leaveToLogin(context);
    if (state.status === "unavailable") return void (status.textContent = "Launches unavailable");
    list.replaceChildren(...state.launches.map(createItem));
    status.textContent = state.launches.length ? "" : "No launches yet";
  }
  const rockets = fleet.status === "loaded" ? fleet.rockets : [];
  mountLaunchForm(context, {
    rockets,
    schedule: async (input: LaunchInput) => {
      const result = await store.schedule(input);
      if (result.status === "created") await refresh();
      return result;
    },
  });
  await refresh();
}
