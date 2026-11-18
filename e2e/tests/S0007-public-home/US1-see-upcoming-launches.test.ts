import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { localVitals, publicOffer, upcomingLaunch } from "../../test-data/home";

test.use({ storageState: { cookies: [], origins: [] } });

const publicFields = ["date", "pricePerPassenger", "rocketName", "status"];

type PublicLaunch = { date: string; rocketName: string };

function isOrdered(launches: PublicLaunch[]): boolean {
  for (let index = 1; index < launches.length; index += 1) {
    const previous = launches[index - 1];
    const current = launches[index];
    const byDate = previous.date.localeCompare(current.date);
    if (byDate > 0) return false;
    if (byDate === 0 && previous.rocketName.localeCompare(current.rocketName) > 0) return false;
  }
  return true;
}

// Spec: specs/S0007-public-home/US1-see-upcoming-launches.feature
test.describe("[US1] See the upcoming launches", { tag: ["@S0007", "@S0007-US1"] }, () => {
  test(
    "[R1] Show the offer, the launch and the register link",
    { tag: "@S0007-R1" },
    async ({ page }) => {
      // GIVEN the visitor has no session
      // AND the seed rocket has one upcoming launch
      const launch = upcomingLaunch();
      const home = new HomePage(page);

      // WHEN the visitor opens "/"
      await home.open();

      // THEN the system shows the name, the offer, the public data and the register link
      await expect(home.productName).toBeVisible();
      await expect(home.offer).toBeVisible();
      const item = home.launch(launch);
      await expect(item).toContainText(launch.rocketName);
      await expect(item).toContainText(launch.date);
      await expect(item).toContainText(String(launch.pricePerPassenger));
      await expect(item).toContainText(launch.status);
      await expect(home.registerLink).toHaveAttribute("href", "/register");
    },
  );

  test(
    "[R2] Return the public upcoming launches",
    { tag: "@S0007-R2" },
    async ({ page, request }) => {
      // GIVEN the visitor has no session
      // AND the seed rocket has one upcoming launch
      const launch = upcomingLaunch();

      // WHEN the visitor requests the upcoming launches
      const response = await new HomePage(page).upcoming(request);

      // THEN the system returns 200 with the public fields, in order
      expect(response.status()).toBe(200);
      const body = (await response.json()) as PublicLaunch[];
      expect(body).toContainEqual(launch);
      for (const item of body) expect(Object.keys(item).sort()).toEqual(publicFields);
      expect(isOrdered(body)).toBe(true);
    },
  );

  test(
    "[R3] Set the title, the description, one heading and the language",
    { tag: "@S0007-R3" },
    async ({ page }) => {
      // WHEN the visitor opens "/"
      const home = new HomePage(page);
      await home.open();

      // THEN the document has the title, the meta description, one h1 and the language
      await expect(page).toHaveTitle("AstroBookings");
      await expect(home.metaDescription).toHaveAttribute("content", publicOffer);
      await expect(home.heading).toHaveCount(1);
      await expect(home.documentElement).toHaveAttribute("lang", "en");
    },
  );

  test("[R4] Meet WCAG 2.1 A and AA", { tag: "@S0007-R4" }, async ({ page }) => {
    // WHEN the visitor opens "/"
    const home = new HomePage(page);
    await home.open();
    await expect(home.heading).toBeVisible();

    // THEN the page has no WCAG 2.1 A or AA violation
    expect(await home.wcagViolations()).toEqual([]);
  });

  test(
    "[R5] Keep the LCP and the CLS within the local limits",
    { tag: "@S0007-R5" },
    async ({ page }) => {
      // WHEN the visitor opens "/" in the local environment
      const home = new HomePage(page);
      await home.open();
      await expect(home.heading).toBeVisible();

      // THEN the LCP is under 2.5 seconds and the CLS is under 0.1
      const vitals = await home.readVitals();
      expect(vitals.lcpMs).toBeGreaterThan(0);
      expect(vitals.lcpMs).toBeLessThan(localVitals.maxLcpMs);
      expect(vitals.cls).toBeLessThan(localVitals.maxCls);
    },
  );
});
