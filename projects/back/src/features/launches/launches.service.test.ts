import { expect, test } from "vite-plus/test";
import { createLaunchesService } from "./launches.service.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Launch, LaunchesRepository } from "./launches.type.ts";

const rocket = { id: "r1", name: "Falcon" };
function createFakeRepository(): LaunchesRepository {
  const launches: Launch[] = [];
  return {
    list: () => [...launches],
    findRocket: (id) => (id === rocket.id ? rocket : undefined),
    findByRocketAndDate: (rocketId, date) =>
      launches.find((launch) => launch.rocketId === rocketId && launch.date === date),
    insert: (launch) => {
      launches.push(launch);
    },
  };
}
function createService() {
  return createLaunchesService(createFakeRepository(), () => "2026-10-22");
}
function catchDetails(action: () => unknown) {
  try {
    action();
  } catch (error) {
    expect(error).toBeInstanceOf(ExpectedError);
    return (error as ExpectedError).details;
  }
  throw new Error("Expected an error");
}
function expectFieldError(action: () => unknown, field: string) {
  const details = catchDetails(action);
  expect(details.status).toBe(400);
  expect(Object.keys(details.fields ?? {})).toStrictEqual([field]);
}
const valid = { rocketId: "r1", date: "2026-10-23", pricePerPassenger: 100 };

test("a valid launch is created with an id and the rocket name and can be listed", () => {
  const service = createService();
  const launch = service.schedule(valid);
  expect(launch).toMatchObject({ ...valid, rocketName: "Falcon" });
  expect(launch.id).toBeTruthy();
  expect(service.list()).toStrictEqual([launch]);
});
test("a launch must use a rocket of the fleet", () => {
  const service = createService();
  expectFieldError(() => service.schedule({ ...valid, rocketId: "missing" }), "rocketId");
  expectFieldError(() => service.schedule({ ...valid, rocketId: undefined }), "rocketId");
});
test("a launch date must be after the current date", () => {
  const service = createService();
  for (const date of ["2026-10-22", "2026-10-21", "2025-12-31"])
    expectFieldError(() => service.schedule({ ...valid, date }), "date");
});
test("a launch date must be an ISO 8601 date", () => {
  const service = createService();
  for (const date of ["2026-13-01", "2026-02-30", "23/10/2026", "2026-10-23T10:00", undefined])
    expectFieldError(() => service.schedule({ ...valid, date }), "date");
});
test("a launch price per passenger must be greater than 0", () => {
  const service = createService();
  for (const pricePerPassenger of [0, -1, "100", Number.NaN, undefined])
    expectFieldError(() => service.schedule({ ...valid, pricePerPassenger }), "pricePerPassenger");
  expect(service.schedule({ ...valid, pricePerPassenger: 0.01 }).pricePerPassenger).toBe(0.01);
});
test("a rocket must not have 2 launches on the same date", () => {
  const service = createService();
  service.schedule(valid);
  expect(catchDetails(() => service.schedule(valid)).status).toBe(409);
  expect(service.schedule({ ...valid, date: "2026-10-24" }).date).toBe("2026-10-24");
});
