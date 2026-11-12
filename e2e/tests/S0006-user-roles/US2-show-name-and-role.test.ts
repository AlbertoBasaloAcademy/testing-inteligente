import { expect, test } from "@playwright/test";
import { confirmLaunch, logInOperator, registerAccount, scheduleLaunch } from "../../core/accounts";
import { sendBooking } from "../../core/bookings";
import { operatorAccount, seedRocket } from "../../core/seed-data";
import { BookingsPage } from "../../pages/bookings.page";
import { LaunchesPage } from "../../pages/launches.page";
import { LoginPage } from "../../pages/login.page";
import { MenuPage } from "../../pages/menu.page";
import { RocketsPage } from "../../pages/rockets.page";
import { createPassenger } from "../../test-data/bookings";
import {
  createPassengerAccount,
  hiddenLaunchActions,
  operatorLabel,
  passengerLabel,
} from "../../test-data/roles";

async function expectHidden(menu: MenuPage, names: readonly string[]): Promise<void> {
  for (const name of names) await expect(menu.action(name)).toHaveCount(0);
}

// Spec: specs/S0006-user-roles/US2-show-name-and-role.feature
test.describe(
  "[US2] Show the name and the role in the menu",
  { tag: ["@S0006", "@S0006-US2"] },
  () => {
    test(
      "[R6] Show the passenger name and hide management actions",
      { tag: "@S0006-R6" },
      async ({ page, request }) => {
        const operatorToken = await logInOperator(request);
        const planned = await scheduleLaunch(request, operatorToken);
        const confirmed = await scheduleLaunch(request, operatorToken);
        await confirmLaunch(request, operatorToken, confirmed.id);
        const booked = createPassenger();
        expect((await sendBooking(request, planned.id, booked, operatorToken)).status()).toBe(201);
        const account = createPassengerAccount();
        expect((await registerAccount(request, account)).status()).toBe(201);

        const login = new LoginPage(page);
        await login.logIn(account);
        await expect(login.loggedInMessage).toBeVisible();
        const menu = new MenuPage(page);
        await expect(menu.userLabel(passengerLabel)).toBeVisible();

        const rockets = new RocketsPage(page);
        await rockets.goto();
        await expect(rockets.rocketLink(seedRocket.name)).toBeVisible();
        await expect(menu.action("Add rocket")).toHaveCount(0);

        const launches = new LaunchesPage(page);
        await launches.goto();
        await expect(launches.launchOn(planned.date)).toContainText("Available seats:");
        await expect(launches.launchOn(confirmed.date)).toBeVisible();
        await expect(launches.scheduleButton).toHaveCount(0);
        await expectHidden(menu, hiddenLaunchActions);

        const bookings = new BookingsPage(page);
        await bookings.goto(planned.id);
        await expect(bookings.error).toHaveText(/.+/);
        await expect(bookings.bookButton).toHaveCount(0);
        await expect(bookings.passenger(booked.name)).toHaveCount(0);
      },
    );

    test(
      "[R7] Show the operator role and the management actions",
      { tag: "@S0006-R7" },
      async ({ page, request }) => {
        const operatorToken = await logInOperator(request);
        const planned = await scheduleLaunch(request, operatorToken);
        const confirmed = await scheduleLaunch(request, operatorToken);
        await confirmLaunch(request, operatorToken, confirmed.id);

        const login = new LoginPage(page);
        await login.logIn(operatorAccount);
        await expect(login.loggedInMessage).toBeVisible();
        const menu = new MenuPage(page);
        await expect(menu.userLabel(operatorLabel)).toBeVisible();

        const rockets = new RocketsPage(page);
        await rockets.goto();
        await expect(menu.action("Add rocket")).toBeVisible();

        const launches = new LaunchesPage(page);
        await launches.goto();
        await expect(launches.scheduleButton).toBeVisible();
        const plannedItem = launches.launchOn(planned.date);
        await expect(menu.actionOn(plannedItem, "Confirm")).toBeVisible();
        await expect(menu.actionOn(plannedItem, "Suspend")).toBeVisible();
        await expect(menu.actionOn(plannedItem, "Passengers")).toBeVisible();
        const confirmedItem = launches.launchOn(confirmed.date);
        await expect(menu.actionOn(confirmedItem, "Success")).toBeVisible();
        await expect(menu.actionOn(confirmedItem, "Fail")).toBeVisible();

        const bookings = new BookingsPage(page);
        await bookings.goto(planned.id);
        await expect(bookings.bookButton).toBeVisible();
      },
    );
  },
);
