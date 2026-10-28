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
  status: "planned",
};
function failing(details: ExpectedError["details"]): LaunchesClient {
  const fail = async () => {
    throw new ExpectedError(details);
  };
  return { list: fail, schedule: fail, changeStatus: fail };
}

test("launches store returns the loaded launches and the scheduled launch", async () => {
  const store = createLaunchesStore({
    list: async () => [launch],
    schedule: async () => launch,
    changeStatus: async () => launch,
  });
  expect(await store.list()).toStrictEqual({ status: "loaded", launches: [launch] });
  expect(await store.schedule(launch)).toStrictEqual({ status: "created", launch });
});
test("launches store reports a missing token or session as unauthorized", async () => {
  const store = createLaunchesStore(failing({ status: 401, message: "Unauthorized" }));
  expect(await store.list()).toStrictEqual({ status: "unauthorized" });
  expect(await store.schedule(launch)).toStrictEqual({ status: "unauthorized" });
  expect(await store.changeStatus("1", { status: "confirmed" })).toStrictEqual({
    status: "unauthorized",
  });
});
test("launches store returns the launch with its changed status", async () => {
  const confirmed = { ...launch, status: "confirmed" as const };
  const client = { list: async () => [], schedule: async () => launch };
  const store = createLaunchesStore({ ...client, changeStatus: async () => confirmed });
  expect(await store.changeStatus("1", { status: "confirmed" })).toStrictEqual({
    status: "changed",
    launch: confirmed,
  });
});
test("launches store keeps the errors of a status change that the back rejects", async () => {
  const fields = { suspensionMessage: "suspensionMessage must have 3 to 200 characters" };
  const invalid = createLaunchesStore(failing({ status: 400, message: "Invalid input", fields }));
  const suspension = { status: "suspended" as const, suspensionCause: "weather" };
  expect(await invalid.changeStatus("1", suspension)).toStrictEqual({
    status: "rejected",
    message: "Invalid input",
    fields,
  });
  for (const status of [404, 409]) {
    const store = createLaunchesStore(failing({ status, message: "Rejected" }));
    expect(await store.changeStatus("1", { status: "failed" })).toStrictEqual({
      status: "rejected",
      message: "Rejected",
      fields: {},
    });
  }
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
