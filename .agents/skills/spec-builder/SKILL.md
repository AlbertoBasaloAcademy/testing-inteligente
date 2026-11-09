---
name: spec-builder
description: Pipeline that writes a spec and implements it. Runs define-spec, stops for the user to approve the spec, then runs implement-spec. Use it to build a feature from a request, or when the user invokes /spec-builder.
---

# Build a spec

Coordinate the skills that write and implement one spec. Do not do their tasks in this skill.

## Input

1. Get the feature from the user.
2. If the user gives the feature, do not ask for it again.

## Steps

1. Run [define-spec](../define-spec/SKILL.md) with the feature.
2. Stop and ask the user to approve the spec. This is the pause of `define-spec`. Do not ask again.
3. If the user does not approve, change the spec and ask again. Do not continue.
4. Run [implement-spec](../implement-spec/SKILL.md) with the approved spec.

## Rules

- Run the skills in order, in this conversation. Do not use subagents.
- Obey the Input, Steps, Rules and Output of each skill.
- Stop for approval only once, at step 2. Do not add other pauses.
- A skill can still ask a closed question when a data item is missing.
- If a skill fails, stop and report the failure. Do not run the next skill.

## Output

1. The path of the spec: `specs/<id>-<slug>/spec.md`.
2. The output of `implement-spec`.
