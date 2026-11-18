import { expect, test } from "@playwright/test";
import { seedRocket } from "../../core/seed-data";
import { HomePage } from "../../pages/home.page";
import { signedInHome } from "../../test-data/home";

test.use({ storageState: ".auth/operator.json" });

// Spec: specs/S0007-public-home/US3-see-the-current-home.feature
test.describe("[US3] See the home page as it is today", { tag: ["@S0007", "@S0007-US3"] }, () => {
  test(
    "[R7] Show the current home and hide the upcoming launches",
    { tag: "@S0007-R7" },
    async ({ page }) => {
      // GIVEN the user has a session
      const home = new HomePage(page);

      // WHEN the user opens "/"
      await home.open();

      // THEN the system shows the current home and hides the upcoming launches
      await expect(home.heading).toHaveText(signedInHome.name);
      await expect(home.text(signedInHome.description)).toBeVisible();
      await expect(home.text(signedInHome.version)).toBeVisible();
      await expect(home.applicationCards).toBeVisible();
      for (const name of signedInHome.cards) await expect(home.card(name)).toBeVisible();
      await expect(home.offer).toHaveCount(0);
      await expect(home.text(seedRocket.name)).toHaveCount(0);
    },
  );
});
