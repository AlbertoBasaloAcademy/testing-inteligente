---
id: S0005
name: Fix E2E failures for Passenger Bookings
slug: passenger-bookings
---

# S0005 - Fix E2E failures for Passenger Bookings

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [S0005](spec.md)  
E2E report date: 2026-11-04

## Problem

### C1 - Passenger page shows the booking count as available seats

- Failures: `S0005-R8`.
- Origin: `código`.
- Correcting agent: `código` (Front).
- Confidence: high.
- Requirement: [US2 feature](US2-see-passengers.feature), line 21, "And the page shows 1 available seat".
- Expected: A launch with rocket capacity 3 and two bookings shows 1 available seat.
- Observed: The passenger page shows two bookings and 2 available seats.
- Test: [US2 test](../../e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts).
- Spec: [S0005](spec.md).
- Evidence: [failure context](e2e-evidence/S0005-R8/error-context-attempt-1.md), [screenshot](e2e-evidence/S0005-R8/screenshot-attempt-1.png).
- Missing information: None.

### G1 - Initial launch status is not defined in the feature

- Related cause: C1. This gap does not cause the observed seat count error.
- Correcting agent: `spec`.
- Gap: [US2 feature](US2-see-passengers.feature), line 9, "Given a launch exists", does not specify a status that permits the setup to create bookings.
- Constraint: [S0005](spec.md), line 26, "A booking must be created only when the launch status is `planned` or `confirmed`."

## Solution

### Spec

- G1: Specify an initial launch status that permits the R8 scenario to create its two bookings. Keep the capacity, passenger data and expected available seat count.

### Back

- None.

### Front

- C1: Show the available seat count returned by the back on the passenger page. Keep the rocket capacity and passenger details.

### E2E

- None. Keep the current R8 assertions, including capacity 3 and 1 available seat.

## Verification

- [ ] V1 (G1): The R8 feature specifies an initial launch status that permits its booking setup.
- [ ] V2 (C1): In a new run of the full suite, `S0005-R8` shows both bookings, rocket capacity 3 and 1 available seat, and passes. Its assertions do not change.
- [ ] V3: When the full E2E suite runs, all tests pass.
