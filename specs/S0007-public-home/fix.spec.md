---
id: S0007
name: Fix E2E failures for Public Home
slug: public-home
---

# S0007 - Fix E2E failures for Public Home

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [S0007](spec.md)  
E2E report date: 2026-11-18T13:36:32+01:00

## Problem

### C1 - The R1 check requires one match of the rocket name

- Failures: `S0007-R1`.
- Origin: `pruebas`.
- Confidence: high.
- Requirement: [US1](US1-see-upcoming-launches.feature), line 17, "And the system shows that launch with its rocket name, date, price per passenger and status only".
- Expected: the seed launch shows its rocket name, date, price per passenger and status.
- Observed: the check looks for `Seed Rocket` alone and the page has many matches.
- Test: [US1 test](../../e2e/tests/S0007-public-home/US1-see-upcoming-launches.test.ts).
- Spec: [spec](spec.md).
- Evidence: [S0007-R1 context](e2e-evidence/S0007-R1/error-context-attempt-1.md).
- Missing information: None.

### C2 - The R6 check requires an empty list

- Failures: `S0007-R6`.
- Origin: `spec`.
- Confidence: high.
- Requirement: [US2](US2-see-no-upcoming-launch.feature), line 14, "Then the system shows "No upcoming launches."".
- Expected: the full suite proves the empty message.
- Observed: the seed creates one upcoming launch, and [spec](spec.md) line 36 puts e2e proof of the empty list out of scope.
- Test: [US2 test](../../e2e/tests/S0007-public-home/US2-see-no-upcoming-launch.test.ts).
- Spec: [spec](spec.md).
- Evidence: [S0007-R6 context](e2e-evidence/S0007-R6/error-context-attempt-1.md).
- Missing information: This run did not open `/` with an empty list.

### G1 - US2 does not state the seed launch

- Cause: C2.
- Gap: [US2](US2-see-no-upcoming-launch.feature) line 12 says "Given there is no upcoming launch". It does not state that the seed rocket has one upcoming launch.

## Solution

### Spec

- C2, G1: In [US2](US2-see-no-upcoming-launch.feature), keep the story text and the code `R6`. Replace the scenario steps. The visitor has no session. The seed rocket has one upcoming launch. The visitor opens `/`. The system does not show `No upcoming launches.`.
- C2, G1: In [spec](spec.md), replace criterion R6 with that same result. Keep the business rule for an empty list. Keep R1, R2, R3, R4, R5 and R7.

### Back

- None.

### Front

- None.

### E2E

- C1: In the R1 test, check one launch that shows the seed rocket name, the seed date, the seed price and the seed status together. Other upcoming launches may be on the page. Keep those four values. Keep the checks for `AstroBookings`, the offer text and the `Register` link.
- C2: In the R6 test, check the result from the updated feature. Keep the test and the tag `@S0007-R6`.

## Verification

- [ ] V1 (C1): When the full suite runs, the R1 test passes. It checks the seed launch with its rocket name, date, price per passenger and status. Those values do not change. The checks for the name, the offer and the register link do not change.
- [ ] V2 (C2): When the full suite runs, the R6 test passes. It checks that the system does not show `No upcoming launches.` while the seed launch exists. It does not need an empty list.
- [ ] V3: When the full E2E suite runs, all tests pass.
