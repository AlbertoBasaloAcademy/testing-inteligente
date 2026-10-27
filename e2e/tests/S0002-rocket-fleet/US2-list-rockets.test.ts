import { expect, test } from "@playwright/test";
import { backUrl } from "../../core/env";
import { addRocket, logIn, logInPage, type RocketInput } from "../../core/rockets";
import { RocketsPage } from "../../pages/rockets.page";
import { createFalconData, createVegaData, tokenExamples } from "../../test-data/rockets";

// Spec: specs/S0002-rocket-fleet/US2-list-rockets.feature
test.describe("[US2] List the rockets", { tag: ["@S0002", "@S0002-US2"] }, () => {
  let falcon: RocketInput;
  let vega: RocketInput;

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rockets "Falcon" and "Vega" exist
    const token = await logIn(request);
    falcon = createFalconData();
    vega = createVegaData();
    await addRocket(request, falcon, token);
    await addRocket(request, vega, token);
  });

  for (const { token: example, headers, expectedStatus } of tokenExamples) {
    test(
      `[R2] Reject a request without a valid token (${example})`,
      { tag: "@S0002-R2" },
      async ({ request }) => {
        // GIVEN the user has <token>
        // WHEN the user requests the list of rockets
        const response = await request.get(`${backUrl}/api/rockets`, { headers });

        // THEN the system returns 401
        expect(response.status()).toBe(expectedStatus);
      },
    );
  }

  test("[R7] Show all the rockets of the fleet", { tag: "@S0002-R7" }, async ({ page }) => {
    // GIVEN the user is logged in
    await logInPage(page);

    // WHEN the user opens the page "/rockets"
    const rocketsPage = new RocketsPage(page);
    await rocketsPage.goto();

    // THEN the system shows the rockets "Falcon" and "Vega"
    await expect(rocketsPage.rocketLink(falcon.name)).toBeVisible();
    await expect(rocketsPage.rocketLink(vega.name)).toBeVisible();
  });
});
