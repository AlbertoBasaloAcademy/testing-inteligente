// Shared steps for the rocket fleet specs (specs/S0002-rocket-fleet/*.feature).
import { expect, type APIRequestContext, type APIResponse, type Page } from "@playwright/test";
import { backUrl } from "./env";
import { LoginPage } from "../pages/login.page";
import { existingUser } from "./seed-data";

export type RocketInput = { name: string; capacity: number; range: string };

// Date.now() plus a random suffix: parallel workers can start in the same millisecond.
export function uniqueName(base: string): string {
  return `${base} ${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function bearer(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export async function logIn(request: APIRequestContext): Promise<string> {
  const { email, password } = existingUser;
  const response = await request.post(`${backUrl}/api/auth/login`, { data: { email, password } });
  expect(response.status()).toBe(200);
  return ((await response.json()) as { token: string }).token;
}

export async function sendRocket(
  request: APIRequestContext,
  rocket: RocketInput,
  headers: Record<string, string> = {},
): Promise<APIResponse> {
  return request.post(`${backUrl}/api/rockets`, { data: rocket, headers });
}

export async function addRocket(
  request: APIRequestContext,
  rocket: RocketInput,
  token: string,
): Promise<string> {
  const response = await sendRocket(request, rocket, bearer(token));
  expect(response.status()).toBe(201);
  return ((await response.json()) as { id: string }).id;
}

// Logs in the seed user through the login page.
export async function logInPage(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.logIn(existingUser);
  await expect(loginPage.loggedInMessage).toBeVisible();
}
