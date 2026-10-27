import { expect, test } from "@playwright/test";
import { addRocket, bearer, logIn, sendRocket } from "../../core/rockets";
import { createFalconData, invalidRockets, tokenExamples } from "../../test-data/rockets";

// Spec: specs/S0002-rocket-fleet/US1-add-rocket.feature
test.describe("[US1] Add a rocket", { tag: ["@S0002", "@S0002-US1"] }, () => {
  let token: string;

  test.beforeEach(async ({ request }) => {
    // GIVEN a registered user exists (seed user) and the user is logged in
    token = await logIn(request);
  });

  test("[R1] Add a valid rocket", { tag: "@S0002-R1" }, async ({ request }) => {
    // GIVEN no rocket has the name "Falcon"
    const rocket = createFalconData();

    // WHEN the user sends the rocket
    const response = await sendRocket(request, rocket, bearer(token));

    // THEN the system creates the rocket and returns 201
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({ id: expect.any(String), ...rocket });
  });

  for (const { token: example, headers, expectedStatus } of tokenExamples) {
    test(
      `[R2] Reject a request without a valid token (${example})`,
      { tag: "@S0002-R2" },
      async ({ request }) => {
        // GIVEN the user has <token>
        const rocket = createFalconData();

        // WHEN the user sends the rocket
        const response = await sendRocket(request, rocket, headers);

        // THEN the system returns 401
        expect(response.status()).toBe(expectedStatus);
      },
    );
  }

  for (const [index, example] of invalidRockets.entries()) {
    const { criterion, rocket, expectedStatus, expectedField } = example;
    test(
      `[R3, R5, R6] Reject a rocket with a field that is not valid (${criterion} #${index + 1} ${expectedField})`,
      { tag: `@S0002-${criterion}` },
      async ({ request }) => {
        // GIVEN the user is logged in (beforeEach)
        // WHEN the user sends the rocket with a field that is not valid
        const response = await sendRocket(request, rocket, bearer(token));

        // THEN the system returns 400 and the error has the field
        expect(response.status()).toBe(expectedStatus);
        const body = (await response.json()) as { fields: Record<string, string> };
        expect(body.fields).toHaveProperty(expectedField);
      },
    );
  }

  test(
    "[R4] Reject a rocket with a name that exists",
    { tag: "@S0002-R4" },
    async ({ request }) => {
      // GIVEN a rocket with the name "Falcon" exists
      const rocket = createFalconData();
      await addRocket(request, rocket, token);

      // WHEN the user sends the rocket with the same name
      const response = await sendRocket(request, rocket, bearer(token));

      // THEN the system returns 409
      expect(response.status()).toBe(409);
    },
  );
});
