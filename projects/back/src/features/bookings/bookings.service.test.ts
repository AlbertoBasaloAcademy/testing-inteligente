import { expect, test } from "vite-plus/test";
import { createBookingsService } from "./bookings.service.ts";
import type { Availability, BookingsRepository } from "./bookings.type.ts";
const passenger = {
  name: "Ada",
  nationality: "UK",
  identityDocument: " A1 ",
  email: "ada@example.com",
  phone: "123",
};
function setup(status: Availability["status"] = "planned", capacity = 2) {
  const launches: Record<string, Availability> = {
    one: { status, capacity, bookings: [] },
    two: { status, capacity, bookings: [] },
  };
  const repository: BookingsRepository = {
    find: (id) => launches[id],
    insert: (booking) => {
      launches[booking.launchId]!.bookings.push(booking);
    },
    transaction: (operation) => operation(),
  };
  return { service: createBookingsService(repository), launches };
}
test("books one seat with all passenger fields without a passenger account", () => {
  for (const status of ["planned", "confirmed"] as const) {
    const { service } = setup(status);
    const booking = service.book("one", passenger);
    expect(booking).toMatchObject({ ...passenger, identityDocument: "A1", launchId: "one" });
    expect(service.list("one")).toMatchObject({
      capacity: 2,
      availableSeats: 1,
      bookings: [booking],
    });
  }
});
test("requires all passenger fields and a valid email", () => {
  const { service, launches } = setup();
  for (const key of Object.keys(passenger)) {
    expect(() => service.book("one", { ...passenger, [key]: " " })).toThrow();
  }
  expect(() => service.book("one", { ...passenger, email: "invalid" })).toThrow();
  expect(launches.one!.bookings).toHaveLength(0);
});
test("uses only the trimmed identity document and permits it on another launch", () => {
  const { service } = setup();
  service.book("one", passenger);
  expect(() =>
    service.book("one", { ...passenger, name: "Other", identityDocument: "A1" }),
  ).toThrow();
  expect(service.book("two", passenger).launchId).toBe("two");
});
test("rejects bookings above capacity", () => {
  const { service } = setup("planned", 1);
  service.book("one", passenger);
  expect(() => service.book("one", { ...passenger, identityDocument: "B" })).toThrow();
  expect(service.list("one").bookings).toHaveLength(1);
});
test("rejects bookings for each disallowed status and missing launches", () => {
  for (const status of ["successful", "suspended", "failed"] as const) {
    const { service } = setup(status);
    expect(() => service.book("one", passenger)).toThrow();
    expect(service.list("one").bookings).toHaveLength(0);
  }
  expect(() => setup().service.book("missing", passenger)).toThrow();
});
