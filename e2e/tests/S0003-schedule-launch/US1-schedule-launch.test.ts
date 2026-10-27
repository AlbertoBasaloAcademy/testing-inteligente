import { expect, test } from "@playwright/test";
import { isoDate, uniqueFutureDate } from "../../core/launches";
import { logInPage } from "../../core/rockets";
import { seedRocket } from "../../core/seed-data";
import { LaunchesPage } from "../../pages/launches.page";
import { createLaunchData, rejectedPrices } from "../../test-data/launches";

// Spec: specs/S0003-schedule-launch/US1-schedule-launch.feature
test.describe("[US1] Schedule a launch", { tag: ["@S0003", "@S0003-US1"] }, () => {
  test("[R1] Schedule a valid launch", { tag: "@S0003-R1" }, async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket exists in the fleet (seed rocket)
    // AND the rocket has no launch on a unique future date
    const launch = createLaunchData();

    // GIVEN the user is logged in
    await logInPage(page);

    // WHEN the user sends a launch of the rocket for the date with a price of 100
    const launchesPage = new LaunchesPage(page);
    await launchesPage.scheduleLaunch(launch);

    // THEN the system creates the launch
    await expect(launchesPage.message("Launch scheduled")).toBeVisible();
    await expect(launchesPage.launchOn(launch.date)).toContainText(
      `${launch.rocketName} · ${launch.price} per passenger`,
    );
  });

  const invalidDates = [
    { example: "today", days: 0 },
    { example: "yesterday", days: -1 },
  ];
  for (const { example, days } of invalidDates) {
    test(
      `[R4] Reject a date that is not valid or not in the future (${example})`,
      { tag: "@S0003-R4" },
      async ({ page }) => {
        // GIVEN the user is logged in
        await logInPage(page);

        // WHEN the user sends a launch of the rocket for the date with a price of 100
        const launchesPage = new LaunchesPage(page);
        const response = await launchesPage.scheduleLaunch({
          rocketName: seedRocket.name,
          date: isoDate(days),
          price: "100",
        });

        // THEN the system returns 400
        // AND the error has the field "date"
        expect(response.status()).toBe(400);
        expect(((await response.json()) as { fields: object }).fields).toHaveProperty("date");
        await expect(launchesPage.status("date must be after the current date")).toBeVisible();
      },
    );
  }

  for (const { price, expectedStatus, expectedField, expectedMessage } of rejectedPrices) {
    test(
      `[R5] Reject a price that is not a number greater than 0 (${price})`,
      { tag: "@S0003-R5" },
      async ({ page }) => {
        // GIVEN the user is logged in
        await logInPage(page);

        // WHEN the user sends a launch of the rocket for a future date with the price
        const launchesPage = new LaunchesPage(page);
        const response = await launchesPage.scheduleLaunch({
          rocketName: seedRocket.name,
          date: uniqueFutureDate(),
          price,
        });

        // THEN the system returns 400
        // AND the error has the field "pricePerPassenger"
        expect(response.status()).toBe(expectedStatus);
        const body = (await response.json()) as { fields: object };
        expect(body.fields).toHaveProperty(expectedField);
        await expect(launchesPage.status(expectedMessage)).toBeVisible();
      },
    );
  }

  test(
    "[R6] Reject a second launch of a rocket on the same date",
    { tag: "@S0003-R6" },
    async ({ page }) => {
      // GIVEN the user is logged in
      // AND the rocket has a launch on a unique future date
      await logInPage(page);
      const launchesPage = new LaunchesPage(page);
      const launch = createLaunchData();
      expect((await launchesPage.scheduleLaunch(launch)).status()).toBe(201);
      await expect(launchesPage.message("Launch scheduled")).toBeVisible();

      // WHEN the user sends a launch of the rocket for the same date with a price of 100
      const response = await launchesPage.scheduleLaunch(launch);

      // THEN the system returns 409
      expect(response.status()).toBe(409);
      await expect(launchesPage.status("Rocket has a launch on this date")).toBeVisible();
    },
  );
});
