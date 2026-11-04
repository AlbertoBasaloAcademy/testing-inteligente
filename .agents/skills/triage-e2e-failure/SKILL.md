---
name: triage-e2e-failure
description: Analyze all failures in an E2E report and prepare a correction spec. Use it when an E2E report has failures to investigate, or when the user invokes /triage-e2e-failure.
---

# Triage E2E failure

Find the causes of all failures in an E2E report. Prepare a correction spec for the agents that will fix them.

## Input

1. Get the spec code from the user, for example `S0042`.
2. Find `specs/<spec>-<slug>/e2e-report.md` and its `e2e-evidence/`.
3. If the spec code or a required input is missing, ask the user one closed question.

## Steps

1. Read the report and its evidence. Include all failures in `Regressions`.
2. If the report has no failures, say so in one line and stop.
3. For each failure, read the test and its Page Objects. Read the back and front code that takes part in the failed behavior.
4. Read the test's `.feature` and `spec.md`. Read the specs that define the rules used by the test.
5. Compare three hypotheses for each failure: test, code, and spec. For each hypothesis, find evidence for and against it. Give one check that can confirm or discard it.
6. Group failures that have the same cause. Record spec gaps separately from the origin.
7. Decide the origin, confidence, and correcting agent for each cause. If the evidence is not sufficient, state what is missing.
8. Verify every citation. Show the verdict and ask for approval. Stop until the user approves.
9. After approval, use [the template](assets/fix.spec.template.md) to replace `specs/<spec>-<slug>/fix.spec.md`.
10. Verify the correction spec against the approved verdict and the rules below.

## Rules

- Read each file with a separate command. Do not take line numbers from output that joins files.
- Each citation must give the file, line number, and line text in quotation marks. Before the verdict, check each line against the file. Correct or remove a citation that does not match.
- A spec gap is data that the test needs to prepare, navigate, or check the behavior, but its `.feature` does not give. Ask: can an agent that reads only this `.feature` write the test without an assumption? A gap remains a gap when `spec.md` or another spec gives the data.
- An assertion stricter than the criterion is not a gap. The `.feature` gives the data, but the test reads it incorrectly.
- For each cause, assign confidence as high, medium, or low. Name the correcting agent as `spec`, `código`, or `pruebas`.
- Do not guess when evidence is insufficient. Put what is missing in `Problem` as a note on its cause. Do not put it in `Solution`.
- In the correction spec, describe what each agent must change, not how to write the code. Use `None` for an agent with no work.
- Give every failure a verification criterion for a new run of the full suite. If its assertion is correct, state that it does not change. Make the last criterion require the full suite to pass.
- Do not copy evidence or discarded hypotheses into the correction spec.
- Do not change tests, code, or existing specs. Do not write the correction.

## Output

1. Show the three hypotheses for each failure in the chat, with evidence for and against each one and a check.
2. End the verdict with a table: cause, failures, origin, correcting agent, and gap. Include confidence with the origin.
3. Ask for approval. Do not write `fix.spec.md` before approval.
4. After approval, replace the previous `fix.spec.md`. Give relative links to the tests, specs, and evidence. Do not copy evidence files.
