---
name: implement-e2e-features
description: Writes or changes the Playwright e2e tests in e2e/. Uses Page Objects in e2e/pages/ for the navigation, the locators and the actions of each page. Selects elements by role, accessible name or visible label, and checks the observable result of each requirement with retrying assertions. Use it each time you generate, write, change or fix an e2e test, or when the user invokes /implement-e2e-features.
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

## Use Page Objects

1. Before you make a new class, find a Page Object in `e2e/pages/` that you can use again.
2. Put each Page Object class in `e2e/pages/<page-name>.page.ts`.
3. The constructor receives `Page`. The class contains the navigation, the locators and the actions of the page.
4. Give each method a name that tells a user action, for example `scheduleLaunch`.
   - The method receives the data of the case as parameters.
   - Do not import the seed data in the Page Object.
5. Make locators public to check the visible results.
6. Keep these items in the test: the selection of the data of the case, the assertions of the requirement and the expected results. The test can import the data and the expected results from `e2e/test-data/`.
7. If a test checks an HTTP response, the method that does the action returns that response. Start the wait for the response before the action.
8. Use the same operation to prepare a case and to do the action that the test checks, when possible.
9. Do not write again in the test an action or a locator that a Page Object has already.
10. The rules in the other sections (locators, checks, `await`, organization and tags) also apply to the code of the Page Objects, when applicable.

```ts
const launches = new LaunchesPage(page);
const response = await launches.scheduleLaunch({ rocketName, date, price });
expect(response.status()).toBe(201);
await expect(launches.launchOn(date)).toBeVisible();
```

## Use the test data

1. Before you write new data, find the inputs, the expected results and the generators in `e2e/test-data/` that you can use again.
2. Put the data of each spec in `e2e/test-data/<resource>.ts`. Extract a value only if it makes the test clearer or if more than one test uses it.
3. For cases with inputs and expected results, use an array of objects. Write one object for each case.
4. For data that must be unique, use a function that returns a new object for each call.
5. Get the expected results from the requirement. Do not get them from the implementation or from its responses.
6. Keep each generated value in a variable. Use the same variable for the action and for the check.
7. The test selects the data and gives it to the Page Object. The test keeps the assertions.
8. Do not import the data of the case in the Page Object.
9. A data module does not do actions and does not create records.
10. Keep the seed (`e2e/core/seed-data.ts`) and the current preparation. Do not add dependencies or fixtures.

```ts
// R5: cases with inputs and expected results.
export const rejectedPrices = [
  { price: "0", expectedStatus: 400, expectedField: "pricePerPassenger" },
  { price: "-10", expectedStatus: 400, expectedField: "pricePerPassenger" },
];

// R1: a new object with a unique date for each call.
export function createLaunchData(): LaunchForm {
  return { rocketName: seedRocket.name, date: uniqueFutureDate(), price: "100" };
}
```

```ts
const launch = createLaunchData();
await launches.scheduleLaunch(launch);
await expect(launches.launchOn(launch.date)).toBeVisible();
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
