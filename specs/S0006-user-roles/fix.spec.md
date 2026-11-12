---
id: S0006
name: Fix E2E failures for User Roles
slug: user-roles
---

# S0006 - Fix E2E failures for User Roles

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [S0006](spec.md)  
E2E report date: 2026-11-12T13:11:35+01:00

## Problem

### C1 - Management uses a passenger

- Failures: `S0002-R1`, `S0002-R3-1`, `S0002-R3-2`, `S0002-R5-1`, `S0002-R5-2`, `S0002-R6`, `S0002-R4`, `S0002-R2-3`, `S0002-R2-4`, `S0002-R7`, `S0002-R2-5`, `S0002-R2-6`, `S0002-R8`, `S0003-R1`, `S0003-R4-1`, `S0003-R4-2`, `S0003-R5-1`, `S0003-R5-2`, `S0003-R6`, `S0003-R7`, `S0004-R1`, `S0004-R2-1`, `S0004-R2-2`, `S0004-R2-3`, `S0004-R3-1`, `S0004-R3-2`, `S0004-R3-3`, `S0004-R3-4`, `S0004-R4`, `S0004-R5`, `S0004-R6-1`, `S0004-R6-2`, `S0004-R7-1`, `S0004-R7-2`, `S0004-R7-3`, `S0004-R8`, `S0004-R9`, `S0005-R1-1`, `S0005-R1-2`, `S0005-R2-1`, `S0005-R2-2`, `S0005-R3-1`, `S0005-R3-2`, `S0005-R3-3`, `S0005-R3-4`, `S0005-R3-5`, `S0005-R3-6`, `S0005-R3-7`, `S0005-R3-8`, `S0005-R3-9`, `S0005-R3-10`, `S0005-R3-11`, `S0005-R3-12`, `S0005-R3-13`, `S0005-R3-14`, `S0005-R3-15`, `S0005-R3-16`, `S0005-R3-17`, `S0005-R3-18`, `S0005-R3-19`, `S0005-R3-20`, `S0005-R3-21`, `S0005-R4`, `S0005-R5-1`, `S0005-R5-2`, `S0005-R6-1`, `S0005-R6-2`, `S0005-R7-1`, `S0005-R7-2`, `S0005-R7-3`, `S0005-R8`, `S0005-R9-1`, `S0005-R9-2`.
- Origin: `spec` and `pruebas`.
- Confidence: high.
- Requirement: [S0006](spec.md), lines 40-43. Only an operator adds a rocket, schedules a launch, changes a launch status, books a passenger and sees the passengers. A passenger can list rockets, open a rocket, list launches and see a launch status.
- Expected: the operator performs each management action. Each current assertion stays the same.
- Observed: the failed tests log in as the seed user. Registration stores that user as a passenger. A management request then returns 403, or the page hides the management control and the test times out.
- Test: [add a rocket](../../e2e/tests/S0002-rocket-fleet/US1-add-rocket.test.ts), [list rockets](../../e2e/tests/S0002-rocket-fleet/US2-list-rockets.test.ts), [rocket details](../../e2e/tests/S0002-rocket-fleet/US3-see-rocket-details.test.ts), [schedule a launch](../../e2e/tests/S0003-schedule-launch/US1-schedule-launch.test.ts), [list launches](../../e2e/tests/S0003-schedule-launch/US2-list-launches.test.ts), [change status](../../e2e/tests/S0004-launch-lifecycle/US1-change-launch-status.test.ts), [suspend a launch](../../e2e/tests/S0004-launch-lifecycle/US2-suspend-launch.test.ts), [see status](../../e2e/tests/S0004-launch-lifecycle/US3-see-launch-status.test.ts), [book a passenger](../../e2e/tests/S0005-passenger-bookings/US1-book-passenger.test.ts), [see passengers](../../e2e/tests/S0005-passenger-bookings/US2-see-passengers.test.ts).
- Spec: [S0002](../S0002-rocket-fleet/spec.md), [S0003](../S0003-schedule-launch/spec.md), [S0004](../S0004-launch-lifecycle/spec.md), [S0005](../S0005-passenger-bookings/spec.md).
- Evidence: [S0002-R1 context](e2e-evidence/S0002-R1/error-context-attempt-1.md), [S0003-R1 context](e2e-evidence/S0003-R1/error-context-attempt-1.md), [S0003-R1 screenshot](e2e-evidence/S0003-R1/screenshot-attempt-1.png).
- Missing information: None.

### G1 - Management actor is still a registered user

- Cause: C1.
- Gap: [S0002 US1](../S0002-rocket-fleet/US1-add-rocket.feature), [S0003 US1](../S0003-schedule-launch/US1-schedule-launch.feature), [S0004 US1](../S0004-launch-lifecycle/US1-change-launch-status.feature) and [S0004 US2](../S0004-launch-lifecycle/US2-suspend-launch.feature) say "a registered user" for an action that S0006 gives only to an operator.

### G2 - S0005 e2e still uses the seed user

- Cause: C1.
- Gap: [S0005](../S0005-passenger-bookings/spec.md) tells the e2e tests to use the seed user. [S0005 US1](../S0005-passenger-bookings/US1-book-passenger.feature) and [S0005 US2](../S0005-passenger-bookings/US2-see-passengers.feature) already say "an operator".

## Solution

### Spec

- C1, G1: In S0002, S0003 and S0004, name an operator as the user who adds a rocket, schedules a launch or changes a launch status. Change that actor in `spec.md` and in the `.feature` files of those actions. Keep a registered user able to list rockets, open a rocket, list launches and see a launch status. Do not change a scenario whose actor is a request without a valid token. Do not remove a rule. Do not weaken a criterion.
- C1, G2: In S0005 `spec.md`, say that the e2e tests log in as the operator. Do not change the S0005 `.feature` files.

### Back

- None.

### Front

- None.

### E2E

- C1: In the failed tests, log in as the operator to create or change a rocket, a launch or a booking, and to perform a management action. Keep sending no token, or a token that is not valid, in a test that checks that case. Do not change an assertion. Do not remove a test. A comment that calls the seed user the actor of a management action must name the operator.

## Verification

- [ ] V1 (C1): `S0002-R1` keeps its assertion and passes in a new run of the full suite.
- [ ] V2 (C1): `S0002-R3-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V3 (C1): `S0002-R3-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V4 (C1): `S0002-R5-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V5 (C1): `S0002-R5-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V6 (C1): `S0002-R6` keeps its assertion and passes in a new run of the full suite.
- [ ] V7 (C1): `S0002-R4` keeps its assertion and passes in a new run of the full suite.
- [ ] V8 (C1): `S0002-R2-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V9 (C1): `S0002-R2-4` keeps its assertion and passes in a new run of the full suite.
- [ ] V10 (C1): `S0002-R7` keeps its assertion and passes in a new run of the full suite.
- [ ] V11 (C1): `S0002-R2-5` keeps its assertion and passes in a new run of the full suite.
- [ ] V12 (C1): `S0002-R2-6` keeps its assertion and passes in a new run of the full suite.
- [ ] V13 (C1): `S0002-R8` keeps its assertion and passes in a new run of the full suite.
- [ ] V14 (C1): `S0003-R1` keeps its assertion and passes in a new run of the full suite.
- [ ] V15 (C1): `S0003-R4-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V16 (C1): `S0003-R4-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V17 (C1): `S0003-R5-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V18 (C1): `S0003-R5-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V19 (C1): `S0003-R6` keeps its assertion and passes in a new run of the full suite.
- [ ] V20 (C1): `S0003-R7` keeps its assertion and passes in a new run of the full suite.
- [ ] V21 (C1): `S0004-R1` keeps its assertion and passes in a new run of the full suite.
- [ ] V22 (C1): `S0004-R2-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V23 (C1): `S0004-R2-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V24 (C1): `S0004-R2-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V25 (C1): `S0004-R3-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V26 (C1): `S0004-R3-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V27 (C1): `S0004-R3-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V28 (C1): `S0004-R3-4` keeps its assertion and passes in a new run of the full suite.
- [ ] V29 (C1): `S0004-R4` keeps its assertion and passes in a new run of the full suite.
- [ ] V30 (C1): `S0004-R5` keeps its assertion and passes in a new run of the full suite.
- [ ] V31 (C1): `S0004-R6-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V32 (C1): `S0004-R6-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V33 (C1): `S0004-R7-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V34 (C1): `S0004-R7-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V35 (C1): `S0004-R7-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V36 (C1): `S0004-R8` keeps its assertion and passes in a new run of the full suite.
- [ ] V37 (C1): `S0004-R9` keeps its assertion and passes in a new run of the full suite.
- [ ] V38 (C1): `S0005-R1-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V39 (C1): `S0005-R1-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V40 (C1): `S0005-R2-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V41 (C1): `S0005-R2-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V42 (C1): `S0005-R3-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V43 (C1): `S0005-R3-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V44 (C1): `S0005-R3-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V45 (C1): `S0005-R3-4` keeps its assertion and passes in a new run of the full suite.
- [ ] V46 (C1): `S0005-R3-5` keeps its assertion and passes in a new run of the full suite.
- [ ] V47 (C1): `S0005-R3-6` keeps its assertion and passes in a new run of the full suite.
- [ ] V48 (C1): `S0005-R3-7` keeps its assertion and passes in a new run of the full suite.
- [ ] V49 (C1): `S0005-R3-8` keeps its assertion and passes in a new run of the full suite.
- [ ] V50 (C1): `S0005-R3-9` keeps its assertion and passes in a new run of the full suite.
- [ ] V51 (C1): `S0005-R3-10` keeps its assertion and passes in a new run of the full suite.
- [ ] V52 (C1): `S0005-R3-11` keeps its assertion and passes in a new run of the full suite.
- [ ] V53 (C1): `S0005-R3-12` keeps its assertion and passes in a new run of the full suite.
- [ ] V54 (C1): `S0005-R3-13` keeps its assertion and passes in a new run of the full suite.
- [ ] V55 (C1): `S0005-R3-14` keeps its assertion and passes in a new run of the full suite.
- [ ] V56 (C1): `S0005-R3-15` keeps its assertion and passes in a new run of the full suite.
- [ ] V57 (C1): `S0005-R3-16` keeps its assertion and passes in a new run of the full suite.
- [ ] V58 (C1): `S0005-R3-17` keeps its assertion and passes in a new run of the full suite.
- [ ] V59 (C1): `S0005-R3-18` keeps its assertion and passes in a new run of the full suite.
- [ ] V60 (C1): `S0005-R3-19` keeps its assertion and passes in a new run of the full suite.
- [ ] V61 (C1): `S0005-R3-20` keeps its assertion and passes in a new run of the full suite.
- [ ] V62 (C1): `S0005-R3-21` keeps its assertion and passes in a new run of the full suite.
- [ ] V63 (C1): `S0005-R4` keeps its assertion and passes in a new run of the full suite.
- [ ] V64 (C1): `S0005-R5-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V65 (C1): `S0005-R5-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V66 (C1): `S0005-R6-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V67 (C1): `S0005-R6-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V68 (C1): `S0005-R7-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V69 (C1): `S0005-R7-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V70 (C1): `S0005-R7-3` keeps its assertion and passes in a new run of the full suite.
- [ ] V71 (C1): `S0005-R8` keeps its assertion and passes in a new run of the full suite.
- [ ] V72 (C1): `S0005-R9-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V73 (C1): `S0005-R9-2` keeps its assertion and passes in a new run of the full suite.
- [ ] V74: When the full E2E suite runs, all tests pass.
