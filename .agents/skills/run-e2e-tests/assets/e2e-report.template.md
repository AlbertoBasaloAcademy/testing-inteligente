Date: {{ISO_8601_DATE_TIME_WITH_OFFSET}}
Command: `{{COMMAND}}` (from `e2e/`)
Result: {{OUTCOME_AND_COUNTS}}

<!-- For a complete pass, remove this comment and all content below it. -->
<!-- For other outcomes, keep applicable sections only. -->
<!-- Repeat the test block for each failed test. -->
<!-- Repeat attempt details when a test has multiple failed attempts. -->

## Failures

### {{TEST_ID}}

Tags: {{ALL_TAGS}}
Source: {{FILE}}:{{LINE}}
Outcome: {{TEST_OUTCOME}}
Attempt: {{ATTEMPT_NUMBER}}

Error:

```text
{{ERROR_WITHOUT_ANSI_CODES}}
```

Page excerpt:

```yaml
{{MAIN_NODE_ONLY_MAXIMUM_40_LINES}}
```

{{TRUNCATION_OR_UNAVAILABLE_NOTE_IF_NEEDED}}

Evidence:

- [Error context]({{RELATIVE_CONTEXT_PATH}})
- [Screenshot]({{RELATIVE_SCREENSHOT_PATH}})
- Trace source: `{{TRACE_SOURCE_PATH}}`
- Video source: `{{VIDEO_SOURCE_PATH}}`

## Regressions

{{FAILED_TEST_BLOCKS_FOR_OTHER_SPECS}}

## Run errors

```text
{{OBSERVED_RUN_ERRORS_WITHOUT_ANSI_CODES}}
```

## Observed clues

{{OBSERVED_FACTS_WITH_TEST_IDS_OR_SOURCE_PATHS}}
