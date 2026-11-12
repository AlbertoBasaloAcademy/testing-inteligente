import { expect, test, type APIRequestContext, type APIResponse } from "@playwright/test";
import {
  findSeedRocket,
  logInOperator,
  registerAccount,
  registerAndLogIn,
  scheduleLaunch,
} from "../../core/accounts";
import { getBookings, sendBooking } from "../../core/bookings";
import { backUrl } from "../../core/env";
import { uniqueFutureDate } from "../../core/launches";
import { bearer, uniqueName } from "../../core/rockets";
import { createPassenger } from "../../test-data/bookings";
import {
  createPassengerAccount,
  forbiddenPassengerActions,
  passengerResources,
  unauthenticatedRequests,
} from "../../test-data/roles";

type ChangeSetup = {
  rocketName: string;
  rocketId: string;
  launchId: string;
  rejectedDate: string;
  passenger: ReturnType<typeof createPassenger>;
};
type Ids = { rocketId: string; launchId: string };

const passengerFields = ['"nationality"', '"identityDocument"', '"phone"', '"bookings"'];

function expectNoPassengerData(body: unknown): void {
  const text = JSON.stringify(body);
  for (const field of passengerFields) expect(text).not.toContain(field);
}

async function prepareChange(request: APIRequestContext): Promise<{
  operatorToken: string;
  passengerToken: string;
  setup: ChangeSetup;
}> {
  const operatorToken = await logInOperator(request);
  const rocket = await findSeedRocket(request, operatorToken);
  const launch = await scheduleLaunch(request, operatorToken);
  const passengerToken = await registerAndLogIn(request, createPassengerAccount());
  return {
    operatorToken,
    passengerToken,
    setup: {
      rocketName: uniqueName("Role Rocket"),
      rocketId: rocket.id,
      launchId: launch.id,
      rejectedDate: uniqueFutureDate(),
      passenger: createPassenger(),
    },
  };
}

function sendForbidden(
  request: APIRequestContext,
  token: string,
  action: (typeof forbiddenPassengerActions)[number],
  setup: ChangeSetup,
): Promise<APIResponse> {
  const headers = bearer(token);
  if (action === "creates a rocket") {
    return request.post(`${backUrl}/api/rockets`, {
      headers,
      data: { name: setup.rocketName, capacity: 5, range: "orbital" },
    });
  }
  if (action === "schedules a launch") {
    return request.post(`${backUrl}/api/launches`, {
      headers,
      data: { rocketId: setup.rocketId, date: setup.rejectedDate, pricePerPassenger: 100 },
    });
  }
  if (action === "changes a launch status") {
    return request.patch(`${backUrl}/api/launches/${setup.launchId}`, {
      headers,
      data: { status: "confirmed" },
    });
  }
  return sendBooking(request, setup.launchId, setup.passenger, token);
}

async function expectUnchanged(
  request: APIRequestContext,
  token: string,
  action: (typeof forbiddenPassengerActions)[number],
  setup: ChangeSetup,
): Promise<void> {
  if (action === "creates a rocket") {
    const response = await request.get(`${backUrl}/api/rockets`, { headers: bearer(token) });
    expect(response.status()).toBe(200);
    const rockets = (await response.json()) as { name: string }[];
    expect(rockets.some((rocket) => rocket.name === setup.rocketName)).toBe(false);
    return;
  }
  if (action === "schedules a launch" || action === "changes a launch status") {
    const response = await request.get(`${backUrl}/api/launches`, { headers: bearer(token) });
    expect(response.status()).toBe(200);
    const launches = (await response.json()) as { id: string; date: string; status: string }[];
    const saved = launches.find((launch) => launch.id === setup.launchId);
    expect(saved?.status).toBe("planned");
    expect(launches.some((launch) => launch.date === setup.rejectedDate)).toBe(false);
    return;
  }
  const listed = await getBookings(request, setup.launchId, token);
  expect(listed.status()).toBe(200);
  expect(((await listed.json()) as { bookings: unknown[] }).bookings).toEqual([]);
}

function readResource(
  request: APIRequestContext,
  token: string,
  resource: string,
  ids: Ids,
): Promise<APIResponse> {
  const headers = bearer(token);
  if (resource === "one rocket")
    return request.get(`${backUrl}/api/rockets/${ids.rocketId}`, { headers });
  if (resource === "the launches") return request.get(`${backUrl}/api/launches`, { headers });
  if (resource === "the free seats of a launch") {
    return request.get(`${backUrl}/api/launches/${ids.launchId}/availability`, { headers });
  }
  return request.get(`${backUrl}/api/rockets`, { headers });
}

function expectResource(resource: string, body: unknown, ids: Ids): void {
  expectNoPassengerData(body);
  if (resource === "one rocket") expect(body).toMatchObject({ id: ids.rocketId });
  if (resource === "the free seats of a launch") {
    expect(body).toEqual({ capacity: expect.any(Number), availableSeats: expect.any(Number) });
  }
  if (resource === "the rockets" || resource === "the launches")
    expect(Array.isArray(body)).toBe(true);
}

// Spec: specs/S0006-user-roles/US1-register-as-passenger.feature
test.describe("[US1] Register as a passenger", { tag: ["@S0006", "@S0006-US1"] }, () => {
  test("[R1] Register a visitor as a passenger", { tag: "@S0006-R1" }, async ({ request }) => {
    const account = createPassengerAccount();

    const response = await registerAccount(request, account);

    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({
      name: account.name,
      email: account.email,
      role: "passenger",
    });
  });

  for (const resource of passengerResources) {
    test(
      `[R2] Return rockets, launches and free seats to a passenger (${resource})`,
      { tag: "@S0006-R2" },
      async ({ request }) => {
        const operatorToken = await logInOperator(request);
        const launch = await scheduleLaunch(request, operatorToken);
        const token = await registerAndLogIn(request, createPassengerAccount());
        const ids = { rocketId: launch.rocketId, launchId: launch.id };

        const response = await readResource(request, token, resource, ids);

        expect(response.status()).toBe(200);
        expectResource(resource, await response.json(), ids);
      },
    );
  }

  for (const action of forbiddenPassengerActions) {
    test(
      `[R3] Reject a change by a passenger (${action})`,
      { tag: "@S0006-R3" },
      async ({ request }) => {
        const { operatorToken, passengerToken, setup } = await prepareChange(request);

        const response = await sendForbidden(request, passengerToken, action, setup);

        expect(response.status()).toBe(403);
        await expectUnchanged(request, operatorToken, action, setup);
      },
    );
  }

  test(
    "[R4] Reject a passenger request for the passengers of a launch",
    { tag: "@S0006-R4" },
    async ({ request }) => {
      const operatorToken = await logInOperator(request);
      const launch = await scheduleLaunch(request, operatorToken);
      const token = await registerAndLogIn(request, createPassengerAccount());

      const response = await getBookings(request, launch.id, token);

      expect(response.status()).toBe(403);
    },
  );

  for (const example of unauthenticatedRequests) {
    test(
      `[R5] Reject a request without a valid token (${example.resource}, ${example.token})`,
      { tag: "@S0006-R5" },
      async ({ request }) => {
        const response = await request.get(`${backUrl}${example.path}`, {
          headers: example.headers,
        });

        expect(response.status()).toBe(example.expectedStatus);
      },
    );
  }
});
