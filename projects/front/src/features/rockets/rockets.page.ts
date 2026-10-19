import type { PageContext } from "../../shared/page.type.ts";
import { createRocketsClient } from "./rockets.client.ts";
import { createRocketsStore } from "./rockets.store.ts";
import { leaveToLogin, mountRocketForm } from "./rockets.component.ts";
import type { Rocket } from "./rockets.type.ts";

function createItem(rocket: Rocket) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.href = "/rockets/" + encodeURIComponent(rocket.id);
  link.textContent = rocket.name;
  item.append(link);
  return item;
}
export async function mount(context: PageContext) {
  const store = createRocketsStore(createRocketsClient(context.services.http));
  const heading = document.createElement("h1");
  heading.textContent = "Rockets";
  const list = document.createElement("ul");
  list.setAttribute("aria-label", "Rockets");
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  context.outlet.append(heading, list, status);
  async function refresh() {
    const state = await store.list();
    if (state.status === "unauthorized") return leaveToLogin(context);
    if (state.status === "unavailable") return void (status.textContent = "Rockets unavailable");
    list.replaceChildren(...state.rockets.map(createItem));
    status.textContent = state.rockets.length ? "" : "No rockets yet";
  }
  mountRocketForm(context, async (input) => {
    const result = await store.add(input);
    if (result.status === "created") await refresh();
    return result;
  });
  await refresh();
}
