---
name: define-spec
description: Writes a feature spec with the template assets/spec.template.md (problem, user stories, RuleSpeak rules, out of scope, back/front/e2e solution, EARS verification). Use it when you write a spec in specs/, or when the user invokes /define-spec.
---

# Define a spec

Write one spec for one feature. Use the template [spec.template.md](assets/spec.template.md).

## Input

1. Read the specs in `specs/`.
2. If the user gives the feature, do not ask for it again.
3. If a data item is missing, ask the user. Propose your answer in the question.
4. Ask only when you cannot make a safe assumption.

## Steps

1. Set the front matter: `id` (next free `S0000` number), `name` and `slug`.
2. **Problem**: write the problem in one or two short sentences.
3. **User stories**: write 1 to 3 stories. Give each story a number: `US1`, `US2`, `US3`.
4. **Business rules**: write fewer than 8 rules. Use RuleSpeak (`A <term> must ...`).
5. **Out of scope**: write the items that the spec does not include.
6. **Solution**: write fewer than 10 steps for each part.
   - **Back**: resources, endpoints, status codes, checks and `logic` rules.
   - **Front**: pages, forms, fields, messages and navigation.
   - **E2E**: seed data, unique data and main flows.
7. **Verification**: write 1 to 9 EARS criteria.

## Rules

- Give each criterion a unique code in the spec: `R1`, `R2`, ...
- A criterion is for one story only. Write the story code after the criterion code: `R3 (US2)`.
- If a criterion is for two stories, write two criteria.
- Each story has one or more criteria.
- Number the criteria in the order of the stories. The criteria of `US1` start at `R1`.
- Use an EARS pattern:
  - Ubiquitous: `The system shall ...`
  - Event: `When <trigger>, the system shall ...`
  - State: `While <state>, the system shall ...`
  - Unwanted: `If <condition>, then the system shall ...`
  - Option: `Where <feature>, the system shall ...`
- Write each criterion as a checkbox: `- [ ] R1 (US1): When ..., the system shall ...`
- Keep the spec shorter than 100 lines.

## Output

1. Show the spec to the user.
2. Save it in `specs/<id>-<slug>/spec.md` only after the user confirms.
