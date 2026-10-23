// Shared steps for the rocket fleet specs (specs/S0002-rocket-fleet/*.feature).
import { expect, type APIRequestContext, type APIResponse, type Page } from "@playwright/test";
import { backUrl } from "./env";
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

export async function logInPage(page: Page): Promise<void> {
  await page.goto("/login");
  await page.getByRole("textbox", { name: "Email" }).fill(existingUser.email);
  await page.getByLabel("Password").fill(existingUser.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Logged in")).toBeVisible();
}

// Values of the "token" column in the Examples tables.
export const tokenExamples = [
  { token: "no token", headers: {} },
  { token: "a token not valid", headers: bearer("not-a-valid-token") },
];
