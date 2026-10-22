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
    await page.waitForTimeout(2000);
    await page
      .locator("main > auth-form > form > label:nth-child(1) > input")
      .fill(existingUser.email);
    await page
      .locator("main > auth-form > form > label:nth-child(2) > input")
      .fill(existingUser.password);
    await page.locator("main > auth-form > form > button").click();
    await page.waitForTimeout(2000);

    // WHEN the user sends a launch of the rocket for the date with a price of 100
    await page.goto("/launches");
    await page.waitForTimeout(2000);
    await page
      .locator("main > launch-form > form > label:nth-child(1) > select")
      .selectOption({ label: seedRocket.name });
    await page.locator("main > launch-form > form > label:nth-child(2) > input").fill(date);
    await page.locator("main > launch-form > form > label:nth-child(3) > input").fill("100");
    await page.locator("main > launch-form > form > button").click();

    // THEN the page has a title and a list
    await page.waitForTimeout(2000);
    const title = await page.locator("main > h1").textContent();
    expect(title).toContain("Launch");
    await page.waitForTimeout(2000);
    const lists = await page.locator("main > ul").count();
    expect(lists).toBeTruthy();
  });
});
