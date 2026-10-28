import { expect, test } from "@playwright/test";
import { sendStatus } from "../../core/launches";
import { logIn, logInPage } from "../../core/rockets";
import { LaunchesPage, type LaunchForm } from "../../pages/launches.page";
import {
  createLaunchData,
  rejectedCauses,
  rejectedMessages,
  weatherSuspension,
} from "../../test-data/launches";

// Spec: specs/S0004-launch-lifecycle/US2-suspend-launch.feature
test.describe(
  "[US2] Suspend a launch with a cause and a message",
  { tag: ["@S0004", "@S0004-US2"] },
  () => {
    let launchesPage: LaunchesPage;
    let launch: LaunchForm;
    let launchId: string;

    test.beforeEach(async ({ page }) => {
      // GIVEN a registered user exists (seed user)
      // AND the rocket "Seed Rocket" exists in the fleet (seed rocket)
      // AND the user is logged in
      await logInPage(page);

      // AND a launch of "Seed Rocket" has the status "planned"
      launchesPage = new LaunchesPage(page);
      launch = createLaunchData();
      const response = await launchesPage.scheduleLaunch(launch);
      expect(response.status()).toBe(201);
      launchId = ((await response.json()) as { id: string }).id;
      await expect(launchesPage.statusOf(launch.date, "planned")).toBeVisible();
    });

    test("[R5] Suspend a launch with a valid cause and message", { tag: "@S0004-R5" }, async () => {
      // WHEN the user suspends the launch with the cause "weather" and the message "Strong wind"
      const response = await launchesPage.suspendLaunch(launch.date, weatherSuspension);

      // THEN the system returns 200
      // AND the launch has the status "suspended"
      // AND the launch has the cause "weather" and the message "Strong wind"
      expect(response.status()).toBe(200);
      const item = launchesPage.launchOn(launch.date);
      await expect(launchesPage.statusOf(launch.date, "suspended")).toBeVisible();
      await expect(item).toContainText(weatherSuspension.suspensionCause);
      await expect(item).toContainText(weatherSuspension.suspensionMessage);
    });

    for (const { cause, expectedStatus, expectedField } of rejectedCauses) {
      test(
        `[R6] Reject a cause that is not valid ("${cause}")`,
        { tag: "@S0004-R6" },
        async ({ request }) => {
          // WHEN the user suspends the launch with the cause <cause> and the message "Strong wind"
          // The list of causes of the UI has only valid causes: the test sends the cause to the back.
          const token = await logIn(request);
          const change = {
            status: "suspended",
            suspensionCause: cause,
            suspensionMessage: weatherSuspension.suspensionMessage,
          };
          const response = await sendStatus(request, launchId, change, token);

          // THEN the system returns 400
          // AND the error has the field "suspensionCause"
          expect(response.status()).toBe(expectedStatus);
          const body = (await response.json()) as { fields: object };
          expect(body.fields).toHaveProperty(expectedField);
        },
      );
    }

    for (const { length, message, expectedStatus, expectedField } of rejectedMessages) {
      test(
        `[R7] Reject a message with a length that is not valid (${length} characters)`,
        { tag: "@S0004-R7" },
        async () => {
          // WHEN the user suspends the launch with the cause "weather"
          // and a message of <length> characters
          const suspension = { suspensionCause: "weather", suspensionMessage: message };
          const response = await launchesPage.suspendLaunch(launch.date, suspension);

          // THEN the system returns 400
          // AND the error has the field "suspensionMessage"
          expect(response.status()).toBe(expectedStatus);
          const body = (await response.json()) as { fields: object };
          expect(body.fields).toHaveProperty(expectedField);
          await expect(launchesPage.statusOf(launch.date, "planned")).toBeVisible();
        },
      );
    }

    test("[R7] Stop a suspension without a message", { tag: "@S0004-R7" }, async () => {
      // WHEN the user suspends the launch with the cause "weather" and no message
      const statusChanges = launchesPage.watchStatusChanges();
      const suspension = { suspensionCause: "weather", suspensionMessage: "" };
      await launchesPage.fillSuspension(launch.date, suspension);
      await launchesPage.suspendLaunchButton(launch.date).click();

      // THEN the browser shows a warning on the field "Message"
      // AND the system does not send the suspension
      await expect(launchesPage.messageInput(launch.date)).toBeFocused();
      await expect.poll(() => launchesPage.messageWarning(launch.date)).not.toBe("");
      expect(statusChanges).toHaveLength(0);
      await expect(launchesPage.statusOf(launch.date, "planned")).toBeVisible();
    });
  },
);
