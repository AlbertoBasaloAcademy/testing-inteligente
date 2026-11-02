// Test data for the passenger booking specs.
import type { Passenger } from "../core/bookings";

let sequence = 0;

function uniqueValue(): string {
  sequence += 1;
  return `${Date.now()}-${sequence}-${Math.floor(Math.random() * 1_000_000)}`;
}

export function createPassenger(): Passenger {
  const unique = uniqueValue();
  return {
    name: `Passenger ${unique}`,
    nationality: `Nationality ${unique}`,
    identityDocument: `DOC-${unique}`,
    email: `passenger-${unique}@example.com`,
    phone: `+3491${String(Date.now()).slice(-7)}${String(sequence).padStart(2, "0")}`,
  };
}

export function createCapacityThreeRocket(): { name: string; capacity: number; range: string } {
  return { name: `Booking Rocket ${uniqueValue()}`, capacity: 3, range: "orbital" };
}

export const invalidPassengerInputs = [
  ...(["name", "nationality", "identityDocument", "email", "phone"] as const).flatMap((field) => [
    { field, input: "missing" },
    { field, input: "empty" },
    { field, input: "spaces" },
    { field, input: "number" },
  ]),
  { field: "email", input: "invalid-email" },
] as const;
