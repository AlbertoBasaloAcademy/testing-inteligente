// Shared dates for the launch specs (specs/S0003-schedule-launch/*.feature).
// The steps of the launches page are in pages/launches.page.ts.
import type { APIRequestContext, APIResponse } from "@playwright/test";
import { backUrl } from "./env";
import { bearer } from "./rockets";

const DAY = 86_400_000;

// A date in the format YYYY-MM-DD, relative to the current UTC date of the back.
export function isoDate(days: number): string {
  return new Date(Date.now() + days * DAY).toISOString().slice(0, 10);
}

// Each worker uses only the days with its own remainder of MAX_WORKERS.
// So two parallel workers never get the same day, even in the same millisecond.
// The random start keeps the days of two runs apart when the database is not emptied.
const MAX_WORKERS = 64;
const SLOTS = 39_000; // SLOTS * MAX_WORKERS days: about 6800 years.
const workerSlot = Number(process.env.TEST_PARALLEL_INDEX ?? 0) % MAX_WORKERS;
let nextSlot = Math.floor(Math.random() * SLOTS);

export function uniqueFutureDate(): string {
  nextSlot = (nextSlot + 1) % SLOTS;
  return isoDate(1 + nextSlot * MAX_WORKERS + workerSlot);
}

export type StatusChange = { status: string; suspensionCause?: string; suspensionMessage?: string };

// Sends a new status for the launch to the back (specs/S0004-launch-lifecycle/*.feature).
export async function sendStatus(
  request: APIRequestContext,
  launchId: string,
  change: StatusChange,
  token: string,
): Promise<APIResponse> {
  const url = `${backUrl}/api/launches/${encodeURIComponent(launchId)}`;
  return request.patch(url, { data: change, headers: bearer(token) });
}
