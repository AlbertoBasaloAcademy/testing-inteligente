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

// Date.now() plus a random part: parallel workers can start in the same millisecond.
export function uniqueFutureDate(): string {
  return isoDate(1 + ((Date.now() + Math.floor(Math.random() * 1000)) % 2_500_000));
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
