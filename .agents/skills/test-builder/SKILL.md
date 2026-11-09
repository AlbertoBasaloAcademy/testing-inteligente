---
name: test-builder
description: Pipeline that writes the e2e tests of a spec. Runs define-test, stops for the user to approve the scenarios, then runs implement-test and fix-test. Use it to test a spec that exists in specs/, or when the user invokes /test-builder.
---

# Build the tests of a spec

Coordinate the skills that write, implement and fix the e2e tests of one spec. Do not do their tasks in this skill.

## Input

1. Get the spec code from the user, for example `S0005`.
2. If the user gives the spec, do not ask for it again.

## Steps

1. Run [define-test](../define-test/SKILL.md) with the spec.
2. Stop and ask the user to approve the scenarios. This is the pause of `define-test`. Do not ask again.
3. If the user does not approve, change the scenarios and ask again. Do not continue.
4. Run [implement-test](../implement-test/SKILL.md) with the approved `.feature` files.
5. Run [fix-test](../fix-test/SKILL.md) on the test files of the spec.

## Rules

- Run the skills in order, in this conversation. Do not use subagents.
- Obey the Input, Steps, Rules and Output of each skill.
- Stop for approval only once, at step 2. Do not add other pauses.
- A skill can still ask a closed question when a data item is missing.
- If a skill fails, stop and report the failure. Do not run the next skill.

## Output

1. The paths of the `.feature` files and the test files.
2. The output of `implement-test`.
3. The output of `fix-test`.
