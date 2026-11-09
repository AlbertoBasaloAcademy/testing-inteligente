---
name: fix-test
description: Fixes the Playwright e2e tests in e2e/tests/ against the e2e rules and the EARS criteria of the specs, and adds a test for each scenario without a test. Does not stop for approval. Use it after you write or change e2e tests, or when the user invokes /fix-test.
---

# Fix the e2e tests

Make each e2e test obey the e2e rules and check the response of its EARS criterion. Keep what each test checks.

## Input

1. Read the rules E1 to E7 in [e2e-rules.md](../implement-test/references/e2e-rules.md).
2. Read the rule of independent tests in `AGENTS.md`, section "E2E tests".
3. Read each `*.test.ts` file in `e2e/tests/`. Playwright runs only these files.
4. Read the Page Objects in `e2e/pages/` and the data in `e2e/test-data/` that the tests import.
5. For each test file, read the spec and the `.feature` files in `specs/<id>-<slug>/`.
6. If the user names some specs or test files, fix only those.

## Steps

1. Compare each test with each rule E1 to E7 and with the rule of independent tests. Fix each problem.
2. Compare the expected result of each test with the response of its EARS criterion in the spec. Make the expected result agree with the criterion.
3. Find each scenario that has no test. Add a test for it.
4. Find each test that has no scenario. Write it in the table only.

## Rules

- Keep what each test checks. Keep each `expect` of each test.
- Do not make an assertion weaker. For example, do not change `toHaveText` to `toBeVisible`.
- Do not make a spec code (E1.5).
- Do not change the specs, the `.feature` files or the application code in `projects/`.
- Do not run the e2e tests. Do not run the type check. The pre-commit hook does it.

## Output

1. A table with one row for each change:

   | File:line | Rule or criterion | Change |
   | --- | --- | --- |
   | `US1-schedule-launch.test.ts:14` | E3.3 | Check the new launch in the list, not only the URL |
   | `US1-schedule-launch.test.ts:40` | R4 | Add a `test` for R4 |
   | `US2-cancel-launch.test.ts:22` | — | Test without a scenario. Not changed |

2. The diff of each changed file.
