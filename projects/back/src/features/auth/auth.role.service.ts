import { randomUUID } from "node:crypto";
import { Email } from "../../shared/email.value.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import { hashPassword } from "./auth.password.service.ts";
import type { AuthRepository, PublicUser, Role } from "./auth.type.ts";

const DEFAULT_EMAIL = "operator@example.com";
const DEFAULT_PASSWORD = "operator-password";
export interface OperatorAccount {
  email: Email;
  password: string;
}
function requiredSetting(input: {
  value: string | undefined;
  production: boolean;
  fallback: string;
  name: string;
}) {
  const text = input.value?.trim() ?? "";
  if (text) return text;
  if (input.production) throw new Error(`${input.name} is required when NODE_ENV is production`);
  return input.fallback;
}
export function readOperatorAccount(
  environment: Record<string, string | undefined>,
): OperatorAccount {
  const production = environment.NODE_ENV === "production";
  const email = requiredSetting({
    value: environment.OPERATOR_EMAIL,
    production,
    fallback: DEFAULT_EMAIL,
    name: "OPERATOR_EMAIL",
  });
  const password = requiredSetting({
    value: environment.OPERATOR_PASSWORD,
    production,
    fallback: DEFAULT_PASSWORD,
    name: "OPERATOR_PASSWORD",
  });
  return { email: new Email(email), password };
}
export async function ensureOperator(repository: AuthRepository, account: OperatorAccount) {
  const existing = repository.findByRole("operator");
  if (existing) return existing.user;
  if (repository.find(account.email))
    throw new ExpectedError({ status: 409, message: "Email already registered" });
  const passwordHash = await hashPassword(account.password);
  const user: PublicUser = {
    id: randomUUID(),
    email: account.email.value,
    name: "Operator",
    role: "operator",
    createdAt: new Date().toISOString(),
  };
  repository.insert({ user, passwordHash });
  return user;
}
export function runAsOperator<T>(actor: { role: Role }, action: () => T): T {
  if (actor.role !== "operator") throw new ExpectedError({ status: 403, message: "Forbidden" });
  return action();
}
