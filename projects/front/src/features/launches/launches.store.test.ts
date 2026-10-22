import { expect, test } from "vite-plus/test";
import { createLaunchesStore } from "./launches.store.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Launch, LaunchesClient } from "./launches.type.ts";

const launch: Launch = {
  id: "1",
  rocketId: "r1",
  rocketName: "Falcon",
  date: "2026-11-01",
  pricePerPassenger: 100,
};
function failing(details: ExpectedError["details"]): LaunchesClient {
  const fail = async () => {
    throw new ExpectedError(details);
  };
  return { list: fail, schedule: fail };
}

test("launches store returns the loaded launches and the scheduled launch", async () => {
  const store = createLaunchesStore({ list: async () => [launch], schedule: async () => launch });
  expect(await store.list()).toStrictEqual({ status: "loaded", launches: [launch] });
  expect(await store.schedule(launch)).toStrictEqual({ status: "created", launch });
});
test("launches store reports a missing token or session as unauthorized", async () => {
  const store = createLaunchesStore(failing({ status: 401, message: "Unauthorized" }));
  expect(await store.list()).toStrictEqual({ status: "unauthorized" });
  expect(await store.schedule(launch)).toStrictEqual({ status: "unauthorized" });
});
test("launches store keeps the field errors and the conflict message of the back", async () => {
  const fields = { date: "date must be after the current date" };
  const invalid = createLaunchesStore(failing({ status: 400, message: "Invalid input", fields }));
  expect(await invalid.schedule(launch)).toStrictEqual({
    status: "rejected",
    message: "Invalid input",
    fields,
  });
  const message = "Rocket has a launch on this date";
  const conflict = createLaunchesStore(failing({ status: 409, message }));
  expect(await conflict.schedule(launch)).toStrictEqual({
    status: "rejected",
    message,
    fields: {},
  });
});
test("launches store reports any other failure as unavailable", async () => {
  const store = createLaunchesStore(failing({ status: 500, message: "Internal server error" }));
  expect(await store.list()).toStrictEqual({ status: "unavailable" });
});
