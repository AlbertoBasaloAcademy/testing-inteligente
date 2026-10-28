# Skill guide

Each skill in `.agents/skills/` obeys this guide. Each rule has a code. A review report cites the code.

## Folder

```
.agents/skills/<name>/
├── SKILL.md       # the instructions; always
├── references/    # detailed rules and examples; optional
└── assets/        # templates; optional
```

## Outline (O)

`SKILL.md` has these sections, in this order:

- **O1 Front matter**: `name` and `description`.
  - `name`: kebab-case, verb and object. For example: `define-spec`, `review-skills`.
  - `description`: what the skill does and when to use it. End with `or when the user invokes /<name>`.
- **O2 Purpose**: one or two sentences. The title of the file tells the task.
- **O3 Input**: what the skill reads and what it asks the user.
- **O4 Steps**: a numbered list.
- **O5 Rules**: what to do and what not to do. Rules can link to `references/`.
- **O6 Output**: what the skill shows, what it saves and how it verifies the result.

## Limits (L)

A limit is a maximum, not a target. Move the content that does not fit to `references/` or `assets/`.

| Code | Item | Maximum |
| --- | --- | --- |
| L1 | Lines in `SKILL.md` | 100 |
| L2 | Rules in a section | 10 |
| L3 | Lines in a code example | 10 |
| L4 | Words in `description` | 50 |

## Do (D)

- **D1** One task in each skill. A skill that writes does not also review.
- **D2** Write in English and in ASD-STE100 style: short sentences, active voice, one instruction in each sentence.
- **D3** Write rules that you can verify. Bad: "Write good tests". Good: "Put `await` before each action".
- **D4** Put the basic rules first and the advanced rules after them.
- **D5** Write each rule in one place only. Other skills link to that place.

## Do not (N)

- **N1** Do not repeat `AGENTS.md`. The agent reads it already.
- **N2** Do not write the history of the skill. Bad: "In L03 we added Page Objects".
- **N3** Do not write a rule that depends on "the other sections". Write the rule, or link to it.
- **N4** Do not add a rule that the agent obeys without instructions.
