---
name: define-features
description: Write or review the Gherkin .feature files of a spec that is already written in specs/, with the template of this skill (assets/spec.user-story.template.feature). Use it when you write the .feature files of a spec or when you review them.
argument-hint: "<path of the spec>"
---

# Define the features of a spec

Write one `.feature` file for each user story of a spec. Use the template [assets/spec.user-story.template.feature](assets/spec.user-story.template.feature).

## Steps

1. Read the spec, `assets/spec.user-story.template.feature` and `AGENTS.md`.
2. Make a list of the user stories (`US1`, `US2`, …) and of the EARS criteria (`R1`, `R2`, …).
3. Find the story of each criterion. The spec writes it after the code, for example `R3 (US2)`.
4. If a criterion has no story or no code, ask one closed question. Ask one question at a time.
5. Write the `.feature` files. Obey the rules below.
6. Show all the files to the user.
7. Save the files only when the user confirms.

## Rules

### Files

- Write one `.feature` file for each user story.
- Save the file in the folder of the spec.
- Name the file `<spec id>-<story slug>.feature`, for example `S0002-add-rocket.feature`.
- The story slug is the action of the story in kebab-case.
- Write the path of the spec in the first line: `# Spec: specs/<file of the spec>`.

### Feature

- Write the title of the feature from the action of the story.
- Write the story in 3 lines: `As a …`, `I want to …`, `So that …`.
- Use a `Background` only for preconditions that all the scenarios of the file share.

### Scenarios

- Write one scenario for each EARS criterion of the story.
- Do not put 2 criteria in one scenario. Do not write a scenario without a criterion.
- Start the name of the scenario with the code of the criterion, for example `Scenario: [R1] Add a valid rocket`.
- Write the scenarios in the order of the codes.
- Translate the EARS criterion: the trigger or the condition goes to `When`, the response goes to `Then`. The state or the context goes to `Given`.
- Use a `Scenario Outline` with `Examples` when one criterion has more than one set of data.
- Use only the data, the values and the status codes that the spec gives.

### Prohibitions

- Do not invent rules, criteria, codes or data.
- Do not change the spec.
- Do not write tests, step definitions or application code.

### Style

- Write the Gherkin keywords in English: `Feature`, `Background`, `Scenario`, `Scenario Outline`, `Examples`, `Given`, `When`, `Then`, `And`.
- Write the steps in English, in the style of ASD-STE100: short sentences, active voice, one action in each step.
- Write the steps from the point of view of the user. Do not name the code, the tables or the endpoints, except the status codes.

## Review the features

- Check each rule above. List each failure with its file and line.
- Check that each criterion of the spec has exactly one scenario.
- Propose a fix for each failure. Do not change the files until the user confirms.
