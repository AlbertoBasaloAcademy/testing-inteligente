// Test data for the launch specs (specs/S0003-schedule-launch/*.feature).
import { uniqueFutureDate } from "../core/launches";
import { seedRocket } from "../core/seed-data";
import type { LaunchForm } from "../pages/launches.page";

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
