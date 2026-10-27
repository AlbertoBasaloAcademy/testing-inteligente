import { expect, test } from "@playwright/test";
import { backUrl } from "../../core/env";
import { addRocket, logIn, logInPage, tokenExamples, uniqueName } from "../../core/rockets";
import { RocketDetailsPage } from "../../pages/rocket-details.page";

// Spec: specs/S0002-rocket-fleet/US3-see-rocket-details.feature
test.describe("[US3] See the details of a rocket", { tag: ["@S0002", "@S0002-US3"] }, () => {
  let falconId: string;

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket "Falcon" exists
    const token = await logIn(request);
    const rocket = { name: uniqueName("Falcon"), capacity: 5, range: "orbital" };
    falconId = await addRocket(request, rocket, token);
  });

  for (const { token: example, headers } of tokenExamples) {
    test(
      `[R2] Reject a request without a valid token (${example})`,
      { tag: "@S0002-R2" },
      async ({ request }) => {
        // GIVEN the user has <token>
        // WHEN the user requests the rocket "Falcon"
        const response = await request.get(`${backUrl}/api/rockets/${falconId}`, { headers });

        // THEN the system returns 401
        expect(response.status()).toBe(401);
      },
    );
  }

  test(
    "[R8] Show a message for a rocket that does not exist",
    { tag: "@S0002-R8" },
    async ({ page }) => {
      // GIVEN the user is logged in
      // AND no rocket has the id "unknown-id"
      await logInPage(page);

      // WHEN the user opens the page "/rockets/unknown-id"
      const detailsPage = new RocketDetailsPage(page);
      await detailsPage.goto("unknown-id");

      // THEN the system shows a "not found" message
      await expect(detailsPage.status(/not found/i)).toBeVisible();
    },
  );
});
