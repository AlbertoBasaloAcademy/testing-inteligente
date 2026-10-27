import { expect, test } from "@playwright/test";
import { isoDate, uniqueFutureDate } from "../../core/launches";
import { logInPage } from "../../core/rockets";
import { seedRocket } from "../../core/seed-data";
import { LaunchesPage } from "../../pages/launches.page";

// Spec: specs/S0003-schedule-launch/US1-schedule-launch.feature
test.describe("[US1] Schedule a launch", { tag: ["@S0003", "@S0003-US1"] }, () => {
  test("[R1] Schedule a valid launch", { tag: "@S0003-R1" }, async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket exists in the fleet (seed rocket)
    // AND the rocket has no launch on a unique future date
    const days = 1 + (Date.now() % 2_500_000);
    const date = new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

    // GIVEN the user is logged in
    await logInPage(page);

    // WHEN the user sends a launch of the rocket for the date with a price of 100
    const launchesPage = new LaunchesPage(page);
    await launchesPage.scheduleLaunch({ rocketName: seedRocket.name, date, price: "100" });

    // THEN the system creates the launch
    await expect(launchesPage.message("Launch scheduled")).toBeVisible();
    await expect(launchesPage.launchOn(date)).toContainText(
      `${seedRocket.name} · 100 per passenger`,
    );
  });

  const invalidDates = [
    { example: "today", date: isoDate(0) },
    { example: "yesterday", date: isoDate(-1) },
  ];
  for (const { example, date } of invalidDates) {
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
          date,
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

  for (const price of ["0", "-10"]) {
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
        expect(response.status()).toBe(400);
        const body = (await response.json()) as { fields: object };
        expect(body.fields).toHaveProperty("pricePerPassenger");
        await expect(launchesPage.status("pricePerPassenger must be a number")).toBeVisible();
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
      const launch = { rocketName: seedRocket.name, date: uniqueFutureDate(), price: "100" };
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
