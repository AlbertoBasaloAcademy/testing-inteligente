import { expect, test } from "@playwright/test";
import { backUrl } from "../core/env";
import { addRocket, logIn, logInPage, tokenExamples, uniqueName } from "../core/rockets";

// Spec: specs/S0002-see-rocket-details.feature
test.describe("See the details of a rocket", () => {
  let falconId: string;

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket "Falcon" exists
    const token = await logIn(request);
    const rocket = { name: uniqueName("Falcon"), capacity: 5, range: "orbital" };
    falconId = await addRocket(request, rocket, token);
  });

  for (const { token: example, headers } of tokenExamples) {
    test(`[R2] Reject a request without a valid token (${example})`, async ({ request }) => {
      // GIVEN the user has <token>
      // WHEN the user requests the rocket "Falcon"
      const response = await request.get(`${backUrl}/api/rockets/${falconId}`, { headers });

      // THEN the system returns 401
      expect(response.status()).toBe(401);
    });
  }

  test("[R8] Show a message for a rocket that does not exist", async ({ page }) => {
    // GIVEN the user is logged in
    // AND no rocket has the id "unknown-id"
    await logInPage(page);

    // WHEN the user opens the page "/rockets/unknown-id"
    await page.goto("/rockets/unknown-id");

    // THEN the system shows a "not found" message
    await expect(page.getByRole("status").filter({ hasText: /not found/i })).toBeVisible();
  });
});
