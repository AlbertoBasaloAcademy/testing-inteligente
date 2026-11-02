import { expect, test } from "@playwright/test";
import { sendBooking } from "../../core/bookings";
import { addRocket, logIn, logInPage } from "../../core/rockets";
import { seedRocket } from "../../core/seed-data";
import { BookingsPage } from "../../pages/bookings.page";
import { LaunchesPage } from "../../pages/launches.page";
import { createCapacityThreeRocket, createPassenger } from "../../test-data/bookings";
import { createLaunchData } from "../../test-data/launches";

type LaunchResult = { id: string };

async function createLaunch(
  page: import("@playwright/test").Page,
  rocketName: string,
): Promise<string> {
  const launches = new LaunchesPage(page);
  const response = await launches.scheduleLaunch({ ...createLaunchData(), rocketName });
  expect(response.status()).toBe(201);
  return ((await response.json()) as LaunchResult).id;
}

test.describe(
  "[US2] See the passengers of a launch and its available seats",
  { tag: ["@S0005", "@S0005-US2"] },
  () => {
    test(
      "[R8] Show passenger details, capacity and available seats",
      { tag: "@S0005-R8" },
      async ({ page, request }) => {
        const token = await logIn(request);
        await logInPage(page);
        const rocket = createCapacityThreeRocket();
        await addRocket(request, rocket, token);
        const launchId = await createLaunch(page, rocket.name);
        const passengers = [createPassenger(), createPassenger()];
        for (const passenger of passengers) {
          expect((await sendBooking(request, launchId, passenger, token)).status()).toBe(201);
        }

        const bookings = new BookingsPage(page);
        await bookings.goto(launchId);
        await expect(bookings.heading).toBeVisible();
        for (const passenger of passengers) {
          const item = bookings.passenger(passenger.name);
          await expect(item).toContainText(`Name: ${passenger.name}`);
          await expect(item).toContainText(`Nationality: ${passenger.nationality}`);
          await expect(item).toContainText(`Identity document: ${passenger.identityDocument}`);
          await expect(item).toContainText(`Email: ${passenger.email}`);
          await expect(item).toContainText(`Phone: ${passenger.phone}`);
        }
        await expect(bookings.availability(3, 1)).toBeVisible();
      },
    );

    for (const tokenCase of ["no token", "an invalid token"]) {
      test(`[R9] Send ${tokenCase} to login`, { tag: "@S0005-R9" }, async ({ page, request }) => {
        const token = await logIn(request);
        await logInPage(page);
        const launchId = await createLaunch(page, seedRocket.name);
        if (tokenCase === "no token") {
          await page.evaluate(() => localStorage.clear());
        } else {
          await page.route("**/api/launches/*/bookings", (route) =>
            route.continue({
              headers: { ...route.request().headers(), authorization: "Bearer invalid-token" },
            }),
          );
        }

        const bookings = new BookingsPage(page);
        await bookings.goto(launchId);
        await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
      });
    }
  },
);
