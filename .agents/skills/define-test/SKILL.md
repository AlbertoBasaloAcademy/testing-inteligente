---
name: define-test
description: Writes the Gherkin .feature files of a spec or a journey. A spec has one .feature for each user story and one scenario for each EARS criterion. A journey has one .feature. Uses the templates in assets/. Use it when you write .feature files, or when the user invokes /define-test.
---

# Define the features

Write Gherkin `.feature` files for one spec or one journey.

## Input

1. Get the code from the user. The code decides the mode. `S` is a spec. `J` is a journey.
2. If the user gives the code, do not ask for it again.
3. For a spec, read `specs/<id>-<slug>/spec.md`. Find the user stories (`US1`, `US2`, ...) and the EARS criteria (`R1`, `R2`, ...). Find the story of each criterion. The spec writes it after the criterion code: `R3 (US2)`. If a criterion does not have a story or a code, ask the user. Propose your answer in the question.
4. For a journey, read [journey-steps.md](references/journey-steps.md). Do not read it for a spec.

## Steps

1. For a journey, follow [journey-steps.md](references/journey-steps.md). Do not follow steps 2 to 7.
2. Write one `.feature` file for each user story. Use [spec.user-story.template.feature](assets/spec.user-story.template.feature).
3. On the first line, write a comment with the spec path: `# Spec: specs/<id>-<slug>/spec.md`.
4. **Feature**: write the title of the story. Start it with the story code: `Feature: [US1] ...`. Write the `As a`, `I want to` and `So that` lines from the story.
5. **Background**: write the preconditions that all the scenarios of the story share.
6. **Scenario**: write one scenario for each EARS criterion of the story. A scenario is for one criterion only.
   - Start the scenario name with the criterion code: `Scenario: [R1] Add a valid rocket`.
   - Write the trigger of the criterion in `When`.
   - Write the response of the criterion in `Then`.
   - Use `Scenario Outline` and `Examples` only when the criterion has more than one input.
7. Keep the scenarios in the order of the criteria.

## Rules

- Use Gherkin keywords in English: `Feature`, `Background`, `Scenario`, `Scenario Outline`, `Given`, `When`, `Then`, `And`, `Examples`.
- Use only the stories and the rules that exist. Do not invent rules.
- Obey the file and code rules E1 in [e2e-rules.md](../implement-test/references/e2e-rules.md).
- Do not write tests. Do not write application code.

## Output

1. Show the features to the user.
2. Wait for the user to confirm.
3. Save each feature in its folder (E1) only after the user confirms.
