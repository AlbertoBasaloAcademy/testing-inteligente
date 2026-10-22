---
name: implement-spec
description: Implement the back and the front of a spec that is already written in specs/. Use it when the user asks to build, code or implement a spec, so that the application is ready to test.
argument-hint: "<path of the spec>"
---

# Implement a spec

Implement the back and the front of a spec. The result is an application that the e2e tests can use.

## Steps

1. Read the spec. Read `AGENTS.md`, `projects/back/AGENTS.md` and the other `AGENTS.md` files of the folders that you change.
2. Read the existing features in `projects/back/src/features` and `projects/front/src/features`. Use the same structure, names and style.
3. Make a list of the EARS criteria (`R1`, `R2`, …). Each criterion is a verifiable target.
4. Make assumptions from the context. If you have a doubt that changes the result, ask one closed question. Give your proposed answer.
5. Implement the back: migration, types, repository, service, controller and routes, as the existing features do.
6. Write unit tests for the service layer only. Use fake data. Write 1 or more tests for each business rule.
7. Implement the front: API client, pages, components and routes, as the existing features do.
8. Run `vp check --fix` and then `vp check` in the root folder. Fix all the errors.
9. Run `npm test` in the root folder. Fix all the failures.
10. Show which criteria the code satisfies. Show each assumption.

## Rules

- Write the minimum code that satisfies the spec.
- Do not write speculative code. Do not add a feature, an option or a field that the spec does not need.
- Do not change code that the spec does not need.
- Obey the code complexity limits of `AGENTS.md`.
- Do not test routes, controllers, components or infrastructure.
- Do not write e2e tests. Do not change `e2e/`, except `e2e/core/seed-data.ts` if the spec needs seed data.
- Do not commit.

## Done

- `vp check` passes.
- `npm test` passes.
