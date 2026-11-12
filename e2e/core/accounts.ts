// API steps for the user role specs (specs/S0006-user-roles/*.feature).
import { expect, type APIRequestContext, type APIResponse } from "@playwright/test";
import { backUrl } from "./env";
import { uniqueFutureDate } from "./launches";
import { bearer } from "./rockets";
import { operatorAccount, seedRocket } from "./seed-data";

type Account = { name: string; email: string; password: string };
type Rocket = { id: string; name: string };
export type ScheduledLaunch = { id: string; date: string; rocketId: string };

export async function logInAs(
  request: APIRequestContext,
  credentials: { email: string; password: string },
): Promise<string> {
  const response = await request.post(`${backUrl}/api/auth/login`, { data: credentials });
  expect(response.status()).toBe(200);
  return ((await response.json()) as { token: string }).token;
}

export function logInOperator(request: APIRequestContext): Promise<string> {
  return logInAs(request, operatorAccount);
}

export async function registerAccount(
  request: APIRequestContext,
  account: Account,
): Promise<APIResponse> {
  return request.post(`${backUrl}/api/auth/register`, { data: account });
}

export async function registerAndLogIn(
  request: APIRequestContext,
  account: Account,
): Promise<string> {
  const response = await registerAccount(request, account);
  expect(response.status()).toBe(201);
  return logInAs(request, account);
}

export async function findSeedRocket(request: APIRequestContext, token: string): Promise<Rocket> {
  const response = await request.get(`${backUrl}/api/rockets`, { headers: bearer(token) });
  expect(response.status()).toBe(200);
  const rockets = (await response.json()) as Rocket[];
  const rocket = rockets.find((item) => item.name === seedRocket.name);
  if (!rocket) throw new Error("Seed rocket is missing");
  return rocket;
}

export async function scheduleLaunch(
  request: APIRequestContext,
  token: string,
): Promise<ScheduledLaunch> {
  const rocket = await findSeedRocket(request, token);
  const date = uniqueFutureDate();
  const response = await request.post(`${backUrl}/api/launches`, {
    headers: bearer(token),
    data: { rocketId: rocket.id, date, pricePerPassenger: 100 },
  });
  expect(response.status()).toBe(201);
  const launch = (await response.json()) as { id: string };
  return { id: launch.id, date, rocketId: rocket.id };
}

export async function confirmLaunch(
  request: APIRequestContext,
  token: string,
  launchId: string,
): Promise<void> {
  const response = await request.patch(`${backUrl}/api/launches/${launchId}`, {
    headers: bearer(token),
    data: { status: "confirmed" },
  });
  expect(response.status()).toBe(200);
}
