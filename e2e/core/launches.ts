// Shared steps for the launch specs (specs/S0003-schedule-launch/*.feature).
import type { Page, Response } from "@playwright/test";
import { seedRocket } from "./seed-data";

const DAY = 86_400_000;

// A date in the format YYYY-MM-DD, relative to the current UTC date of the back.
export function isoDate(days: number): string {
  return new Date(Date.now() + days * DAY).toISOString().slice(0, 10);
}

// Date.now() plus a random part: parallel workers can start in the same millisecond.
export function uniqueFutureDate(): string {
  return isoDate(1 + ((Date.now() + Math.floor(Math.random() * 1000)) % 2_500_000));
}

// Opens /launches, fills the form for the seed rocket and returns the response of the back.
export async function scheduleLaunch(
  page: Page,
  launch: { date: string; price: string },
): Promise<Response> {
  await page.goto("/launches");
  await page.getByLabel("Rocket").selectOption({ label: seedRocket.name });
  await page.getByLabel("Date").fill(launch.date);
  await page.getByLabel("Price per passenger").fill(launch.price);
  const response = page.waitForResponse(
    (item) => item.url().endsWith("/api/launches") && item.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Schedule launch" }).click();
  return response;
}
