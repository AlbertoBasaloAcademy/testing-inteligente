// Test data for the rocket fleet specs (specs/S0002-rocket-fleet/*.feature).
import { bearer, uniqueName, type RocketInput } from "../core/rockets";

// R1, R2, R4, R7, US3: the rocket "Falcon" with a unique name.
// Each call returns a new object with a new name.
export function createFalconData(): RocketInput {
  return { name: uniqueName("Falcon"), capacity: 5, range: "orbital" };
}

// R7: the rocket "Vega" with a unique name.
export function createVegaData(): RocketInput {
  return { name: uniqueName("Vega"), capacity: 3, range: "moon" };
}

// R2: the values of the "token" column, and the expected status.
export const tokenExamples = [
  { token: "no token", headers: {}, expectedStatus: 401 },
  { token: "a token not valid", headers: bearer("not-a-valid-token"), expectedStatus: 401 },
];

// R3, R5, R6: rockets with a field that is not valid, and the expected error.
export const invalidRockets = [
  {
    criterion: "R3",
    rocket: { name: "Ab", capacity: 5, range: "orbital" },
    expectedStatus: 400,
    expectedField: "name",
  },
  {
    criterion: "R3",
    rocket: { name: "A".repeat(41), capacity: 5, range: "orbital" },
    expectedStatus: 400,
    expectedField: "name",
  },
  {
    criterion: "R5",
    rocket: { name: "Vega", capacity: 0, range: "orbital" },
    expectedStatus: 400,
    expectedField: "capacity",
  },
  {
    criterion: "R5",
    rocket: { name: "Vega", capacity: 11, range: "orbital" },
    expectedStatus: 400,
    expectedField: "capacity",
  },
  {
    criterion: "R6",
    rocket: { name: "Vega", capacity: 5, range: "venus" },
    expectedStatus: 400,
    expectedField: "range",
  },
];
