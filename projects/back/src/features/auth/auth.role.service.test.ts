import { expect, test } from "vite-plus/test";
import { Email } from "../../shared/email.value.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import { ensureOperator, readOperatorAccount, runAsOperator } from "./auth.role.service.ts";
import type { AuthRepository, PublicUser, StoredUser } from "./auth.type.ts";

function createRepository() {
  const rows: StoredUser[] = [];
  let inserts = 0;
  const repository: AuthRepository = {
    find: (email) => rows.find((row) => row.user.email === email.value),
    findByRole: (role) => rows.find((row) => row.user.role === role),
    insert(stored) {
      inserts += 1;
      rows.push(stored);
    },
    createSession() {},
    removeSession() {},
    resolve: () => undefined,
  };
  return { repository, count: () => inserts };
}
const account = { email: new Email("operator@example.com"), password: "operator-password" };

test("startup creates one operator and stores a salted password hash", async () => {
  const { repository, count } = createRepository();
  const user = await ensureOperator(repository, account);
  const stored = repository.findByRole("operator");
  expect(user).toMatchObject({
    name: "Operator",
    role: "operator",
    email: "operator@example.com",
  });
  expect(stored?.passwordHash).toMatch(/^scrypt\$131072\$8\$1\$/);
  expect(stored?.passwordHash.includes(account.password)).toBe(false);
  const again = await ensureOperator(repository, account);
  expect(again.id).toBe(user.id);
  expect(count()).toBe(1);
});
test("startup stops when the operator email belongs to a passenger", async () => {
  const { repository } = createRepository();
  const passenger: PublicUser = {
    id: "passenger",
    email: "operator@example.com",
    name: "Ana",
    role: "passenger",
    createdAt: "2026-11-12T00:00:00.000Z",
  };
  repository.insert({ user: passenger, passwordHash: "hash" });
  await expect(ensureOperator(repository, account)).rejects.toThrow(/Email already registered/);
});
test("operator settings use the defaults unless NODE_ENV is production", () => {
  expect(readOperatorAccount({}).email.value).toBe("operator@example.com");
  expect(readOperatorAccount({}).password).toBe("operator-password");
  expect(readOperatorAccount({ NODE_ENV: "" }).password).toBe("operator-password");
  expect(readOperatorAccount({ NODE_ENV: "development" }).password).toBe("operator-password");
  const custom = readOperatorAccount({
    OPERATOR_EMAIL: "a@b.co",
    OPERATOR_PASSWORD: "secret-1",
  });
  expect(custom.email.value).toBe("a@b.co");
  expect(custom.password).toBe("secret-1");
  const production = readOperatorAccount({
    NODE_ENV: "production",
    OPERATOR_EMAIL: "op@agency.test",
    OPERATOR_PASSWORD: "prod-secret",
  });
  expect(production.email.value).toBe("op@agency.test");
  expect(production.password).toBe("prod-secret");
  expect(() => readOperatorAccount({ NODE_ENV: "production" })).toThrow(/OPERATOR_EMAIL/);
  expect(() =>
    readOperatorAccount({ NODE_ENV: "production", OPERATOR_EMAIL: "op@agency.test" }),
  ).toThrow(/OPERATOR_PASSWORD/);
  expect(() =>
    readOperatorAccount({
      NODE_ENV: "production",
      OPERATOR_EMAIL: " ",
      OPERATOR_PASSWORD: "secret",
    }),
  ).toThrow(/OPERATOR_EMAIL/);
});
test("a passenger does not run an operator action", () => {
  let ran = false;
  try {
    runAsOperator({ role: "passenger" }, () => {
      ran = true;
    });
    throw new Error("Expected an error");
  } catch (error) {
    expect(error).toBeInstanceOf(ExpectedError);
    expect((error as ExpectedError).details.status).toBe(403);
  }
  expect(ran).toBe(false);
});
test("an operator runs the action", () => {
  expect(runAsOperator({ role: "operator" }, () => "ok")).toBe("ok");
});
