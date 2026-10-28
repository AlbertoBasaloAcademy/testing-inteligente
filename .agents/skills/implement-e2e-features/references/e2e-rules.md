# E2E rules

The e2e tests obey these rules. Each rule has a code. The skills `define-e2e-features` and `implement-e2e-features` link to these rules.

## E1 Files and codes

- **E1.1** Each spec has a folder `specs/<id>-<slug>/`. The spec is in `specs/<id>-<slug>/spec.md`.
- **E1.2** Each user story has one `.feature` file in the folder of the spec: `specs/<id>-<slug>/<story-code>-<story-slug>.feature`. For example, `US1-<slug>.feature`.
- **E1.3** Write one test file for each `.feature` file. Give it the same name with `.test.ts`: `US1-<slug>.test.ts`.
- **E1.4** Do not use `.spec.ts`. The word "spec" is for the specification.
- **E1.5** Use only the codes of the spec and of the `.feature` files. Do not make new codes.

## E2 Select the elements

- **E2.1** Use the role and the accessible name of the element first: `page.getByRole('button', { name: 'Save' })`.
- **E2.2** If the element has no role, use its visible label: `getByLabel`.
- **E2.3** If the element has no label, use its visible text: `getByText`.
- **E2.4** Use `getByTestId` only if that test id is in the UI already. Do not add or invent a test id.

## E3 Check the result

- **E3.1** Check the observable result of the requirement with `expect`.
- **E3.2** Use an assertion that retries: `toBeVisible`, `toHaveText`, `toContainText`, `toHaveCount`, `toHaveValue` or a similar assertion.
- **E3.3** Do not replace the observable result with a check of the URL.
- **E3.4** Do not replace the observable result with a fixed wait (`page.waitForTimeout`).

## E4 Use await

- **E4.1** Put `await` before each action: `await page.getByRole('button', { name: 'Save' }).click()`.
- **E4.2** Put `await` before each check: `await expect(page.getByText('Saved')).toBeVisible()`.

## E5 Organize the tests

- **E5.1** Write one `test.describe` for each story. Start its title with the story code: `[US1] ...`.
- **E5.2** Give the `test.describe` two tags: `@<id>` of the spec and `@<id>-<story-code>`. For example: `['@S0003', '@S0003-US1']`.
- **E5.3** Write one `test` for each scenario. Put it directly in the `test.describe` of its story. Do not put a `test.describe` in a `test.describe`.
- **E5.4** Start the title of the `test` with the criterion code: `[R1] ...`. Give it one tag: `@<id>-<criterion-code>`. For example: `@S0003-R1`.
- **E5.5** For a `Scenario Outline`, write one `test` for each row of `Examples`. Give each test the same code and the same tag. Give each test a unique title.

```ts
test.describe('[US1] Schedule a launch', { tag: ['@S0003', '@S0003-US1'] }, () => {
  test('[R1] Schedule a valid launch', { tag: '@S0003-R1' }, async ({ page }) => {
    // ...
  });
});
```

## E6 Use Page Objects

- **E6.1** Before you make a new class, find a Page Object in `e2e/pages/` that you can use again.
- **E6.2** Put each Page Object class in `e2e/pages/<page-name>.page.ts`. The constructor receives `Page`. The class contains the navigation, the locators and the actions of the page.
- **E6.3** Give each method a name that tells a user action, for example `scheduleLaunch`. The method receives the data of the case as parameters.
- **E6.4** Do not import the seed data or the data of the case in the Page Object.
- **E6.5** Make locators public to check the visible results.
- **E6.6** Keep these items in the test: the selection of the data of the case, the assertions of the requirement and the expected results. The test gives the data to the Page Object. The test can import the data and the expected results from `e2e/test-data/`.
- **E6.7** If a test checks an HTTP response, the method that does the action returns that response. Start the wait for the response before the action.
- **E6.8** Use the same operation to prepare a case and to do the action that the test checks, when possible.
- **E6.9** Do not write again in the test an action or a locator that a Page Object has already.
- **E6.10** Obey the rules E2, E4 and E5 in the code of the Page Objects too, when applicable.

```ts
const launches = new LaunchesPage(page);
const response = await launches.scheduleLaunch({ rocketName, date, price });
expect(response.status()).toBe(201);
await expect(launches.launchOn(date)).toBeVisible();
```

## E7 Use the test data

- **E7.1** Before you write new data, find the inputs, the expected results and the generators in `e2e/test-data/` that you can use again.
- **E7.2** Put the data of each spec in `e2e/test-data/<resource>.ts`. Extract a value only if it makes the test clearer or if more than one test uses it.
- **E7.3** For cases with inputs and expected results, use an array of objects. Write one object for each case.
- **E7.4** For data that must be unique, use a function that returns a new object for each call.
- **E7.5** Get the expected results from the requirement. Do not get them from the implementation or from its responses.
- **E7.6** Keep each generated value in a variable. Use the same variable for the action and for the check.
- **E7.7** A data module does not do actions and does not create records.
- **E7.8** Keep the seed (`e2e/core/seed-data.ts`) and the current preparation. Do not add dependencies or fixtures.

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
