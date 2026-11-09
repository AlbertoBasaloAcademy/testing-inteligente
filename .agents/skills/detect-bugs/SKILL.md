---
name: detect-bugs
description: Runs Playwright tests for one spec or the full suite and writes an evidence report. Use it to check an existing spec, or when the user invokes /detect-bugs.
---

# Run E2E tests

Run the selected tests. Record results and evidence without diagnosis or repairs.

## Input

1. Read `AGENTS.md`, `e2e/playwright.config.ts` and the root start and reset scripts.
2. Get the spec code, for example `S0005`, and the scope: one spec or the full suite.
3. If an input is missing, ask one closed question at a time.
4. Find the matching `specs/<spec>-<slug>/` folder.
5. Read the [report template](assets/e2e-report.template.md).

## Steps

1. Check `http://localhost:3000/api/health` and `http://localhost:4000`.
   Require HTTP 200 from both endpoints.
2. If either check fails, run `npm run stop`, then `npm run reset`, from the root.
   If reset fails, stop and report the command error.
   Start `npm start` from the root in the background.
   Keep the process ID and log paths.
   On Windows, use a hidden process window.
   Check both endpoints every two seconds for up to 60 seconds.
   If either endpoint remains unavailable, stop and report the checks and logs.
3. Run the selected command from `e2e/`.
   For one spec, use `npx playwright test --grep @<spec>`.
   For the full suite, use `npx playwright test`.
   Record the command, start time and exit code.
4. Read `e2e/test-results/results.json` from this run.
   Reject a missing, invalid or stale result file.
   Read nested suites, test tags, result attempts and run errors.
5. Assign each test its rule tag as its ID, without `@`.
   For duplicate rule tags, add `-1`, `-2` and subsequent numbers.
   Assign suffixes in file, line and column order across all selected tests.
   Keep one ID across retries.
   If a rule tag is missing, use the Playwright test ID and record the missing tag.
6. For each failed attempt, read its errors, attachments and `error-context.md`.
   Find evidence through attachment paths or the recorded test output folder.
   Extract the page content as specified in Rules.
7. Remove the previous `e2e-evidence/` from the selected spec folder.
   Verify that its resolved path is inside that folder before removal.
   If you run the tests again, remove it again before you copy.
   Copy evidence only from the run that the report describes.
   Copy each available context file and failure screenshot to
   `e2e-evidence/<test-id>/`.
   Use only these filenames, where `<n>` is the attempt number:
   `error-context-attempt-<n>.md` and `screenshot-attempt-<n>.png`.
   Do not copy traces or videos.
8. Replace `e2e-report.md` in the selected spec folder with the report.
   Use the template and the output rules.
   Check counts, test IDs, excerpt lengths and evidence links.
   Make sure that each link opens a file,
   and that each file in `e2e-evidence/` has a link.
   Remove files that have no link.

## Rules

- Do not diagnose, repair, or change tests, code or configuration.
- Record observed clues only. Mark missing evidence as unavailable.
- Remove ANSI escape sequences from reported errors.
- Find fenced YAML page trees in every section of `error-context.md`.
  Select only the `main` node and its descendants by indentation.
  Include at most 40 lines in total, including the `main` node.
  Mark truncation outside the code block.
  If no `main` node exists, state that it is unavailable.
  Do not include other context sections in the report.
- Copy the complete `error-context.md` as evidence.
- Use relative Markdown links for copied evidence.
  Record trace and video source paths only.
- Put failed tests from the selected spec in `Failures`.
  Put failed tests from other specs in `Regressions`.
  Keep all evidence in the selected spec folder.
- Record failed retry attempts, flaky outcomes and run errors.
  Do not classify skipped tests or zero selected tests as a complete pass.
- Leave the servers running.
  Report their state and the stop command: `npm run stop` from the root.

## Output

1. Save `specs/<spec>-<slug>/e2e-report.md`.
2. For a complete pass, keep only the date, command and result in the report.
   Remove `e2e-evidence/`.
   Reply with one line.
3. For failures, include each test ID, all tags, file and line, errors,
   page excerpt and evidence links.
   Include run errors even when no test result exists.
4. Report an incomplete run as incomplete.
   Do not reuse results or evidence from an earlier run.
5. Include the running server notice and stop command in the final reply.
   For a complete pass, include them in the same line.
