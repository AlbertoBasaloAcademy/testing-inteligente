---
name: implement-spec
description: Implements the back and the front of a written spec in specs/, with unit tests for the service layer only. Use it when you implement a spec that exists already, or when the user invokes /implement-spec.
---

# Implement a spec

Implement the back and the front of one spec. The result is an application that you can test.

## Input

1. Read the spec in `specs/<id>-<slug>/spec.md`.
2. Read the code in `projects/back` and `projects/front` that is related to the spec.
3. Find the existing style: folders, names, layers and test files.
4. Make an assumption when the context gives a safe answer.
5. If you are not sure, ask the user. Propose your answer.

## Steps

1. Implement the back. Follow the **Back** steps of the spec.
2. Implement the front. Follow the **Front** steps of the spec.
3. Write the unit tests.
4. Run `vp check`. If it fails, run `vp check --fix` and fix the remaining errors.
5. Run `npm test` in the root folder. Fix the code until all tests pass.
6. Stop when `vp check` and `npm test` pass.

## Rules

- Each EARS criterion (`R1`, `R2`, ...) is a goal that you can verify.
- Each business rule is a goal that you can verify.
- Write the minimum code that satisfies the spec.
- Do not add speculative code. Do not add a feature, an option or an abstraction that the spec does not need.
- Use the existing style and the existing structure.
- Do not implement the **E2E** steps.
- Write unit tests only for the service layer (`logic`).
- Do not test routes, controllers, components or infrastructure.

## Output

1. Report each criterion (`R1`, `R2`, ...) and the code that satisfies it.
