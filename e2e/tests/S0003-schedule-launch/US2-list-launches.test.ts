import { expect, test } from "@playwright/test";
import { scheduleLaunch, uniqueFutureDate } from "../../core/launches";
import { logInPage } from "../../core/rockets";
import { seedRocket } from "../../core/seed-data";

// Spec: specs/S0003-schedule-launch/US2-list-launches.feature
test.describe("[US2] List the launches", { tag: ["@S0003", "@S0003-US2"] }, () => {
  test("[R7] Show all the launches with their data", { tag: "@S0003-R7" }, async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket exists in the fleet (seed rocket)
    // AND the rocket has a launch on a unique future date with a price of 100
    // GIVEN the user is logged in
    await logInPage(page);
    const date = uniqueFutureDate();
    expect((await scheduleLaunch(page, { date, price: "100" })).status()).toBe(201);

    // WHEN the user opens the page "/launches"
    await page.goto("/launches");

    // THEN the system shows the launch of the rocket
    // AND the launch shows the rocket name, the date and the price per passenger
    const launches = page.getByRole("list", { name: "Launches" });
    await expect(launches.getByRole("listitem").filter({ hasText: date })).toHaveText(
      `${date} · ${seedRocket.name} · 100 per passenger`,
    );
  });

  test(
    "[R8] Send a user without a valid token to the login page (no token)",
    { tag: "@S0003-R8" },
    async ({ page }) => {
      // GIVEN the user has no token
      // WHEN the user opens the page "/launches"
      await page.goto("/launches");

      // THEN the system sends the user to the login page
      await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    },
  );
});
