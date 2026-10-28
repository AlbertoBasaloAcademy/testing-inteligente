---
name: review-e2e-tests
description: Reviews the Playwright e2e tests in e2e/tests/ against the e2e rules and the EARS criteria of the specs. Shows a report, then fixes the tests after the user approves. Use it after you write or change e2e tests, or when the user invokes /review-e2e-tests.
---

# Review the e2e tests

Make each e2e test obey the e2e rules and check the response of its EARS criterion. Keep what each test checks.

## Input

1. Read the rules E1 to E7 in [e2e-rules.md](../implement-e2e-features/references/e2e-rules.md).
2. Read the rule of independent tests in `AGENTS.md`, section "E2E tests".
3. Read each `*.test.ts` file in `e2e/tests/`. Playwright runs only these files.
4. Read the Page Objects in `e2e/pages/` and the data in `e2e/test-data/` that the tests import.
5. For each test file, read the spec and the `.feature` files in `specs/<id>-<slug>/`.
6. If the user names some specs or test files, review only those.

## Steps

1. Compare each test with each rule E1 to E7 and with the rule of independent tests.
2. Compare the expected result of each test with the response of its EARS criterion in the spec.
3. Find each scenario that has no test. Find each test that has no scenario.
4. Show the report. Then stop and ask the user to approve the fixes.
5. Run the e2e tests with the commands in `AGENTS.md`. Record the result of each test as the baseline.
6. Fix the approved problems.
7. Run the same e2e tests and the type check again.
8. Compare the result of each test with the baseline.

## Rules

- Keep what each test checks. Keep each `expect` of each test.
- Do not make an assertion weaker. For example, do not change `toHaveText` to `toBeVisible`.
- Do not make a spec code (E1.5). For a test that has no scenario, write it in the report only.
- Do not change the specs, the `.feature` files or the application code in `projects/`.
- If the expected result of a test does not agree with its criterion, ask the user.
- If a test fails in the baseline, write it in the report. Do not change the application to make it pass.

## Output

1. The report. One row for each problem:

   | File:line | Code | Problem | Fix |
   | --- | --- | --- | --- |
   | `US1-schedule-launch.test.ts:14` | E3.3 | Checks only the URL | Check the new launch in the list |
   | `US1-schedule-launch.feature:9` | R4 | Scenario without a test | Add a `test` for R4 |

2. After the fixes, a table with the result of each test, before and after.
3. The diff of each changed file.
4. Verify that each test that passed in the baseline passes after the fixes.
