---
name: implement-e2e-features
description: Writes or changes the Playwright e2e tests in e2e/ with Page Objects, locators by role or label, and retrying assertions. Use it each time you generate, write, change or fix an e2e test, or when the user invokes /implement-e2e-features.
---

# Implement the e2e tests

Write or change Playwright e2e tests in `e2e/tests/`.

## Input

1. Read the spec and the `.feature` files in `specs/<id>-<slug>/` (E1.1, E1.2).
2. Read the Page Objects in `e2e/pages/` (E6.1) and the data in `e2e/test-data/` (E7.1).

## Steps

1. Write one test file for each `.feature` file (E1).
2. Write one `test.describe` for each story and one `test` for each scenario (E5).
3. Use a Page Object for the navigation, the locators and the actions of each page (E6).
4. Use the inputs and the expected results of `e2e/test-data/` (E7).
5. Select the elements (E2) and check the observable result of each criterion (E3, E4).

## Rules

- Obey the rules E1 to E7 in [e2e-rules.md](references/e2e-rules.md).

## Output

1. Run the e2e tests and the type check with the commands in `AGENTS.md`.
