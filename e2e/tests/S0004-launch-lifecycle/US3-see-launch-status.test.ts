import { expect, test } from "@playwright/test";
import { logInPage } from "../../core/rockets";
import { LaunchesPage } from "../../pages/launches.page";
import { createLaunchData, statusPaths, technicalSuspension } from "../../test-data/launches";

// Spec: specs/S0004-launch-lifecycle/US3-see-launch-status.feature
test.describe(
  "[US3] See the status of each launch in the list",
  { tag: ["@S0004", "@S0004-US3"] },
  () => {
    test.beforeEach(async ({ page }) => {
      // GIVEN a registered user exists (seed user)
      // AND the rocket "Seed Rocket" exists in the fleet (seed rocket)
      // AND the user is logged in
      await logInPage(page);
    });

    test("[R8] Show the status of each launch", { tag: "@S0004-R8" }, async ({ page }) => {
      // GIVEN a launch of "Seed Rocket" has the status "successful"
      const launchesPage = new LaunchesPage(page);
      const launch = createLaunchData();
      expect((await launchesPage.scheduleLaunch(launch)).status()).toBe(201);
      for (const status of statusPaths.successful) {
        expect((await launchesPage.changeStatus(launch.date, status)).status()).toBe(200);
      }

      // WHEN the user opens the page "/launches"
      await launchesPage.goto();

      // THEN the launch shows the status "successful"
      await expect(launchesPage.statusOf(launch.date, "successful")).toBeVisible();
    });

    test(
      "[R9] Show the cause and the message of a suspended launch",
      { tag: "@S0004-R9" },
      async ({ page }) => {
        // GIVEN a launch of "Seed Rocket" has the status "suspended"
        // with the cause "technical" and the message "Engine leak"
        const launchesPage = new LaunchesPage(page);
        const launch = createLaunchData();
        expect((await launchesPage.scheduleLaunch(launch)).status()).toBe(201);
        const suspended = await launchesPage.suspendLaunch(launch.date, technicalSuspension);
        expect(suspended.status()).toBe(200);

        // WHEN the user opens the page "/launches"
        await launchesPage.goto();

        // THEN the launch shows the status "suspended"
        // AND the launch shows the cause "technical" and the message "Engine leak"
        const item = launchesPage.launchOn(launch.date);
        await expect(launchesPage.statusOf(launch.date, "suspended")).toBeVisible();
        await expect(item).toContainText(technicalSuspension.suspensionCause);
        await expect(item).toContainText(technicalSuspension.suspensionMessage);
      },
    );
  },
);
