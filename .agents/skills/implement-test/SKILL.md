---
name: implement-test
description: Writes or changes the Playwright e2e tests in e2e/ for a spec or a journey, with Page Objects, locators by role or label, and retrying assertions. Use it each time you generate, write, change or fix an e2e test, or when the user invokes /implement-test.
---

# Implement the e2e tests

Write or change Playwright e2e tests in `e2e/tests/`.

## Input

1. The code decides the mode. `S` is a spec. `J` is a journey. If the user gives the code, do not ask for it again.
2. For a spec, read the spec and the `.feature` files in `specs/<id>-<slug>/` (E1.1, E1.2).
3. For a journey, read the `.feature` in `specs/J<id>-<slug>/`. Read the specs named on its first line.
4. Read the Page Objects in `e2e/pages/` (E6.1) and the data in `e2e/test-data/` (E7.1).

## Steps

1. For a journey, write the test file and obey E8. E8 names every other rule that applies. Do not follow steps 2 to 6.
2. Write one test file for each `.feature` file (E1).
3. Write one `test.describe` for each story and one `test` for each scenario (E5).
4. Use a Page Object for the navigation, the locators and the actions of each page (E6).
5. Use the inputs and the expected results of `e2e/test-data/` (E7).
6. Select the elements (E2) and check the observable result of each criterion (E3, E4).

## Rules

- Obey the rules in [e2e-rules.md](references/e2e-rules.md) as the steps say.

## Output

1. Run the e2e tests and the type check with the commands in `AGENTS.md`.
