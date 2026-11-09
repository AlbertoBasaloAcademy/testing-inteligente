---
name: fix-bugs
description: Implements an approved correction plan from fix.spec.md. Use it to apply the fixes for a spec code, or when the user invokes /fix-bugs.
---

# Implement a fix

Apply the solution in one correction spec. Keep each change within its stated scope.

## Input

1. Get the spec code from the user, for example `S0005`.
   If it is missing, ask one closed question for the code.
2. Find `specs/<spec>-<slug>/fix.spec.md`.
   If it does not exist, show `No fix.spec.md found for <spec>.` and stop.
3. Use `fix.spec.md` as the only input about the failures.
   Do not read `e2e-report.md` or the triage chat.
4. Read the files that `fix.spec.md` links to.
   Include the tests, Page Objects, `.feature` files, specs and code.

## Steps

1. Read `Solution` and `Verification` in `fix.spec.md`.
   Identify each correction (`Cn`), gap (`Gn`) and criterion (`Vn`).
2. Prepare a plan in this order: `Spec`, `Back`, `Front`, `E2E`.
   Skip each section that says `None`.
   Show a table with `Code`, `File` and `Change`.
   Use the `Cn` or `Gn` codes from `fix.spec.md`.
3. Stop and ask the user to approve the plan.
   Do not change files before approval.
   If necessary information is missing, ask one closed question at a time.
4. After approval, apply `Spec`.
   Close each gap (`G1`, `G2`, ...) with a minimum change in its `.feature`
   file or `spec.md`.
   Do not regenerate files.
   Do not change other scenarios or criteria.
5. Apply `Back`, then `Front`.
   Read and obey the [implementation rules](../implement-spec/SKILL.md#rules)
   for these changes.
6. Apply `E2E`.
   Read and obey the [E2E rules](../implement-test/references/e2e-rules.md).
   Change tests for another spec only if `fix.spec.md` requests it.
7. Run `npm run check`, then `npm test`, in the root folder.
   Run `npm test -- --list` in `e2e/`.
8. Correct check failures only within the approved scope.
   Run the affected checks again after a correction.
   If a required change is outside that scope, show an updated plan.
   Stop and request approval before that change.
9. Show the results and the `Verification` table.
   Leave the E2E execution to `/detect-bugs` in another conversation.

## Rules

- Apply only the changes in the approved plan.
- Keep an assertion unchanged when `Verification` says it must not change.
- Do not remove checks or skip tests.
- Do not add fixed waits.
- Change an expected value only when `Solution` requests it.
  Use only the expected value from the `.feature` file.
- Do not use `git stash`, `git reset` or `git checkout`.
  Do not use another command that discards or replaces uncommitted work.
- Do not change or delete `fix.spec.md`, `e2e-report.md` or `e2e-evidence/`.
- Do not execute E2E tests.
  The `--list` command must only list the tests.

## Output

1. Before changes, show the plan table and request approval.
2. After changes, list the changed files.
3. Report the result of each required command.
   Identify failed checks and unresolved items.
   State that E2E tests were not executed.
4. Show one row for each criterion in `Verification`.
   Use the columns `Criterion`, `Change` and `Status`.
   Keep the original `V1`, `V2`, ... codes.
   Identify the file and change that must satisfy each criterion.
   Mark a criterion as unresolved if no change satisfies it.
   Do not claim that E2E behavior passed from static checks or test listing.
