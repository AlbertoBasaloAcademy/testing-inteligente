# Steps of a journey

Read this file only when the code starts with `J`.

A journey is a complete goal of one user. It crosses several specs. It does not add rules. Each step is an action in the UI and points to a criterion that exists.

## Steps

1. Get the actor and the goal.
   If the user gives them, do not ask again.
   If an item is missing, ask one closed question. Propose your answer in the question.
2. Find the specs that the journey crosses.
   Read the folders `specs/S*`.
   Keep each spec that the actor uses to reach the goal, in the order of the steps.
3. Write the code of the criterion on each step: `# S0002-R1`.
   The code is the id of the spec and the code of the criterion.
4. If a step has no criterion, stop and report the gap.
   Do not invent the criterion.
   Do not write the feature.
   Propose a new spec with [spec-builder](../../spec-builder/SKILL.md).
5. Write one `.feature` file with `Feature: [J0001] ...`.
   Write one scenario, or a few scenarios.
   Do not write one scenario for each criterion.
   Use the template [journey.template.feature](../assets/journey.template.feature).
   Keep the first line and the tags of the template.
   Put the file in the journey folder (E1.2).
