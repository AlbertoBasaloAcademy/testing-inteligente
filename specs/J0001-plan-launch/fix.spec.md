---
id: J0001
name: Fix E2E failures for Plan a launch
slug: plan-launch
---

# J0001 - Fix E2E failures for Plan a launch

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [J0001](J0001-plan-launch.feature)  
E2E report date: 2026-11-16T18:10:39+01:00

## Problem

### C1 - The launch form keeps the first fleet

- Failures: `J0001-1`.
- Origin: `código`.
- Confidence: high.
- Requirement: [J0001](J0001-plan-launch.feature), line 11, "And the operator schedules a launch with that rocket". [S0003](../S0003-schedule-launch/spec.md), line 52, "The form has the fields `Rocket` (a list of the fleet rockets)".
- Expected: the Rocket field lists the rocket that the operator added in this session.
- Observed: the Rocket field lists the fleet from the first load of the rockets page. It omits the rocket added after that load. The test waits until the timeout.
- Test: [plan a launch](../../e2e/tests/J0001-plan-launch/J0001-plan-launch.test.ts).
- Spec: [S0003](../S0003-schedule-launch/spec.md).
- Evidence: [error context](e2e-evidence/J0001-1/error-context-attempt-1.md), [screenshot](e2e-evidence/J0001-1/screenshot-attempt-1.png).
- Missing information: None.

### G1 - The journey does not name the Rocket list

- Cause: C1.
- Gap: [J0001](J0001-plan-launch.feature) does not say that the Rocket field lists the rocket from the previous step. [S0003](../S0003-schedule-launch/spec.md) already requires a list of the fleet rockets.

## Solution

### Spec

- None.

### Back

- None.

### Front

- C1: The Rocket field on the launches page must list the current fleet. Include a rocket that the operator added in the same session before the operator opens the launches page.

### E2E

- C1: Keep the assertion of `J0001-1`. Do not change the test.

## Verification

- [ ] V1 (C1): `J0001-1` keeps its assertion and passes in a new run of the full suite.
- [ ] V2: When the full E2E suite runs, all tests pass.
