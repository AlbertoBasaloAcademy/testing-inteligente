// Prepares the systems before the tests:
// 1. back-api and front-web respond.
// 2. front-web uses the same back-api as the tests.
// 3. The seed data exists (users, then rockets, then one launch). The operator creates them.
// 4. A saved browser session exists for the operator and for the passenger.
// webServer empties the database (see playwright.config.ts); this file only warns if it did not.
// The tests never access the database. They use only the back-api endpoints.
import { chromium, expect, type Browser } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LoginPage } from "../pages/login.page";
import { backUrl, frontUrl } from "./env";
import { isoDate } from "./launches";
import {
  existingUser,
  operatorAccount,
  seedLaunch,
  seedRocket as seedRocketData,
  seedRockets,
  seedUsers,
} from "./seed-data";

const START_HINT = 'Run "npm start" in the root folder, or let Playwright start the servers.';
const authDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.auth");

type RoleSession = { email: string; password: string; fileName: string };

async function request(url: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch {
    throw new Error(`No response from ${url}. ${START_HINT}`);
  }
}

async function readJson(url: string): Promise<Record<string, unknown>> {
  const response = await request(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}. ${START_HINT}`);
  return (await response.json()) as Record<string, unknown>;
}

async function checkBack(): Promise<number> {
  const health = await readJson(`${backUrl}/api/health`);
  if (health.status !== "ok") throw new Error(`back-api is not healthy: ${JSON.stringify(health)}`);
  return Number(health.runs);
}

async function checkFront(): Promise<void> {
  const response = await request(`${frontUrl}/`);
  if (!response.ok) throw new Error(`front-web returned ${response.status}. ${START_HINT}`);
  const config = await readJson(`${frontUrl}/runtime-config.json`);
  if (config.apiBaseUrl !== backUrl) {
    throw new Error(
      `front-web uses back-api ${String(config.apiBaseUrl)}, but the tests use ${backUrl}. ` +
        "Set the same URL in API_BASE_URL (front-web) and API_URL (e2e).",
    );
  }
}

// After scripts/reset.mjs, back-api records its first run. More runs mean a reused server.
function warnIfNotReset(runs: number): void {
  if (runs <= 1) return;
  console.warn(
    `[global-setup] back-api was reused (${runs} runs): the database was not reset. ` +
      'For a clean database, stop the servers and run "npm run reset" in the root folder.',
  );
}

async function seedUser(user: (typeof seedUsers)[number]): Promise<void> {
  const response = await request(`${backUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  // 409: the user exists from an earlier run. That is the state we need.
  if (response.ok || response.status === 409) return;
  throw new Error(`Cannot seed user ${user.email}: ${response.status} ${await response.text()}`);
}

async function logInOperator(): Promise<string> {
  const { email, password } = operatorAccount;
  const response = await request(`${backUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(`Cannot log in the operator: ${response.status}`);
  return ((await response.json()) as { token: string }).token;
}

async function seedRocket(rocket: (typeof seedRockets)[number], token: string): Promise<void> {
  const response = await request(`${backUrl}/api/rockets`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(rocket),
  });
  // 409: the rocket exists from an earlier run. That is the state we need.
  if (response.ok || response.status === 409) return;
  throw new Error(`Cannot seed rocket ${rocket.name}: ${response.status} ${await response.text()}`);
}

async function seedUpcomingLaunch(token: string): Promise<void> {
  const listed = await request(`${backUrl}/api/rockets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!listed.ok) throw new Error(`Cannot list rockets: ${listed.status}`);
  const rockets = (await listed.json()) as { id: string; name: string }[];
  const rocket = rockets.find((item) => item.name === seedRocketData.name);
  if (!rocket) throw new Error("Seed rocket is missing");
  const response = await request(`${backUrl}/api/launches`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      rocketId: rocket.id,
      date: isoDate(seedLaunch.daysAhead),
      pricePerPassenger: seedLaunch.pricePerPassenger,
    }),
  });
  // 409: the launch exists from an earlier run. That is the state we need.
  if (response.ok || response.status === 409) return;
  throw new Error(`Cannot seed launch: ${response.status} ${await response.text()}`);
}

function roleFile(account: { email: string; password: string }, fileName: string): RoleSession {
  return { email: account.email, password: account.password, fileName };
}

// Logs in through the form and saves the browser storage of that role.
async function saveRoleSession(browser: Browser, role: RoleSession): Promise<void> {
  const context = await browser.newContext({ baseURL: frontUrl });
  const loginPage = new LoginPage(await context.newPage());
  await loginPage.logIn(role);
  await expect(loginPage.loggedInMessage).toBeVisible({ timeout: 15_000 });
  await context.storageState({ path: path.join(authDir, role.fileName) });
  await context.close();
}

async function saveSessions(): Promise<void> {
  await mkdir(authDir, { recursive: true });
  const browser = await chromium.launch();
  try {
    await saveRoleSession(browser, roleFile(operatorAccount, "operator.json"));
    await saveRoleSession(browser, roleFile(existingUser, "passenger.json"));
  } finally {
    await browser.close();
  }
}

export default async function globalSetup(): Promise<void> {
  const runs = await checkBack();
  await checkFront();
  warnIfNotReset(runs);
  for (const user of seedUsers) await seedUser(user);
  const token = await logInOperator();
  for (const rocket of seedRockets) await seedRocket(rocket, token);
  await seedUpcomingLaunch(token);
  await saveSessions();
}
