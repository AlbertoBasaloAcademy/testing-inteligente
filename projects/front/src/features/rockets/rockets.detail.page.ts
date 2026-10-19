import type { PageContext } from "../../shared/page.type.ts";
import { createRecordDetail } from "../../shared/components/record.detail.ts";
import { createRocketsClient } from "./rockets.client.ts";
import { createRocketsStore } from "./rockets.store.ts";
import { leaveToLogin } from "./rockets.component.ts";
import type { Rocket } from "./rockets.type.ts";

function describeRocket(rocket: Rocket) {
  return {
    title: rocket.name,
    subtitle: "Rocket",
    sections: [
      {
        heading: "Details",
        facts: [
          { label: "Name", kind: "text", value: rocket.name, key: "name" },
          { label: "Capacity", kind: "number", value: rocket.capacity, key: "capacity" },
          { label: "Range", kind: "text", value: rocket.range, key: "range" },
        ],
      },
    ],
  } as const;
}
export async function mount(context: PageContext) {
  const detail = createRecordDetail();
  detail.loading("Rocket");
  context.outlet.append(detail);
  const id = context.parameters.id;
  if (id === undefined) throw new Error("Rocket id parameter is missing");
  const state = await createRocketsStore(createRocketsClient(context.services.http)).read(id);
  if (state.status === "loaded") return detail.show(describeRocket(state.rocket));
  if (state.status === "unauthorized") return leaveToLogin(context);
  detail.fail("Rocket", state.status === "not-found" ? "Rocket not found" : "Rocket unavailable");
}
