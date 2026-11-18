// Test data for the public home (specs/S0007-public-home/*.feature).
import { isoDate } from "../core/launches";
import { seedLaunch, seedRocket } from "../core/seed-data";

export const publicOffer = "AstroBookings offers seats on upcoming rocket launches.";

// R1, R2: the one upcoming launch that the seed creates.
export function upcomingLaunch(): {
  rocketName: string;
  date: string;
  pricePerPassenger: number;
  status: string;
} {
  return {
    rocketName: seedRocket.name,
    date: isoDate(seedLaunch.daysAhead),
    pricePerPassenger: seedLaunch.pricePerPassenger,
    status: seedLaunch.status,
  };
}

// R5: local limits for the Largest Contentful Paint and the Cumulative Layout Shift.
export const localVitals = { maxLcpMs: 2_500, maxCls: 0.1 };

// R7: the home that a signed-in user sees today.
export const signedInHome = {
  name: "testing-inteligente",
  description: "Testing Inteligente",
  version: "0.7.0",
  cards: ["Health", "Authentication"],
};
