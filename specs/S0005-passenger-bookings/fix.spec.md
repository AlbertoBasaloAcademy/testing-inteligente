---
id: S0005
name: Fix E2E failures for Passenger Bookings
slug: passenger-bookings
---

# S0005 - Fix E2E failures for Passenger Bookings

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [S0005](spec.md)  
E2E report date: 2026-11-03

## Problem

### C1 - Invalid status transition in test setup

- Failures: `S0005-R7-3`.
- Origin: `pruebas`.
- Confidence: high.
- Requirement: [US1 feature](US1-book-passenger.feature), line 110, "Then the system returns 409".
- Expected: A booking for a failed launch returns 409 and is not saved.
- Observed: The setup requests the transition from planned to failed and receives 409 before it sends the booking request.
- Test: [US1 test](../../e2e/tests/S0005-passenger-bookings/US1-book-passenger.test.ts).
- Spec: [S0004](../S0004-launch-lifecycle/spec.md).
- Evidence: [failure context](e2e-evidence/S0005-R7-3/error-context-attempt-1.md).
- Missing information: None.

### C2 - Incorrect passenger page route in Page Object

- Failures: `S0005-R8`, `S0005-R9-1`, `S0005-R9-2`.
- Origin: `pruebas`.
- Confidence: high.
- Requirement: [S0005](spec.md), line 54, "Open `/launches/:id/bookings`."
- Expected: The operator can open the passenger page and the access checks apply.
- Observed: The tests open a different route and see a page not found.
- Test: [US2 test](../../e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts); [Page Object](../../e2e/pages/bookings.page.ts).
- Spec: [US2 feature](US2-see-passengers.feature).
- Evidence: [R8](e2e-evidence/S0005-R8/error-context-attempt-1.md), [R9 without token](e2e-evidence/S0005-R9-1/error-context-attempt-1.md), [R9 invalid token](e2e-evidence/S0005-R9-2/error-context-attempt-1.md).
- Missing information: None.

### C3 - Exact text assertion includes extra launch content

- Failures: `S0003-R7`.
- Origin: `pruebas`.
- Confidence: high.
- Requirement: [S0003 US2 feature](../S0003-schedule-launch/US2-list-launches.feature), line 17, "And the launch shows the rocket name, the date and the price per passenger".
- Expected: The launch shows the three required values.
- Observed: The assertion requires the full list item to contain only those values, but the item also contains the status and controls.
- Test: [S0003 US2 test](../../e2e/tests/S0003-schedule-launch/US2-list-launches.test.ts).
- Spec: [S0004](../S0004-launch-lifecycle/spec.md).
- Evidence: [failure context](e2e-evidence/S0003-R7/error-context-attempt-1.md).
- Missing information: None.

### G1 - Passenger page navigation is not defined in the feature

- Cause: C2.
- Gap: [US2 feature](US2-see-passengers.feature) does not state how to open the passenger page.

## Solution

### Spec

- G1: State how to open the passenger page in the US2 feature, consistent with S0005.

### Back

- None.

### Front

- None.

### E2E

- C1: Prepare a failed launch through valid status transitions. Keep the booking rejection and no-booking assertions.
- C2: Open the passenger page specified by S0005. Keep the passenger details, availability and login assertions.
- C3: Check the three required launch values without requiring the list item to exclude other content.

## Verification

- [ ] V1 (C1): In a new run of the full suite, `S0005-R7-3` reaches the booking request, checks the unchanged 409 and no-booking assertions, and passes.
- [ ] V2 (C2, G1): In a new run of the full suite, `S0005-R8` opens the passenger page, checks the unchanged passenger details and availability assertions, and passes.
- [ ] V3 (C2, G1): In a new run of the full suite, `S0005-R9-1` opens the passenger page without a token, checks the unchanged login assertion, and passes.
- [ ] V4 (C2, G1): In a new run of the full suite, `S0005-R9-2` opens the passenger page with an invalid token, checks the unchanged login assertion, and passes.
- [ ] V5 (C3): In a new run of the full suite, `S0003-R7` checks the rocket name, date and price and passes when the item also shows other content.
- [ ] V6: When the full E2E suite runs, all tests pass.
