---
name: define-spec
description: Write or review a feature spec with the spec template of this skill (assets/spec.template.md). Use it when you write a new spec in specs/ or when you review a spec that uses this template.
argument-hint: "<feature description> [id] [slug]"
---

# Define a spec

Write a spec with the template [assets/spec.template.md](assets/spec.template.md).

## Steps

1. Read `assets/spec.template.md`, `AGENTS.md` and the specs that the request names or attaches.
2. Read the related code in `projects/back` and `projects/front` to know the existing data.
3. If the request gives the feature, do not ask about the feature.
4. If a necessary data item is missing (for example the id or the slug), ask one closed question. Give your proposed answer in the question.
5. Write the spec. Obey the rules below.
6. Show the full spec to the user.
7. Save the spec only when the user confirms. Save it in `specs/<id>-<slug>.spec.md`.

## Rules

### Front matter

- Write `id`, `name` and `slug`. The `id` has the format `S0000`.

### Problem

- Write the problem in 1 or 2 sentences.
- Write 1 to 3 user stories. Give each story a number: `US1`, `US2`, `US3`.
- Use the format: `US1: As a <user>, I want to **<action>** so that I can <goal>.`
- Write fewer than 8 business rules. Use RuleSpeak: `A <term> must <condition>.` or `A <term> must not <condition>.`
- Write the out-of-scope items as a short list.

### Solution

- Write 3 sections: `Back`, `Front` and `E2E`.
- Write fewer than 10 steps in each section.
- In `Back`, obey the REST API rules of `AGENTS.md`: paths, status codes and the error body.
- In `Front`, name the pages, the fields and the buttons with their visible text.
- In `E2E`, name the test file and the seed data that the tests need.
- Use only the data and the entities that exist or that the spec defines. Do not invent other data.

### Verification

- Write 1 to 9 acceptance criteria in EARS format:
  - `WHEN <trigger>, THE system SHALL <response>.`
  - `IF <unwanted condition>, THEN THE system SHALL <response>.`
  - `WHILE <state>, THE system SHALL <response>.`
- Give each criterion a code that is unique in the spec: `R1`, `R2`, …
- Each criterion belongs to one user story only. Write the story after the code: `R3 (US2)`.
- If a criterion applies to 2 stories, write 2 criteria.
- Each user story has 1 or more criteria.
- Write the criteria in the order of the stories. The criteria of `US1` start at `R1`.
- Use the format: `- [ ] R1 (US1) WHEN …, THE system SHALL ….`
- Each criterion must be verifiable by a test.

### Size and style

- The spec has fewer than 100 lines.
- Write in English, in the style of ASD-STE100: short sentences, active voice, one instruction in each sentence.

## Review a spec

- Check each rule above. List each failure with its line.
- Propose a fix for each failure. Do not change the file until the user confirms.
