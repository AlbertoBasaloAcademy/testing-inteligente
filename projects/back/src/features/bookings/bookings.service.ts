import { randomUUID } from "node:crypto";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Availability, BookingsRepository, Passenger } from "./bookings.type.ts";

const keys = ["name", "nationality", "identityDocument", "email", "phone"] as const;
function readPassenger(value: unknown): Passenger {
  const body =
    typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const fields: Record<string, string> = {};
  const input = {} as Passenger;
  for (const key of keys) {
    const item = body[key];
    input[key] = typeof item === "string" ? item.trim() : "";
    if (!input[key]) fields[key] = `${key} is required`;
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    fields.email = "email is invalid";
  if (Object.keys(fields).length)
    throw new ExpectedError({ status: 400, message: "Invalid input", fields });
  return input;
}
function requireLaunch(repository: BookingsRepository, id: string): Availability {
  const launch = repository.find(id);
  if (!launch) throw new ExpectedError({ status: 404, message: "Launch not found" });
  return launch;
}
function checkAvailability(launch: Availability, passenger: Passenger) {
  if (launch.status !== "planned" && launch.status !== "confirmed")
    throw new ExpectedError({ status: 409, message: "Launch does not permit bookings" });
  if (launch.bookings.some((booking) => booking.identityDocument === passenger.identityDocument))
    throw new ExpectedError({ status: 409, message: "Passenger already booked" });
  if (launch.bookings.length >= launch.capacity)
    throw new ExpectedError({ status: 409, message: "Launch is full" });
}
export function createBookingsService(repository: BookingsRepository) {
  return {
    list(id: string) {
      const launch = requireLaunch(repository, id);
      return { ...launch, availableSeats: launch.capacity - launch.bookings.length };
    },
    availability(id: string) {
      const launch = requireLaunch(repository, id);
      return {
        capacity: launch.capacity,
        availableSeats: launch.capacity - launch.bookings.length,
      };
    },
    book(id: string, value: unknown) {
      const passenger = readPassenger(value);
      return repository.transaction(() => {
        checkAvailability(requireLaunch(repository, id), passenger);
        const booking = { id: randomUUID(), launchId: id, ...passenger };
        repository.insert(booking);
        return booking;
      });
    },
  };
}
