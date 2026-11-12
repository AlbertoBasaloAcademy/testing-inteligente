// Test data for the user role specs (specs/S0006-user-roles/*.feature).
import { tokenExamples } from "./rockets";

export const passengerLabel = "Ana (passenger)";
export const operatorLabel = "Operator (operator)";

export const hiddenLaunchActions = ["Confirm", "Success", "Fail", "Suspend", "Passengers"] as const;

export const forbiddenPassengerActions = [
  "creates a rocket",
  "schedules a launch",
  "changes a launch status",
  "books a passenger",
] as const;

export const passengerResources = [
  "the rockets",
  "one rocket",
  "the launches",
  "the free seats of a launch",
] as const;

// R5: each resource with no token and with a token that is not valid.
export const unauthenticatedRequests = (
  [
    ["/api/rockets", "rockets"],
    ["/api/launches", "launches"],
    ["/api/launches/unknown-launch/bookings", "bookings"],
  ] as const
).flatMap(([path, resource]) =>
  tokenExamples.map((example) => ({
    resource,
    path,
    token: example.token,
    headers: example.headers,
    expectedStatus: example.expectedStatus,
  })),
);

// R1, R6: a new passenger named Ana. Each call uses a new email.
export function createPassengerAccount(): { name: string; email: string; password: string } {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    name: "Ana",
    email: `ana.${suffix}@example.com`,
    password: "SecurePassword123!",
  };
}
