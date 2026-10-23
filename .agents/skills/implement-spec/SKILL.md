---
name: implement-spec
description: Implements the back and the front of a written spec in specs/, with unit tests for the service layer only. Use it when you implement a spec that exists already, or when the user invokes /implement-spec.
---

# Implement a spec

Implement the back and the front of one spec. The result is an application that you can test.

## Read the context

1. Read `AGENTS.md`.
2. Read the spec in `specs/<id>-<slug>/spec.md`.
3. Read the code in `projects/back` and `projects/front` that is related to the spec.
4. Find the existing style: folders, names, layers and test files.

## Decide

- Make an assumption when the context gives a safe answer.
- If you are not sure, ask one closed question (yes/no or pick-one). Propose your answer.
- Ask one question at a time.

## Goals

- Each EARS criterion (`R1`, `R2`, ...) is a goal that you can verify.
- Each business rule is a goal that you can verify.

## Implement

1. Implement the back. Follow the **Back** steps of the spec.
2. Implement the front. Follow the **Front** steps of the spec.
3. Write the minimum code that satisfies the spec.
4. Do not add speculative code. Do not add a feature, an option or an abstraction that the spec does not need.
5. Use the existing style and the existing structure.
6. Obey the code complexity limits in `AGENTS.md`.
7. Do not implement the **E2E** steps.

## Unit tests

- Write unit tests only for the service layer (`logic`).
- Write at least one test for each business rule.
- Use fake data. Do not use a real database.
- Do not test routes, controllers, components or infrastructure.
- Use Vitest through `vite-plus/test`. Put each test near the code that it tests.

## Finish

1. Run `vp check`. If it fails, run `vp check --fix` and fix the remaining errors.
2. Run `npm test` in the root folder. Fix the code until all tests pass.
3. Stop when `vp check` and `npm test` pass.
4. Report each criterion (`R1`, `R2`, ...) and the code that satisfies it.
