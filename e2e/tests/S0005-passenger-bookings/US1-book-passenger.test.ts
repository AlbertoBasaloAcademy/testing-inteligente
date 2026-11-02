import { expect, test } from "@playwright/test";
import { getBookings, sendBooking } from "../../core/bookings";
import { sendStatus } from "../../core/launches";
import { logIn, logInPage } from "../../core/rockets";
import { LaunchesPage } from "../../pages/launches.page";
import { createPassenger, invalidPassengerInputs } from "../../test-data/bookings";
import { createLaunchData } from "../../test-data/launches";

type LaunchResult = { id: string };

async function scheduleLaunch(page: import("@playwright/test").Page): Promise<string> {
  const launches = new LaunchesPage(page);
  const response = await launches.scheduleLaunch(createLaunchData());
  expect(response.status()).toBe(201);
  return ((await response.json()) as LaunchResult).id;
}

async function changeStatus(
  request: import("@playwright/test").APIRequestContext,
  id: string,
  status: string,
  token: string,
): Promise<void> {
  expect((await sendStatus(request, id, { status }, token)).status()).toBe(200);
}

test.describe("[US1] Book a passenger on a launch", { tag: ["@S0005", "@S0005-US1"] }, () => {
  for (const status of ["planned", "confirmed"]) {
    test(
      `[R1] Book a passenger when the launch is ${status}`,
      { tag: "@S0005-R1" },
      async ({ page, request }) => {
        const token = await logIn(request);
        await logInPage(page);
        const launchId = await scheduleLaunch(page);
        if (status === "confirmed") await changeStatus(request, launchId, status, token);
        const passenger = createPassenger();

        const response = await sendBooking(request, launchId, passenger, token);
        expect(response.status()).toBe(201);
        const saved = (await getBookings(request, launchId, token)).json() as Promise<{
          bookings: Array<Record<keyof typeof passenger, string>>;
        }>;
        const bookings = (await saved).bookings;
        expect(bookings).toHaveLength(1);
        expect(bookings[0]).toMatchObject(passenger);
      },
    );
  }

  for (const tokenCase of ["no token", "an invalid token"]) {
    test(
      `[R2] Reject a booking with ${tokenCase}`,
      { tag: "@S0005-R2" },
      async ({ page, request }) => {
        const token = await logIn(request);
        await logInPage(page);
        const launchId = await scheduleLaunch(page);
        const passenger = createPassenger();
        const response = await sendBooking(
          request,
          launchId,
          passenger,
          tokenCase === "no token" ? undefined : "invalid-token",
        );

        expect(response.status()).toBe(401);
        const state = await (await getBookings(request, launchId, token)).json();
        expect(state.bookings).toEqual([]);
      },
    );
  }

  for (const { field, input } of invalidPassengerInputs) {
    test(`[R3] Reject ${input} for ${field}`, { tag: "@S0005-R3" }, async ({ page, request }) => {
      const token = await logIn(request);
      await logInPage(page);
      const launchId = await scheduleLaunch(page);
      const passenger: Record<string, unknown> = { ...createPassenger() };
      if (input === "missing") delete passenger[field];
      if (input === "empty") passenger[field] = "";
      if (input === "spaces") passenger[field] = "   ";
      if (input === "number") passenger[field] = 123;
      if (input === "invalid-email") passenger[field] = "invalid-email";

      const response = await sendBooking(request, launchId, passenger, token);
      expect(response.status()).toBe(400);
      const body = (await response.json()) as { error: string; fields: Record<string, string> };
      expect(body.error).toBeTruthy();
      expect(body.fields).toHaveProperty(field);
      expect((await (await getBookings(request, launchId, token)).json()).bookings).toHaveLength(0);
    });
  }

  test(
    "[R4] Reject a booking for a launch that does not exist",
    { tag: "@S0005-R4" },
    async ({ request }) => {
      const token = await logIn(request);
      const response = await sendBooking(
        request,
        `missing-${Date.now()}`,
        createPassenger(),
        token,
      );
      expect(response.status()).toBe(404);
    },
  );

  test(
    "[R5] Reject a duplicate document and its whitespace variant",
    { tag: "@S0005-R5" },
    async ({ page, request }) => {
      const token = await logIn(request);
      await logInPage(page);
      const launchId = await scheduleLaunch(page);
      const passenger = createPassenger();
      expect((await sendBooking(request, launchId, passenger, token)).status()).toBe(201);
      for (const identityDocument of [
        passenger.identityDocument,
        `  ${passenger.identityDocument}  `,
      ]) {
        const duplicate = { ...createPassenger(), identityDocument };
        expect((await sendBooking(request, launchId, duplicate, token)).status()).toBe(409);
      }
      const saved = (await getBookings(request, launchId, token)).json() as Promise<{
        bookings: Array<{ identityDocument: string }>;
      }>;
      expect(
        (await saved).bookings.filter(
          (item) => item.identityDocument === passenger.identityDocument,
        ),
      ).toHaveLength(1);
    },
  );

  test(
    "[R5] Allow only one of two concurrent bookings with the same document",
    { tag: "@S0005-R5" },
    async ({ page, request }) => {
      const token = await logIn(request);
      await logInPage(page);
      const launchId = await scheduleLaunch(page);
      const passenger = createPassenger();
      const secondPassenger = {
        ...createPassenger(),
        identityDocument: passenger.identityDocument,
      };
      const responses = await Promise.all([
        sendBooking(request, launchId, passenger, token),
        sendBooking(request, launchId, secondPassenger, token),
      ]);
      expect(responses.map((response) => response.status()).sort()).toEqual([201, 409]);
      const state = (await getBookings(request, launchId, token)).json() as Promise<{
        bookings: Array<{ identityDocument: string }>;
      }>;
      expect(
        (await state).bookings.filter(
          (item) => item.identityDocument === passenger.identityDocument,
        ),
      ).toHaveLength(1);
    },
  );

  test(
    "[R6] Reject a booking when all seats are taken",
    { tag: "@S0005-R6" },
    async ({ page, request }) => {
      const token = await logIn(request);
      await logInPage(page);
      const launchId = await scheduleLaunch(page);
      for (let index = 0; index < 5; index += 1) {
        expect((await sendBooking(request, launchId, createPassenger(), token)).status()).toBe(201);
      }
      expect((await sendBooking(request, launchId, createPassenger(), token)).status()).toBe(409);
      const state = (await getBookings(request, launchId, token)).json() as Promise<{
        capacity: number;
        availableSeats: number;
        bookings: PassengerSummary[];
      }>;
      const bookings = await state;
      expect(bookings.bookings).toHaveLength(bookings.capacity);
      expect(bookings.availableSeats).toBe(0);
    },
  );

  test(
    "[R6] Allow only one of two concurrent bookings for the last seat",
    { tag: "@S0005-R6" },
    async ({ page, request }) => {
      const token = await logIn(request);
      await logInPage(page);
      const launchId = await scheduleLaunch(page);
      for (let index = 0; index < 4; index += 1) {
        expect((await sendBooking(request, launchId, createPassenger(), token)).status()).toBe(201);
      }
      const responses = await Promise.all([
        sendBooking(request, launchId, createPassenger(), token),
        sendBooking(request, launchId, createPassenger(), token),
      ]);
      expect(responses.map((response) => response.status()).sort()).toEqual([201, 409]);
      const state = (await getBookings(request, launchId, token)).json() as Promise<{
        capacity: number;
        availableSeats: number;
        bookings: PassengerSummary[];
      }>;
      const bookings = await state;
      expect(bookings.bookings).toHaveLength(bookings.capacity);
      expect(bookings.availableSeats).toBe(0);
    },
  );

  for (const status of ["successful", "suspended", "failed"]) {
    test(
      `[R7] Reject a booking when the launch is ${status}`,
      { tag: "@S0005-R7" },
      async ({ page, request }) => {
        const token = await logIn(request);
        await logInPage(page);
        const launchId = await scheduleLaunch(page);
        if (status === "suspended") {
          expect(
            (
              await sendStatus(
                request,
                launchId,
                {
                  status,
                  suspensionCause: "weather",
                  suspensionMessage: "Strong wind",
                },
                token,
              )
            ).status(),
          ).toBe(200);
        } else {
          if (status === "successful") await changeStatus(request, launchId, "confirmed", token);
          await changeStatus(request, launchId, status, token);
        }
        expect((await sendBooking(request, launchId, createPassenger(), token)).status()).toBe(409);
        expect((await (await getBookings(request, launchId, token)).json()).bookings).toHaveLength(
          0,
        );
      },
    );
  }
});

type PassengerSummary = { identityDocument: string };
