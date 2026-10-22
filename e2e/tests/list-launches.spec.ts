import { expect, test } from "@playwright/test";
import { backUrl } from "../core/env";
import { addRocket, bearer, logIn, logInPage, uniqueName } from "../core/rockets";

// Spec: specs/S0003-list-launches.feature
test.describe("List the launches", () => {
  const falcon = { name: "", date: "" };

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user)
    // AND the rocket "Falcon" exists in the fleet
    // AND the rocket "Falcon" has a launch tomorrow with a price of 100
    const token = await logIn(request);
    falcon.name = uniqueName("Falcon");
    falcon.date = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    const rocketId = await addRocket(
      request,
      { name: falcon.name, capacity: 5, range: "orbital" },
      token,
    );
    const launch = { rocketId, date: falcon.date, pricePerPassenger: 100 };
    const response = await request.post(`${backUrl}/api/launches`, {
      data: launch,
      headers: bearer(token),
    });
    expect(response.status()).toBe(201);
  });

  test("[R7] Show all the launches with their data", async ({ page }) => {
    // GIVEN the user is logged in
    await logInPage(page);

    // WHEN the user opens the page "/launches"
    await page.goto("/launches");

    // THEN the system shows the launch of "Falcon"
    // AND the launch shows the rocket name, the date and the price per passenger
    const list = page.getByRole("list", { name: "Launches" });
    const item = list.getByRole("listitem").filter({ hasText: falcon.name });
    await expect(item).toContainText(falcon.date);
    await expect(item).toContainText("100 per passenger");
  });

  const tokenExamples = [
    { token: "no token", value: null },
    { token: "a token not valid", value: "not-a-valid-token" },
  ];
  for (const { token: example, value } of tokenExamples) {
    test(`[R8] Send a user without a valid token to the login page (${example})`, async ({
      page,
    }) => {
      // GIVEN the user has <token>
      if (value)
        await page.addInitScript((token) => localStorage.setItem("session-token", token), value);

      // WHEN the user opens the page "/launches"
      await page.goto("/launches");

      // THEN the system sends the user to the login page
      await expect(page).toHaveURL(/\/login/);
    });
  }
});
