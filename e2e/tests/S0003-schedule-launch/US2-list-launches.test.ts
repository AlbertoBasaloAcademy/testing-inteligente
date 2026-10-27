import { expect, test } from "@playwright/test";
import { uniqueFutureDate } from "../../core/launches";
import { logInPage } from "../../core/rockets";
import { seedRocket } from "../../core/seed-data";
import { LaunchesPage } from "../../pages/launches.page";
import { LoginPage } from "../../pages/login.page";

// Spec: specs/S0003-schedule-launch/US2-list-launches.feature
test.describe("[US2] List the launches", { tag: ["@S0003", "@S0003-US2"] }, () => {
  test("[R7] Show all the launches with their data", { tag: "@S0003-R7" }, async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket exists in the fleet (seed rocket)
    // AND the rocket has a launch on a unique future date with a price of 100
    // GIVEN the user is logged in
    await logInPage(page);
    const launchesPage = new LaunchesPage(page);
    const date = uniqueFutureDate();
    const response = await launchesPage.scheduleLaunch({
      rocketName: seedRocket.name,
      date,
      price: "100",
    });
    expect(response.status()).toBe(201);

    // WHEN the user opens the page "/launches"
    await launchesPage.goto();

    // THEN the system shows the launch of the rocket
    // AND the launch shows the rocket name, the date and the price per passenger
    await expect(launchesPage.launchOn(date)).toHaveText(
      `${date} · ${seedRocket.name} · 100 per passenger`,
    );
  });

  test(
    "[R8] Send a user without a valid token to the login page (no token)",
    { tag: "@S0003-R8" },
    async ({ page }) => {
      // GIVEN the user has no token
      // WHEN the user opens the page "/launches"
      await new LaunchesPage(page).goto();

      // THEN the system sends the user to the login page
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    },
  );
});
