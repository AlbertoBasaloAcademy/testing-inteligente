import { expect, test } from "@playwright/test";
import { existingUser, seedRocket } from "../core/seed-data";

// Spec: specs/S0003-schedule-launch.feature
test.describe("Schedule a launch", () => {
  test("[R1] Schedule a valid launch", async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket exists in the fleet (seed rocket)
    // AND the rocket has no launch on a unique future date
    const days = 1 + (Date.now() % 2_500_000);
    const date = new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

    // GIVEN the user is logged in
    await page.goto("/login");
    await page.getByLabel("Email").fill(existingUser.email);
    await page.getByLabel("Password").fill(existingUser.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Logged in")).toBeVisible();

    // WHEN the user sends a launch of the rocket for the date with a price of 100
    await page.goto("/launches");
    await page.getByLabel("Rocket").selectOption({ label: seedRocket.name });
    await page.getByLabel("Date").fill(date);
    await page.getByLabel("Price per passenger").fill("100");
    await page.getByRole("button", { name: "Schedule launch" }).click();

    // THEN the system creates the launch
    await expect(page.getByText("Launch scheduled")).toBeVisible();
    const launches = page.getByRole("list", { name: "Launches" });
    await expect(launches.getByRole("listitem").filter({ hasText: date })).toContainText(
      `${seedRocket.name} · 100 per passenger`,
    );
  });
});
