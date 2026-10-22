---
name: implement-e2e-features
description: Writes or changes the Playwright e2e tests in e2e/. Selects elements by role, accessible name or visible label, and checks the observable result of each requirement with retrying assertions. Use it each time you generate, write, change or fix an e2e test or a Playwright spec, or when the user invokes /implement-e2e-features.
---

# Implement the e2e tests

Write or change Playwright e2e tests in `e2e/tests/`.

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
