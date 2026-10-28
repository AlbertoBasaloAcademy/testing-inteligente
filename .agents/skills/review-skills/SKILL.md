---
name: review-skills
description: Reviews the skills in .agents/skills/ against the skill guide. Shows a report of the problems, then rewrites the skills after the user approves. Use it when a skill grows, after you change a skill, or when the user invokes /review-skills.
---

# Review the skills

Make each skill obey the [skill guide](references/skill-guide.md). Keep the behavior of each skill.

## Input

1. Read the [skill guide](references/skill-guide.md) and the [skill template](assets/skill.template.md).
2. Read `AGENTS.md`.
3. Read each `SKILL.md` in `.agents/skills/` and the files that it links to.
4. If the user names some skills, review only those skills.

## Steps

1. For each skill, count the lines of `SKILL.md`, the rules in each section and the words of `description`.
2. Compare each skill with each rule of the guide: outline (O), limits (L), do (D) and do not (N).
3. Find the rules that two or more skills repeat. Find the rules that repeat `AGENTS.md`.
4. Show the report. Then stop and ask the user to approve the fixes.
5. Rewrite the approved skills with the outline of the template.
6. Move the content that does not fit the limits to `references/` or `assets/`.
7. Put each shared rule in one file. Use the `references/` of the skill that writes the result. The other skills link to that file.
8. Review the rewritten skills again with steps 1 to 3.
9. Compare each rule before and after the change. Each old rule is moved, kept or removed with a guide code. A new rule is an error: remove it.

## Rules

- Keep the behavior. Do not add a rule, and do not change the meaning of a rule.
- You can remove a rule only for a guide code (D1, N1, N2, N4). Write each removed rule in the report.
- Keep the `name` of each skill. Keep the situations of `description` that start the skill.
- Keep the templates in `assets/` and the links to them.
- Change only the files in `.agents/skills/`. Do not change code, tests or specs.
- If the meaning of a rule is not clear, ask the user.

## Output

1. The report. One row for each problem:

   | Skill | File:line | Code | Problem | Fix |
   | --- | --- | --- | --- | --- |
   | implement-e2e-features | SKILL.md:1 | L1 | 108 lines | Move the rules to `references/` |

2. After the fixes, a table with the lines of each `SKILL.md`, before and after.
3. The diff of each changed file.
4. The rule comparison. One row for each old rule:

   | Skill | Old rule | Status | New place or code |
   | --- | --- | --- | --- |
   | implement-e2e-features | Use `getByRole` first | moved | `references/e2e-principles.md` E1.1 |
