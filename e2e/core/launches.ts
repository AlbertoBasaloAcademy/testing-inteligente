// Shared dates for the launch specs (specs/S0003-schedule-launch/*.feature).
// The steps of the launches page are in pages/launches.page.ts.
const DAY = 86_400_000;

// A date in the format YYYY-MM-DD, relative to the current UTC date of the back.
export function isoDate(days: number): string {
  return new Date(Date.now() + days * DAY).toISOString().slice(0, 10);
}

// Date.now() plus a random part: parallel workers can start in the same millisecond.
export function uniqueFutureDate(): string {
  return isoDate(1 + ((Date.now() + Math.floor(Math.random() * 1000)) % 2_500_000));
}
