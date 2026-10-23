---
name: implement-e2e-features
description: Writes or changes the Playwright e2e tests in e2e/. Selects elements by role, accessible name or visible label, and checks the observable result of each requirement with retrying assertions. Use it each time you generate, write, change or fix an e2e test, or when the user invokes /implement-e2e-features.
---

# Implement the e2e tests

Write or change Playwright e2e tests in `e2e/tests/`.

## Organize the files

1. Each spec has a folder `specs/<id>-<slug>/`. Make the same folder in `e2e/tests/`: `e2e/tests/<id>-<slug>/`.
2. The spec is in `specs/<id>-<slug>/spec.md`.
3. Each user story has one `.feature` file with the story code and the story slug: `US1-<slug>.feature`.
4. Write one test file for each `.feature` file. Give it the same name with `.test.ts`: `US1-<slug>.test.ts`.
5. Do not use `.spec.ts`. The word "spec" is for the specification.

## Organize the tests

1. Write one `test.describe` for each story.
   - Start its title with the story code: `[US1] ...`.
   - Give it two tags: `@<id>` of the spec and `@<id>-<story-code>`. For example: `['@S0003', '@S0003-US1']`.
2. Write one `test` for each scenario. Put it directly in the `test.describe` of its story. Do not put a `test.describe` in a `test.describe`.
   - Start its title with the criterion code: `[R1] ...`.
   - Give it one tag: `@<id>-<criterion-code>`. For example: `@S0003-R1`.
3. For a `Scenario Outline`, write one `test` for each row of `Examples`. Give each test the same code and the same tag. Give each test a unique title.
4. Use the codes of the spec and of the `.feature` files. Do not make new codes.

```ts
test.describe('[US1] Schedule a launch', { tag: ['@S0003', '@S0003-US1'] }, () => {
  test('[R1] Schedule a valid launch', { tag: '@S0003-R1' }, async ({ page }) => {
    // ...
  });
});
```

## Select the elements

1. Use the role and the accessible name of the element first: `page.getByRole('button', { name: 'Save' })`.
2. If the element has no role, use its visible label: `getByLabel`.
3. If the element has no label, use its visible text: `getByText`.
4. Use `getByTestId` only if that test id is in the UI already. Do not add or invent a test id.

## Check the result

1. Check the observable result of the requirement with `expect`.
2. Use an assertion that retries: `toBeVisible`, `toHaveText`, `toContainText`, `toHaveCount`, `toHaveValue` or a similar assertion.
3. Do not replace the observable result with a check of the URL.
4. Do not replace the observable result with a fixed wait (`page.waitForTimeout`).

## Use await

- Put `await` before each action: `await page.getByRole('button', { name: 'Save' }).click()`.
- Put `await` before each check: `await expect(page.getByText('Saved')).toBeVisible()`.
