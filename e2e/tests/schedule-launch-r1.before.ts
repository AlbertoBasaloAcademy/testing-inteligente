import { expect, test } from "@playwright/test";
import { logInPage } from "../core/rockets";
import { seedRocket } from "../core/seed-data";

// A unique future date (YYYY-MM-DD) from Date.now(): 1 to 30000 days after today.
function uniqueFutureDate(): string {
  const days = 1 + ((Date.now() + Math.floor(Math.random() * 1000)) % 30000);
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

// Spec: specs/S0003-schedule-launch.feature
test.describe("Schedule a launch of a rocket", () => {
  test("[R1] Schedule a valid launch", async ({ page }) => {
    // GIVEN a registered user exists and "Seed Rocket" exists in the fleet (global-setup)
    // GIVEN the user is logged in
    await logInPage(page);
    await page.getByRole("link", { name: "Launches" }).click();
    const date = uniqueFutureDate();

    // WHEN the user schedules a launch of "Seed Rocket" on a future date with a price per passenger greater than 0
    await page.getByRole("combobox", { name: "Rocket" }).selectOption({ label: seedRocket.name });
    await page.getByRole("textbox", { name: "Date" }).fill(date);
    await page.getByRole("spinbutton", { name: "Price per passenger" }).fill("150");
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/launches") && response.request().method() === "POST",
    );
    await page.getByRole("button", { name: "Schedule launch" }).click();
    const response = await responsePromise;

    // THEN the system returns 201
    expect(response.status()).toBe(201);
    // AND the system creates the launch
    await expect(page.getByRole("status").filter({ hasText: "Launch scheduled" })).toBeVisible();
    const item = page
      .getByRole("list", { name: "Launches" })
      .getByRole("listitem")
      .filter({ hasText: date });
    await expect(item).toContainText(seedRocket.name);
    await expect(item).toContainText("150 per passenger");
  });
});
