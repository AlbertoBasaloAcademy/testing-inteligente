# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: S0005-passenger-bookings\US2-see-passengers.test.ts >> [US2] See the passengers of a launch and its available seats >> [R9] Send an invalid token to login
- Location: tests\S0005-passenger-bookings\US2-see-passengers.test.ts:56:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Login' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Login' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Login' })

```

```yaml
- banner:
  - navigation "Main menu":
    - strong: testing-inteligente
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem:
        - link "About":
          - /url: /about
      - listitem:
        - link "Health":
          - /url: /health
      - listitem:
        - link "Rockets":
          - /url: /rockets
      - listitem:
        - link "Launches":
          - /url: /launches
      - listitem:
        - link "Existing User":
          - /url: /users/1275fdfd-531c-4d79-9c8e-8ac4b81fbaed
      - listitem:
        - button "Logout"
    - button "Change theme": Theme
  - status
- main:
  - heading "Page not found" [level=1]
  - paragraph: /launches/c7a98b0a-1c34-4779-8b67-adfe63d8308b/passengers
  - link "Home":
    - /url: /
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { sendBooking } from "../../core/bookings";
  3  | import { addRocket, logIn, logInPage } from "../../core/rockets";
  4  | import { seedRocket } from "../../core/seed-data";
  5  | import { BookingsPage } from "../../pages/bookings.page";
  6  | import { LaunchesPage } from "../../pages/launches.page";
  7  | import { createCapacityThreeRocket, createPassenger } from "../../test-data/bookings";
  8  | import { createLaunchData } from "../../test-data/launches";
  9  | 
  10 | type LaunchResult = { id: string };
  11 | 
  12 | async function createLaunch(
  13 |   page: import("@playwright/test").Page,
  14 |   rocketName: string,
  15 | ): Promise<string> {
  16 |   const launches = new LaunchesPage(page);
  17 |   const response = await launches.scheduleLaunch({ ...createLaunchData(), rocketName });
  18 |   expect(response.status()).toBe(201);
  19 |   return ((await response.json()) as LaunchResult).id;
  20 | }
  21 | 
  22 | test.describe(
  23 |   "[US2] See the passengers of a launch and its available seats",
  24 |   { tag: ["@S0005", "@S0005-US2"] },
  25 |   () => {
  26 |     test(
  27 |       "[R8] Show passenger details, capacity and available seats",
  28 |       { tag: "@S0005-R8" },
  29 |       async ({ page, request }) => {
  30 |         const token = await logIn(request);
  31 |         await logInPage(page);
  32 |         const rocket = createCapacityThreeRocket();
  33 |         await addRocket(request, rocket, token);
  34 |         const launchId = await createLaunch(page, rocket.name);
  35 |         const passengers = [createPassenger(), createPassenger()];
  36 |         for (const passenger of passengers) {
  37 |           expect((await sendBooking(request, launchId, passenger, token)).status()).toBe(201);
  38 |         }
  39 | 
  40 |         const bookings = new BookingsPage(page);
  41 |         await bookings.goto(launchId);
  42 |         await expect(bookings.heading).toBeVisible();
  43 |         for (const passenger of passengers) {
  44 |           const item = bookings.passenger(passenger.name);
  45 |           await expect(item).toContainText(`Name: ${passenger.name}`);
  46 |           await expect(item).toContainText(`Nationality: ${passenger.nationality}`);
  47 |           await expect(item).toContainText(`Identity document: ${passenger.identityDocument}`);
  48 |           await expect(item).toContainText(`Email: ${passenger.email}`);
  49 |           await expect(item).toContainText(`Phone: ${passenger.phone}`);
  50 |         }
  51 |         await expect(bookings.availability(3, 1)).toBeVisible();
  52 |       },
  53 |     );
  54 | 
  55 |     for (const tokenCase of ["no token", "an invalid token"]) {
  56 |       test(`[R9] Send ${tokenCase} to login`, { tag: "@S0005-R9" }, async ({ page, request }) => {
  57 |         const token = await logIn(request);
  58 |         await logInPage(page);
  59 |         const launchId = await createLaunch(page, seedRocket.name);
  60 |         if (tokenCase === "no token") {
  61 |           await page.evaluate(() => localStorage.clear());
  62 |         } else {
  63 |           await page.route("**/api/launches/*/bookings", (route) =>
  64 |             route.continue({
  65 |               headers: { ...route.request().headers(), authorization: "Bearer invalid-token" },
  66 |             }),
  67 |           );
  68 |         }
  69 | 
  70 |         const bookings = new BookingsPage(page);
  71 |         await bookings.goto(launchId);
> 72 |         await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
     |                                                                    ^ Error: expect(locator).toBeVisible() failed
  73 |       });
  74 |     }
  75 |   },
  76 | );
  77 | 
```