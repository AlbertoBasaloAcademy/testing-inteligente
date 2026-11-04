---
id: S0042
name: Fix E2E failures for Example Feature
slug: example-feature
---

# S0042 - Fix E2E failures for Example Feature

C is a cause, G is a spec gap, and V is a verification criterion.

Spec: [S0042](spec.md)  
E2E report date: 2030-04-12

## Problem

### C1 - Example cause

- Failures: `example failure`.
- Origin: `pruebas`.
- Confidence: high.
- Requirement: [feature](../../../e2e/features/example.feature), line 12, "Then the result is visible".
- Expected: the result is visible.
- Observed: the test checks a different result.
- Test: [example test](../../../e2e/tests/example/example.test.ts).
- Spec: [spec](spec.md).
- Evidence: [failure evidence](e2e-evidence/example.png).
- Missing information: None.

### G1 - Example spec gap

- Cause: C1.
- Gap: the feature does not state which page opens the result.

## Solution

### Spec

- C1, G1: State which page opens the result in the feature.

### Back

- None.

### Front

- None.

### E2E

- C1: Check the result that the feature specifies.

## Verification

- [ ] V1 (C1): When the example scenario runs in a new run of the full suite, the test checks the specified result and passes.
- [ ] V2: When the full E2E suite runs, all tests pass.
