import { expect, test } from "@playwright/test";
import { sendStatus } from "../../core/launches";
import { logIn, logInPage } from "../../core/rockets";
import { LaunchesPage } from "../../pages/launches.page";
import {
  createLaunchData,
  permittedChanges,
  rejectedChanges,
  statusPaths,
  unknownLaunch,
} from "../../test-data/launches";

// Spec: specs/S0004-launch-lifecycle/US1-change-launch-status.feature
test.describe("[US1] Change the status of a launch", { tag: ["@S0004", "@S0004-US1"] }, () => {
  test.beforeEach(async ({ page }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket "Seed Rocket" exists in the fleet (seed rocket)
    // AND the user is logged in
    await logInPage(page);
  });

  test("[R1] Give a new launch the status planned", { tag: "@S0004-R1" }, async ({ page }) => {
    // WHEN the user schedules a launch of "Seed Rocket" for a unique future date
    const launchesPage = new LaunchesPage(page);
    const launch = createLaunchData();
    expect((await launchesPage.scheduleLaunch(launch)).status()).toBe(201);

    // THEN the launch has the status "planned"
    await expect(launchesPage.statusOf(launch.date, "planned")).toBeVisible();
  });

  for (const { current, next, expectedStatus } of permittedChanges) {
    test(
      `[R2] Change the status to a permitted new status (${current} to ${next})`,
      { tag: "@S0004-R2" },
      async ({ page }) => {
        // GIVEN a launch of "Seed Rocket" has the status <current>
        const launchesPage = new LaunchesPage(page);
        const launch = createLaunchData();
        expect((await launchesPage.scheduleLaunch(launch)).status()).toBe(201);
        for (const status of statusPaths[current]) {
          expect((await launchesPage.changeStatus(launch.date, status)).status()).toBe(200);
        }
        await expect(launchesPage.statusOf(launch.date, current)).toBeVisible();

        // WHEN the user sends the status <next> for the launch
        const response = await launchesPage.changeStatus(launch.date, next);

        // THEN the system returns 200
        // AND the launch has the status <next>
        expect(response.status()).toBe(expectedStatus);
        await expect(launchesPage.statusOf(launch.date, next)).toBeVisible();
      },
    );
  }

  for (const { current, next, expectedStatus } of rejectedChanges) {
    test(
      `[R3] Reject a change of status that is not permitted (${current} to ${next})`,
      { tag: "@S0004-R3" },
      async ({ page, request }) => {
        // GIVEN a launch of "Seed Rocket" has the status <current>
        // The UI shows only the permitted buttons: the test sends the changes to the back.
        const token = await logIn(request);
        const launchesPage = new LaunchesPage(page);
        const launch = createLaunchData();
        const scheduled = await launchesPage.scheduleLaunch(launch);
        expect(scheduled.status()).toBe(201);
        const launchId = ((await scheduled.json()) as { id: string }).id;
        for (const status of statusPaths[current]) {
          expect((await sendStatus(request, launchId, { status }, token)).status()).toBe(200);
        }

        // WHEN the user sends the status <next> for the launch
        const response = await sendStatus(request, launchId, { status: next }, token);

        // THEN the system returns 409
        // AND the launch has the status <current>
        expect(response.status()).toBe(expectedStatus);
        await launchesPage.goto();
        await expect(launchesPage.statusOf(launch.date, current)).toBeVisible();
      },
    );
  }

  test(
    "[R4] Reject a change of status of a launch that does not exist",
    { tag: "@S0004-R4" },
    async ({ request }) => {
      // GIVEN no launch has the id "unknown-launch"
      const token = await logIn(request);

      // WHEN the user sends the status "confirmed" for the launch id "unknown-launch"
      const response = await sendStatus(request, unknownLaunch.id, { status: "confirmed" }, token);

      // THEN the system returns 404
      expect(response.status()).toBe(unknownLaunch.expectedStatus);
    },
  );
});
