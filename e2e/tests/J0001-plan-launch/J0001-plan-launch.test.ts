import { expect, test } from "@playwright/test";
import { operatorAccount } from "../../core/seed-data";
import { LaunchesPage } from "../../pages/launches.page";
import { LoginPage } from "../../pages/login.page";
import { MenuPage } from "../../pages/menu.page";
import { RocketsPage } from "../../pages/rockets.page";
import { createLaunchData } from "../../test-data/launches";
import { createFalconData } from "../../test-data/rockets";
import { operatorLabel } from "../../test-data/roles";

// Journey: specs/J0001-plan-launch/J0001-plan-launch.feature
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("[J0001] Plan a launch", { tag: ["@journey", "@J0001"] }, () => {
  test("Plan a launch with a new rocket", { tag: "@J0001-1" }, async ({ page }) => {
    const rocket = createFalconData();
    const launch = { ...createLaunchData(), rocketName: rocket.name };
    const login = new LoginPage(page);
    const menu = new MenuPage(page);
    const rockets = new RocketsPage(page);
    const launches = new LaunchesPage(page);

    await test.step("[S0006-R7] Sign in", async () => {
      await login.logIn(operatorAccount);
      await expect(menu.userLabel(operatorLabel)).toBeVisible();
    });

    await test.step("[S0002-R1] Add a rocket", async () => {
      await rockets.addRocket(rocket);
      await expect(rockets.rocketLink(rocket.name)).toBeVisible();
    });

    await test.step("[S0003-R1] Schedule a launch with that rocket", async () => {
      await launches.scheduleLaunch(launch);
      await expect(launches.message("Launch scheduled")).toBeVisible();
    });

    await test.step("[S0003-R7] The launches list shows the launch", async () => {
      await expect(launches.launchOn(launch.date)).toContainText(
        `${launch.date} · ${launch.rocketName} · ${launch.price} per passenger`,
      );
    });

    await test.step("[S0004-R1] The launch shows the status planned", async () => {
      await expect(launches.statusOf(launch.date, "planned")).toBeVisible();
    });
  });
});
