Date: 2026-11-03T18:35:50+01:00
Command: `npx playwright test` (from `e2e/`)
Result: 75 passed, 5 failed, 0 skipped, 0 flaky; exit code 1.


## Failures

### S0005-R7-3

Tags: @S0005, @S0005-US1, @S0005-R7
Source: e2e/tests/S0005-passenger-bookings/US1-book-passenger.test.ts:214
Outcome: unexpected; [R7] Reject a booking when the launch is failed
Attempt: 1

Error:

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 409

  22 |   token: string,
  23 | ): Promise<void> {
> 24 |   expect((await sendStatus(request, id, { status }, token)).status()).toBe(200);
     |                                                                       ^
  25 | }
  26 |
  27 | test.describe("[US1] Book a passenger on a launch", { tag: ["@S0005", "@S0005-US1"] }, () => {
    at changeStatus (C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US1-book-passenger.test.ts:24:71)
    at C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US1-book-passenger.test.ts:238:11
```

Page excerpt:

```yaml
  - main [ref=f1e22]:
    - heading "Launches" [level=1] [ref=f1e23]
    - status
    - list "Launches" [ref=f1e24]:
      - listitem [ref=f1e25]:
        - text: 7995-03-13 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e26]: planned
        - link "Passengers" [ref=f1e27] [cursor=pointer]:
          - /url: /launches/daa8db00-4200-4549-bd65-4590e3f89f87/bookings
        - group [ref=f1e29]:
          - button "Confirm" [ref=f1e30] [cursor=pointer]
          - button "Suspend" [ref=f1e31] [cursor=pointer]
      - listitem [ref=f1e32]:
        - text: 7996-03-03 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e33]: confirmed
        - link "Passengers" [ref=f1e34] [cursor=pointer]:
          - /url: /launches/053523ea-e49a-44bf-8346-11de7f750ebb/bookings
        - group [ref=f1e36]:
          - button "Success" [ref=f1e37] [cursor=pointer]
          - button "Fail" [ref=f1e38] [cursor=pointer]
          - button "Suspend" [ref=f1e39] [cursor=pointer]
      - listitem [ref=f1e40]:
        - text: 7998-06-17 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e41]: planned
        - link "Passengers" [ref=f1e42] [cursor=pointer]:
          - /url: /launches/41648868-a920-4536-9a7b-6f604f11d253/bookings
        - group [ref=f1e44]:
          - button "Confirm" [ref=f1e45] [cursor=pointer]
          - button "Suspend" [ref=f1e46] [cursor=pointer]
      - listitem [ref=f1e47]:
        - text: 7998-07-21 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e48]: planned
        - link "Passengers" [ref=f1e49] [cursor=pointer]:
          - /url: /launches/c58d1ea0-0fa5-4d58-886c-0cdac10a061d/bookings
        - group [ref=f1e51]:
          - button "Confirm" [ref=f1e52] [cursor=pointer]
          - button "Suspend" [ref=f1e53] [cursor=pointer]
      - listitem [ref=f1e54]:
        - text: 8003-05-24 · Seed Rocket · 100 per passenger ·
        - generic [ref=f1e55]: planned
```

Truncated at 40 lines.

Evidence:

- [Error context](e2e-evidence/S0005-R7-3/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0005-R7-3/screenshot-attempt-1.png)
- Trace source: `e2e/test-results/S0005-passenger-bookings-U-8418e-g-when-the-launch-is-failed-chromium/trace.zip`
- Video source: `e2e/test-results/S0005-passenger-bookings-U-8418e-g-when-the-launch-is-failed-chromium/video.webm`

### S0005-R8

Tags: @S0005, @S0005-US2, @S0005-R8
Source: e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts:26
Outcome: unexpected; [R8] Show passenger details, capacity and available seats
Attempt: 1

Error:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Passengers' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Passengers' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Passengers' })


  40 |         const bookings = new BookingsPage(page);
  41 |         await bookings.goto(launchId);
> 42 |         await expect(bookings.heading).toBeVisible();
     |                                        ^
  43 |         for (const passenger of passengers) {
  44 |           const item = bookings.passenger(passenger.name);
  45 |           await expect(item).toContainText(`Name: ${passenger.name}`);
    at C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US2-see-passengers.test.ts:42:40
```

Page excerpt:

```yaml
- main:
  - heading "Page not found" [level=1]
  - paragraph: /launches/29adf7f2-1430-462c-a7d8-5d1dbf8d8b65/passengers
  - link "Home":
    - /url: /
```

Evidence:

- [Error context](e2e-evidence/S0005-R8/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0005-R8/screenshot-attempt-1.png)
- Trace source: `e2e/test-results/S0005-passenger-bookings-U-d50b4-apacity-and-available-seats-chromium/trace.zip`
- Video source: `e2e/test-results/S0005-passenger-bookings-U-d50b4-apacity-and-available-seats-chromium/video.webm`

### S0005-R9-1

Tags: @S0005, @S0005-US2, @S0005-R9
Source: e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts:56
Outcome: unexpected; [R9] Send no token to login
Attempt: 1

Error:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Login' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Login' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Login' })


  70 |         const bookings = new BookingsPage(page);
  71 |         await bookings.goto(launchId);
> 72 |         await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
     |                                                                    ^
  73 |       });
  74 |     }
  75 |   },
    at C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US2-see-passengers.test.ts:72:68
```

Page excerpt:

```yaml
- main:
  - heading "Page not found" [level=1]
  - paragraph: /launches/a36dd300-dab1-45f2-9c24-6e074c4f1ca3/passengers
  - link "Home":
    - /url: /
```

Evidence:

- [Error context](e2e-evidence/S0005-R9-1/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0005-R9-1/screenshot-attempt-1.png)
- Trace source: `e2e/test-results/S0005-passenger-bookings-U-d6fa5-s-R9-Send-no-token-to-login-chromium/trace.zip`
- Video source: `e2e/test-results/S0005-passenger-bookings-U-d6fa5-s-R9-Send-no-token-to-login-chromium/video.webm`

### S0005-R9-2

Tags: @S0005, @S0005-US2, @S0005-R9
Source: e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts:56
Outcome: unexpected; [R9] Send an invalid token to login
Attempt: 1

Error:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Login' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Login' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Login' })


  70 |         const bookings = new BookingsPage(page);
  71 |         await bookings.goto(launchId);
> 72 |         await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
     |                                                                    ^
  73 |       });
  74 |     }
  75 |   },
    at C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US2-see-passengers.test.ts:72:68
```

Page excerpt:

```yaml
- main:
  - heading "Page not found" [level=1]
  - paragraph: /launches/c7a98b0a-1c34-4779-8b67-adfe63d8308b/passengers
  - link "Home":
    - /url: /
```

Evidence:

- [Error context](e2e-evidence/S0005-R9-2/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0005-R9-2/screenshot-attempt-1.png)
- Trace source: `e2e/test-results/S0005-passenger-bookings-U-e1295-d-an-invalid-token-to-login-chromium/trace.zip`
- Video source: `e2e/test-results/S0005-passenger-bookings-U-e1295-d-an-invalid-token-to-login-chromium/video.webm`

## Regressions

### S0003-R7

Tags: @S0003, @S0003-US2, @S0003-R7
Source: e2e/tests/S0003-schedule-launch/US2-list-launches.test.ts:9
Outcome: unexpected; [R7] Show all the launches with their data
Attempt: 1

Error:

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '8508-05-31' })
Timeout: 5000ms
- Expected  - 1
+ Received  + 5

- 8508-05-31 · Seed Rocket · 100 per passenger
+ 8508-05-31 · Seed Rocket · 100 per passenger · planned PassengersConfirmSuspendCause
+ WeatherTechnicalEconomic
+
+ Message
+ Suspend launch

Call log:
  - Expect "toHaveText" getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '8508-05-31' }) with timeout 5000ms
  - waiting for getByRole('list', { name: 'Launches' }).getByRole('listitem').filter({ hasText: '8508-05-31' })
    10 × locator resolved to <li>…</li>
       - unexpected value "8508-05-31 · Seed Rocket · 100 per passenger · planned PassengersConfirmSuspendCause
WeatherTechnicalEconomic

Message
Suspend launch"


  23 |     // THEN the system shows the launch of the rocket
  24 |     // AND the launch shows the rocket name, the date and the price per passenger
> 25 |     await expect(launchesPage.launchOn(launch.date)).toHaveText(
     |                                                      ^
  26 |       `${launch.date} · ${launch.rocketName} · ${launch.price} per passenger`,
  27 |     );
  28 |   });
    at C:\code\cast\testing-inteligente\e2e\tests\S0003-schedule-launch\US2-list-launches.test.ts:25:54
```

Page excerpt:

Main node unavailable.

Evidence:

- [Error context](e2e-evidence/S0003-R7/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0003-R7/screenshot-attempt-1.png)
- Trace source: `e2e/test-results/S0003-schedule-launch-US2--6b965-he-launches-with-their-data-chromium/trace.zip`
- Video source: `e2e/test-results/S0003-schedule-launch-US2--6b965-he-launches-with-their-data-chromium/video.webm`

## Observed clues

- Missing rule tag: f6fe67ec88096199d1c8-946d88b819e6703b1d00 (home.test.ts:4)
- Missing rule tag: f6fe67ec88096199d1c8-b55c8832b446c337eab6 (home.test.ts:10)
