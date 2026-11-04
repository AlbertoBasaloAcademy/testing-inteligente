Date: 2026-11-04T17:31:55+01:00
Command: `npx playwright test` (from `e2e/`)
Result: FAIL. 80 tests: 79 passed, 1 failed, 0 skipped, 0 flaky. Exit code: 1. Duration: 121.676 s.

## Failures

### S0005-R8

Tags: @S0005, @S0005-US2, @S0005-R8
Source: e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts:26
Outcome: unexpected
Attempt: 1

Error:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('Rocket capacity: 3 · Available seats: 1', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Rocket capacity: 3 · Available seats: 1', { exact: true }) with timeout 5000ms
  - waiting for getByText('Rocket capacity: 3 · Available seats: 1', { exact: true })


  49 |           await expect(item).toContainText(`Phone: ${passenger.phone}`);
  50 |         }
> 51 |         await expect(bookings.availability(3, 1)).toBeVisible();
     |                                                   ^
  52 |       },
  53 |     );
  54 |
    at C:\code\cast\testing-inteligente\e2e\tests\S0005-passenger-bookings\US2-see-passengers.test.ts:51:51
```

Page excerpt:

```yaml
- main:
  - heading "Passengers" [level=1]
  - paragraph: "Rocket capacity: 3 · Available seats: 2"
  - list:
    - listitem: "Name: Passenger 1793810031888-6-124357 · Nationality: Nationality 1793810031888-6-124357 · Identity document: DOC-1793810031888-6-124357 · Email: passenger-1793810031888-6-124357@example.com · Phone: +3491003188806"
    - listitem: "Name: Passenger 1793810031888-7-423838 · Nationality: Nationality 1793810031888-7-423838 · Identity document: DOC-1793810031888-7-423838 · Email: passenger-1793810031888-7-423838@example.com · Phone: +3491003188807"
  - alert
  - text: Name
  - textbox "Name"
  - status
  - text: Nationality
  - textbox "Nationality"
  - status
  - text: Identity document
  - textbox "Identity document"
  - status
  - text: Email
  - textbox "Email"
  - status
  - text: Phone
  - textbox "Phone"
  - status
  - button "Book passenger"
```

Evidence:

- [Error context](e2e-evidence/S0005-R8/error-context-attempt-1.md)
- [Screenshot](e2e-evidence/S0005-R8/screenshot-attempt-1.png)
- trace source: `e2e/test-results/S0005-passenger-bookings-U-d50b4-apacity-and-available-seats-chromium/trace.zip`
- video source: `e2e/test-results/S0005-passenger-bookings-U-d50b4-apacity-and-available-seats-chromium/video.webm`

## Run errors

None.

## Observed clues

- S0005-R8: The page tree contains two passenger list items. The availability text is `Rocket capacity: 3 · Available seats: 2`. The test expects `Rocket capacity: 3 · Available seats: 1`.
- Missing rule tags: f6fe67ec88096199d1c8-946d88b819e6703b1d00 (e2e/tests/home.test.ts:4), f6fe67ec88096199d1c8-b55c8832b446c337eab6 (e2e/tests/home.test.ts:10).
- Both service checks returned HTTP 200 before the run. Existing servers were reused.
- Servers remain running: back PID 13472; front PID 13348; parent PID 23540 (`node scripts/start.mjs`). Stop the process tree: `taskkill /PID 23540 /T /F`.
