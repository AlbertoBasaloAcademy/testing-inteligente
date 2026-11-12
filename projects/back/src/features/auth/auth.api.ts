import type { PublicUser } from "./auth.type.ts";

export function currentUser(value: unknown): PublicUser {
  return value as PublicUser;
}
export { ensureOperator, readOperatorAccount, runAsOperator } from "./auth.role.service.ts";
export type { PublicUser } from "./auth.type.ts";
