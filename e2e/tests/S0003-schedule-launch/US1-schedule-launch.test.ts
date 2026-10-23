import { expect, test } from "@playwright/test";
import { isoDate, scheduleLaunch, uniqueFutureDate } from "../../core/launches";
import { logInPage } from "../../core/rockets";
import { existingUser, seedRocket } from "../../core/seed-data";

// Spec: specs/S0003-schedule-launch/US1-schedule-launch.feature
test.describe("[US1] Schedule a launch", { tag: ["@S0003", "@S0003-US1"] }, () => {
  test("[R1] Schedule a valid launch", { tag: "@S0003-R1" }, async ({ page }) => {
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
        const response = await scheduleLaunch(page, { date, price: "100" });

        // THEN the system returns 400
        // AND the error has the field "date"
        expect(response.status()).toBe(400);
        expect(((await response.json()) as { fields: object }).fields).toHaveProperty("date");
        await expect(
          page.getByRole("status").filter({ hasText: "date must be after the current date" }),
        ).toBeVisible();
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
        const response = await scheduleLaunch(page, { date: uniqueFutureDate(), price });

        // THEN the system returns 400
        // AND the error has the field "pricePerPassenger"
        expect(response.status()).toBe(400);
        const body = (await response.json()) as { fields: object };
        expect(body.fields).toHaveProperty("pricePerPassenger");
        await expect(
          page.getByRole("status").filter({ hasText: "pricePerPassenger must be a number" }),
        ).toBeVisible();
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
      const date = uniqueFutureDate();
      expect((await scheduleLaunch(page, { date, price: "100" })).status()).toBe(201);
      await expect(page.getByText("Launch scheduled")).toBeVisible();

      // WHEN the user sends a launch of the rocket for the same date with a price of 100
      const response = await scheduleLaunch(page, { date, price: "100" });

      // THEN the system returns 409
      expect(response.status()).toBe(409);
      await expect(
        page.getByRole("status").filter({ hasText: "Rocket has a launch on this date" }),
      ).toBeVisible();
    },
  );
});
