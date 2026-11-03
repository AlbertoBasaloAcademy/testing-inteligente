# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: S0003-schedule-launch\US2-list-launches.test.ts >> [US2] List the launches >> [R7] Show all the launches with their data
- Location: tests\S0003-schedule-launch\US2-list-launches.test.ts:9:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '5816-09-01' })
Timeout: 5000ms
- Expected  - 1
+ Received  + 5

- 5816-09-01 · Seed Rocket · 100 per passenger
+ 5816-09-01 · Seed Rocket · 100 per passenger · planned PassengersConfirmSuspendCause
+ WeatherTechnicalEconomic
+
+ Message
+ Suspend launch

Call log:
  - Expect "toHaveText" getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '5816-09-01' }) with timeout 5000ms
  - waiting for getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '5816-09-01' })
    12 × locator resolved to <li>…</li>
       - unexpected value "5816-09-01 · Seed Rocket · 100 per passenger · planned PassengersConfirmSuspendCause
WeatherTechnicalEconomic

Message
Suspend launch"

```

```yaml
- listitem:
  - text: 5816-09-01 · Seed Rocket · 100 per passenger · planned
  - link "Passengers":
    - /url: /launches/7c3aa641-90fe-4129-9e0c-b14d66fda284/bookings
  - group:
    - button "Confirm"
    - button "Suspend"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { logInPage } from "../../core/rockets";
  3  | import { LaunchesPage } from "../../pages/launches.page";
  4  | import { LoginPage } from "../../pages/login.page";
  5  | import { createLaunchData } from "../../test-data/launches";
  6  | 
  7  | // Spec: specs/S0003-schedule-launch/US2-list-launches.feature
  8  | test.describe("[US2] List the launches", { tag: ["@S0003", "@S0003-US2"] }, () => {
  9  |   test("[R7] Show all the launches with their data", { tag: "@S0003-R7" }, async ({ page }) => {
  10 |     // GIVEN a registered user exists (seed user)
  11 |     // AND the rocket exists in the fleet (seed rocket)
  12 |     // AND the rocket has a launch on a unique future date with a price of 100
  13 |     // GIVEN the user is logged in
  14 |     await logInPage(page);
  15 |     const launchesPage = new LaunchesPage(page);
  16 |     const launch = createLaunchData();
  17 |     const response = await launchesPage.scheduleLaunch(launch);
  18 |     expect(response.status()).toBe(201);
  19 | 
  20 |     // WHEN the user opens the page "/launches"
  21 |     await launchesPage.goto();
  22 | 
  23 |     // THEN the system shows the launch of the rocket
  24 |     // AND the launch shows the rocket name, the date and the price per passenger
> 25 |     await expect(launchesPage.launchOn(launch.date)).toHaveText(
     |                                                      ^ Error: expect(locator).toHaveText(expected) failed
  26 |       `${launch.date} · ${launch.rocketName} · ${launch.price} per passenger`,
  27 |     );
  28 |   });
  29 | 
  30 |   test(
  31 |     "[R8] Send a user without a valid token to the login page (no token)",
  32 |     { tag: "@S0003-R8" },
  33 |     async ({ page }) => {
  34 |       // GIVEN the user has no token
  35 |       // WHEN the user opens the page "/launches"
  36 |       await new LaunchesPage(page).goto();
  37 | 
  38 |       // THEN the system sends the user to the login page
  39 |       const loginPage = new LoginPage(page);
  40 |       await expect(loginPage.heading).toBeVisible();
  41 |       await expect(loginPage.loginButton).toBeVisible();
  42 |     },
  43 |   );
  44 | });
  45 | 
```