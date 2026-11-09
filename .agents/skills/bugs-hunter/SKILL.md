---
name: bugs-hunter
description: Pipeline that runs tests, triages failures and applies the fix. Runs detect-bugs, stops for the verdict, then runs fix-bugs and detect-bugs again. Use it for one spec or the full suite, or when the user invokes /bugs-hunter.
---

# Hunt bugs

Coordinate the skills that detect, triage and fix failures. Do not do their tasks in this skill.

## Input

1. Get the spec code from the user, for example `S0005`.
2. Get the scope from the user: one spec or the full suite.
3. If the user gives an input, do not ask for it again.

## Steps

1. Run [detect-bugs](../detect-bugs/SKILL.md) with the spec and the scope.
2. If `detect-bugs` finds no failures, reply with one line and stop.
3. Run [triage-bugs](../triage-bugs/SKILL.md) with the spec.
4. Stop and ask the user to approve the verdict. This is the pause of `triage-bugs`. Do not ask again.
5. If the user does not approve, change the verdict and ask again. Do not continue.
6. Run [fix-bugs](../fix-bugs/SKILL.md) with the spec.
7. Run [detect-bugs](../detect-bugs/SKILL.md) again with the same spec and the same scope.
8. If this run finds failures, report them and stop. Do not run `triage-bugs` again.

## Rules

- Run the skills in order, in this conversation. Do not use subagents.
- Obey the Input, Steps, Rules and Output of each skill.
- Stop for approval only once, at step 4. Do not add other pauses.
- A skill can still ask a closed question when a data item is missing.
- If a skill fails, stop and report the failure. Do not run the next skill.
- Run the last `detect-bugs` once. Do not loop.

## Output

1. For no failures, the one line from the first `detect-bugs`.
2. The path of `specs/<spec>-<slug>/fix.spec.md` when `triage-bugs` writes it.
3. The output of `fix-bugs`.
4. The output of the last `detect-bugs`.
