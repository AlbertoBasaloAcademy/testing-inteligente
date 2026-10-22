---
name: implement-e2e-features
description: Write and change Playwright e2e tests in e2e/. Use it when you generate, add, fix or change an e2e test or a spec file in e2e/tests, also when the user does not name this skill.
argument-hint: "<path of the spec or of the test>"
---

# Implement e2e tests

Write and change the Playwright e2e tests in `e2e/tests/`.

## Locators

- Find an element by its role and accessible name: `getByRole('button', { name: 'Register' })`.
- If an element has no role, find it by its visible label or text: `getByLabel`, `getByText`.
- Use `getByTestId` only if the UI already has that test id. Do not make up a test id.

## Assertions

- Check the observable result of the requirement with `expect`.
- Use an assertion that retries: `toBeVisible`, `toHaveText` or another web-first assertion.
- Do not use the URL as a replacement for the observable result.
- Do not use a fixed wait (`waitForTimeout`) as a replacement for the observable result.

## Async

- Put `await` before each action: `await page.getByRole('button', { name: 'Save' }).click()`.
- Put `await` before each assertion: `await expect(page.getByText('Saved')).toBeVisible()`.
