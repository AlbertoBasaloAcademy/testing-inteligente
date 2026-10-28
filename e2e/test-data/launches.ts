// Test data for the launch specs (specs/S0003-schedule-launch/*.feature).
import { uniqueFutureDate } from "../core/launches";
import { seedRocket } from "../core/seed-data";
import type { LaunchForm, Suspension } from "../pages/launches.page";

// R1, R6, R7: a valid launch of the seed rocket on a unique future date.
// Each call returns a new object with a new date.
export function createLaunchData(): LaunchForm {
  return { rocketName: seedRocket.name, date: uniqueFutureDate(), price: "100" };
}

// R5: prices that are not a number greater than 0, and the expected error.
export const rejectedPrices = [
  {
    price: "0",
    expectedStatus: 400,
    expectedField: "pricePerPassenger",
    expectedMessage: "pricePerPassenger must be a number",
  },
  {
    price: "-10",
    expectedStatus: 400,
    expectedField: "pricePerPassenger",
    expectedMessage: "pricePerPassenger must be a number",
  },
];

// Test data for the launch lifecycle specs (specs/S0004-launch-lifecycle/*.feature).

// R2, R3, R8: the changes of status that bring a new launch to a status.
export const statusPaths: Record<string, string[]> = {
  planned: [],
  confirmed: ["confirmed"],
  successful: ["confirmed", "successful"],
  failed: ["confirmed", "failed"],
};

// R2: permitted changes of status, and the expected status code.
export const permittedChanges = [
  { current: "planned", next: "confirmed", expectedStatus: 200 },
  { current: "confirmed", next: "successful", expectedStatus: 200 },
  { current: "confirmed", next: "failed", expectedStatus: 200 },
];

// R3: changes of status that are not permitted, and the expected status code.
export const rejectedChanges = [
  { current: "planned", next: "successful", expectedStatus: 409 },
  { current: "planned", next: "failed", expectedStatus: 409 },
  { current: "successful", next: "failed", expectedStatus: 409 },
  { current: "failed", next: "confirmed", expectedStatus: 409 },
];

// R4: a launch id that does not exist.
export const unknownLaunch = { id: "unknown-launch", expectedStatus: 404 };

// R5: a valid suspension.
export const weatherSuspension: Suspension = {
  suspensionCause: "weather",
  suspensionMessage: "Strong wind",
};

// R9: the suspension of the list.
export const technicalSuspension: Suspension = {
  suspensionCause: "technical",
  suspensionMessage: "Engine leak",
};

// R6: causes that are not valid, and the expected error.
export const rejectedCauses = [
  { cause: "storm", expectedStatus: 400, expectedField: "suspensionCause" },
  { cause: "", expectedStatus: 400, expectedField: "suspensionCause" },
];

// R7: messages with a length that is not valid, and the expected error.
export const rejectedMessages = [
  { length: 2, message: "a".repeat(2), expectedStatus: 400, expectedField: "suspensionMessage" },
  {
    length: 201,
    message: "a".repeat(201),
    expectedStatus: 400,
    expectedField: "suspensionMessage",
  },
];
