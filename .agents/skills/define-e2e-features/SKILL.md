---
name: define-e2e-features
description: Writes or reviews the Gherkin .feature files of a spec that exists in specs/. One .feature for each user story, one scenario for each EARS criterion of that story. Uses the templates in assets/. Use it when you write or review the .feature files of a spec, or when the user invokes /define-e2e-features.
---

# Define the features of a spec

Change the user stories of one spec into Gherkin `.feature` files.
Use the template [spec.user-story.template.feature](assets/spec.user-story.template.feature) .

## Collect the input

1. Read `AGENTS.md` and the spec in `specs/`.
2. If the user gives the spec, do not ask for it again.
3. Find the user stories (`US1`, `US2`, ...) and the EARS criteria (`R1`, `R2`, ...) in the spec.
4. Find the story of each criterion. The spec writes it after the criterion code: `R3 (US2)`.
5. If a criterion does not have a story, ask one closed question (yes/no or pick-one).
6. If a criterion does not have a code, ask one closed question (yes/no or pick-one).
7. Ask one question at a time. Propose your answer in the question.

## Write the features

1. Write one `.feature` file for each user story.
2. On the first line, write a comment with the spec path: `# Spec: specs/<id>-<slug>/spec.md`.
3. **Feature**: write the title of the story. Start it with the story code: `Feature: [US1] ...`. Write the `As a`, `I want to` and `So that` lines from the story.
4. **Background**: write the preconditions that all the scenarios of the story share.
5. **Scenario**: write one scenario for each EARS criterion of the story.
   - Start the scenario name with the criterion code: `Scenario: [R1] Add a valid rocket`.
   - Write the trigger of the criterion in `When`.
   - Write the response of the criterion in `Then`.
   - Use `Scenario Outline` and `Examples` only when the criterion has more than one input.
6. Keep the scenarios in the order of the criteria.

## Rules

- Use only the stories, the rules and the codes of the spec. Do not invent rules or codes.
- A scenario is for one criterion only.
- Each criterion of the story has one scenario.
- Do not write tests. Do not write application code.

## Style

- Write the Gherkin keywords in English: `Feature`, `Background`, `Scenario`, `Scenario Outline`, `Examples`, `Given`, `When`, `Then`, `And`.
- Write the steps in English and in ASD-STE100 style: short sentences, active voice, one action in each step.

## Review the features

1. Compare each `.feature` with the spec, the templates and the rules above.
2. Make sure that each criterion of the spec has one scenario in the `.feature` of its story.
3. List each problem with its file and scenario.
4. Propose a fix for each problem.

## Save

- Show the features to the user.
- Save each feature in the folder of the spec: `specs/<id>-<slug>/<story-code>-<story-slug>.feature`. For example, `US1-<slug>.feature`.
- Save only after the user confirms.
