import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

test.use({ storageState: { cookies: [], origins: [] } });

// Spec: specs/S0007-public-home/US2-see-no-upcoming-launch.feature
test.describe(
  "[US2] See a message when there is no upcoming launch",
  { tag: ["@S0007", "@S0007-US2"] },
  () => {
    test(
      "[R6] Do not show the empty message when the seed launch exists",
      { tag: "@S0007-R6" },
      async ({ page }) => {
        // GIVEN the visitor has no session
        // AND the seed rocket has one upcoming launch
        const home = new HomePage(page);

        // WHEN the visitor opens "/"
        await home.open();

        // THEN the system does not show "No upcoming launches."
        await expect(home.emptyMessage).toBeHidden();
      },
    );
  },
);
