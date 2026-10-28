import { expect, test } from "vite-plus/test";
import { createLaunchesService } from "./launches.service.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Launch, LaunchesRepository } from "./launches.type.ts";

function createFakeRepository(): LaunchesRepository {
  const launches: Launch[] = [];
  return {
    list: () => [...launches],
    findById: (id) => launches.find((launch) => launch.id === id),
    findRocket: (id) => (id === "r1" ? { id, name: "Falcon" } : undefined),
    findByRocketAndDate: () => undefined,
    insert: (launch) => {
      launches.push(launch);
    },
    updateStatus: (id, change) => {
      const launch = launches.find((item) => item.id === id);
      if (launch) Object.assign(launch, change);
    },
  };
}
function createLaunch() {
  const service = createLaunchesService(createFakeRepository(), () => "2026-10-22");
  const launch = service.schedule({ rocketId: "r1", date: "2026-10-23", pricePerPassenger: 100 });
  return { service, id: launch.id };
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
const suspension = { status: "suspended", suspensionCause: "weather", suspensionMessage: "Storm" };

test("a launch goes from planned to confirmed to successful and the list shows it", () => {
  const { service, id } = createLaunch();
  expect(service.changeStatus(id, { status: "confirmed" }).status).toBe("confirmed");
  expect(service.changeStatus(id, { status: "successful" }).status).toBe("successful");
  expect(service.list()[0]?.status).toBe("successful");
});
test("a confirmed launch can fail", () => {
  const { service, id } = createLaunch();
  service.changeStatus(id, { status: "confirmed" });
  expect(service.changeStatus(id, { status: "failed" }).status).toBe("failed");
});
test("a planned or confirmed launch can be suspended with a cause and a message", () => {
  for (const before of [[], ["confirmed"]]) {
    const { service, id } = createLaunch();
    for (const status of before) service.changeStatus(id, { status });
    expect(service.changeStatus(id, suspension)).toMatchObject(suspension);
    expect(service.list()[0]).toMatchObject(suspension);
  }
});
test("a launch must change only to a permitted status", () => {
  const { service, id } = createLaunch();
  for (const status of ["planned", "successful", "failed"])
    expect(catchDetails(() => service.changeStatus(id, { status })).status).toBe(409);
});
test("a successful, suspended or failed launch must not change status", () => {
  for (const final of [["confirmed", "successful"], ["suspended"], ["confirmed", "failed"]]) {
    const { service, id } = createLaunch();
    for (const status of final) service.changeStatus(id, { ...suspension, status });
    for (const status of ["confirmed", "successful", "suspended", "failed"])
      expect(catchDetails(() => service.changeStatus(id, { ...suspension, status })).status).toBe(
        409,
      );
  }
});
test("a status change of a missing launch returns 404", () => {
  const { service } = createLaunch();
  expect(catchDetails(() => service.changeStatus("missing", { status: "confirmed" })).status).toBe(
    404,
  );
});
test("a status must be a known status", () => {
  const { service, id } = createLaunch();
  for (const status of ["cancelled", undefined])
    expectFieldError(() => service.changeStatus(id, { status }), "status");
});
test("a suspended launch must have a cause of weather, technical or economic", () => {
  const { service, id } = createLaunch();
  for (const suspensionCause of ["rain", undefined])
    expectFieldError(
      () => service.changeStatus(id, { ...suspension, suspensionCause }),
      "suspensionCause",
    );
});
test("a suspended launch must have a message with 3 to 200 characters", () => {
  const { service, id } = createLaunch();
  for (const suspensionMessage of ["ab", "  ab  ", "x".repeat(201), undefined])
    expectFieldError(
      () => service.changeStatus(id, { ...suspension, suspensionMessage }),
      "suspensionMessage",
    );
});
