---
name: define-e2e-features
description: Writes the Gherkin .feature files of a spec that exists in specs/. One .feature for each user story, one scenario for each EARS criterion of that story. Uses the templates in assets/. Use it when you write the .feature files of a spec, or when the user invokes /define-e2e-features.
---

# Define the features of a spec

Change the user stories of one spec into Gherkin `.feature` files.
Use the template [spec.user-story.template.feature](assets/spec.user-story.template.feature).

## Input

1. Read the spec in `specs/`.
2. If the user gives the spec, do not ask for it again.
3. Find the user stories (`US1`, `US2`, ...) and the EARS criteria (`R1`, `R2`, ...) in the spec.
4. Find the story of each criterion. The spec writes it after the criterion code: `R3 (US2)`.
5. If a criterion does not have a story or a code, ask the user. Propose your answer in the question.

## Steps

1. Write one `.feature` file for each user story.
2. On the first line, write a comment with the spec path: `# Spec: specs/<id>-<slug>/spec.md`.
3. **Feature**: write the title of the story. Start it with the story code: `Feature: [US1] ...`. Write the `As a`, `I want to` and `So that` lines from the story.
4. **Background**: write the preconditions that all the scenarios of the story share.
5. **Scenario**: write one scenario for each EARS criterion of the story. A scenario is for one criterion only.
   - Start the scenario name with the criterion code: `Scenario: [R1] Add a valid rocket`.
   - Write the trigger of the criterion in `When`.
   - Write the response of the criterion in `Then`.
   - Use `Scenario Outline` and `Examples` only when the criterion has more than one input.
6. Keep the scenarios in the order of the criteria.

## Rules

- Use only the stories and the rules of the spec. Do not invent rules.
- Obey the file and code rules E1 in [e2e-rules.md](../implement-e2e-features/references/e2e-rules.md).
- Do not write tests. Do not write application code.

## Output

1. Show the features to the user.
2. Save each feature in the folder of the spec (E1.2) only after the user confirms.
