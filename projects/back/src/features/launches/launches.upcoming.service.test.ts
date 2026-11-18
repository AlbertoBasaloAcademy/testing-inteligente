import { expect, test } from "vite-plus/test";
import { createLaunchesService } from "./launches.service.ts";
import type { Launch, LaunchesRepository } from "./launches.type.ts";

const today = "2026-10-22";

function repositoryOf(launches: readonly Launch[]): LaunchesRepository {
  return {
    list: () => [...launches],
    findById: () => undefined,
    findRocket: () => undefined,
    findByRocketAndDate: () => undefined,
    insert: () => undefined,
    updateStatus: () => undefined,
  };
}
function sample(overrides: Partial<Launch>): Launch {
  return {
    id: "launch-id",
    rocketId: "rocket-id",
    rocketName: "Falcon",
    date: "2026-10-23",
    pricePerPassenger: 100,
    status: "planned",
    createdAt: "2026-01-01T00:00:00.000Z",
    suspensionCause: "weather",
    suspensionMessage: "Wind",
    ...overrides,
  };
}
function upcomingNames(launches: readonly Launch[]) {
  const service = createLaunchesService(repositoryOf(launches), () => today);
  return service.listUpcoming().map((launch) => launch.rocketName);
}

test("an upcoming launch has a date after the current date", () => {
  const names = upcomingNames([
    sample({ date: "2026-10-22", rocketName: "Today" }),
    sample({ date: "2026-10-21", rocketName: "Past" }),
    sample({ date: "2026-10-23", rocketName: "Next" }),
  ]);
  expect(names).toStrictEqual(["Next"]);
});
test("an upcoming launch is planned or confirmed", () => {
  const names = upcomingNames([
    sample({ status: "planned", rocketName: "Planned" }),
    sample({ status: "confirmed", rocketName: "Confirmed" }),
    sample({ status: "successful", rocketName: "Successful" }),
    sample({ status: "suspended", rocketName: "Suspended" }),
    sample({ status: "failed", rocketName: "Failed" }),
  ]);
  expect(names).toStrictEqual(["Confirmed", "Planned"]);
});
test("upcoming launches are ordered by date and then by rocket name", () => {
  const names = upcomingNames([
    sample({ date: "2026-10-25", rocketName: "Nova" }),
    sample({ date: "2026-10-24", rocketName: "Zephyr", status: "confirmed" }),
    sample({ date: "2026-10-24", rocketName: "Atlas" }),
  ]);
  expect(names).toStrictEqual(["Atlas", "Zephyr", "Nova"]);
});
test("a public launch has only the rocket name, the date, the price and the status", () => {
  const service = createLaunchesService(repositoryOf([sample({})]), () => today);
  expect(service.listUpcoming()).toStrictEqual([
    { rocketName: "Falcon", date: "2026-10-23", pricePerPassenger: 100, status: "planned" },
  ]);
});
test("there is an empty list when no launch is upcoming", () => {
  const service = createLaunchesService(repositoryOf([]), () => today);
  expect(service.listUpcoming()).toStrictEqual([]);
});
