import { expect, test } from "@playwright/test";
import { backUrl } from "../core/env";
import { addRocket, logIn, logInPage, tokenExamples, uniqueName } from "../core/rockets";

// Spec: specs/S0002-list-rockets.feature
test.describe("List the rockets", () => {
  const names = { falcon: "", vega: "" };

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rockets "Falcon" and "Vega" exist
    const token = await logIn(request);
    names.falcon = uniqueName("Falcon");
    names.vega = uniqueName("Vega");
    await addRocket(request, { name: names.falcon, capacity: 5, range: "orbital" }, token);
    await addRocket(request, { name: names.vega, capacity: 3, range: "moon" }, token);
  });

  for (const { token: example, headers } of tokenExamples) {
    test(`[R2] Reject a request without a valid token (${example})`, async ({ request }) => {
      // GIVEN the user has <token>
      // WHEN the user requests the list of rockets
      const response = await request.get(`${backUrl}/api/rockets`, { headers });

      // THEN the system returns 401
      expect(response.status()).toBe(401);
    });
  }

  test("[R7] Show all the rockets of the fleet", async ({ page }) => {
    // GIVEN the user is logged in
    await logInPage(page);

    // WHEN the user opens the page "/rockets"
    await page.goto("/rockets");

    // THEN the system shows the rockets "Falcon" and "Vega"
    const list = page.getByRole("list", { name: "Rockets" });
    await expect(list.getByRole("link", { name: names.falcon })).toBeVisible();
    await expect(list.getByRole("link", { name: names.vega })).toBeVisible();
  });
});
