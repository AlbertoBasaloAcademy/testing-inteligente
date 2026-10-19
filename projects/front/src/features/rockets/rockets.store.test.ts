import { expect, test } from "vite-plus/test";
import { createRocketsStore } from "./rockets.store.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Rocket, RocketsClient } from "./rockets.type.ts";

const rocket: Rocket = { id: "1", name: "Falcon", capacity: 4, range: "orbital" };
function failing(details: ExpectedError["details"]): RocketsClient {
  const fail = async () => {
    throw new ExpectedError(details);
  };
  return { list: fail, read: fail, add: fail };
}

test("rockets store returns the loaded fleet, rocket and created rocket", async () => {
  const store = createRocketsStore({
    list: async () => [rocket],
    read: async () => rocket,
    add: async () => rocket,
  });
  expect(await store.list()).toStrictEqual({ status: "loaded", rockets: [rocket] });
  expect(await store.read("1")).toStrictEqual({ status: "loaded", rocket });
  expect(await store.add(rocket)).toStrictEqual({ status: "created", rocket });
});
test("rockets store reports a missing token or session as unauthorized", async () => {
  const store = createRocketsStore(failing({ status: 401, message: "Unauthorized" }));
  expect(await store.list()).toStrictEqual({ status: "unauthorized" });
  expect(await store.read("1")).toStrictEqual({ status: "unauthorized" });
  expect(await store.add(rocket)).toStrictEqual({ status: "unauthorized" });
});
test("rockets store reports a rocket that does not exist as not found", async () => {
  const store = createRocketsStore(failing({ status: 404, message: "Rocket not found" }));
  expect(await store.read("missing")).toStrictEqual({ status: "not-found" });
});
test("rockets store keeps the field errors and the conflict message of the back", async () => {
  const fields = { capacity: "capacity must be an integer from 1 to 10" };
  const invalid = createRocketsStore(failing({ status: 400, message: "Invalid input", fields }));
  expect(await invalid.add(rocket)).toStrictEqual({
    status: "rejected",
    message: "Invalid input",
    fields,
  });
  const conflict = createRocketsStore(
    failing({ status: 409, message: "Rocket name already exists" }),
  );
  expect(await conflict.add(rocket)).toStrictEqual({
    status: "rejected",
    message: "Rocket name already exists",
    fields: {},
  });
});
test("rockets store reports any other failure as unavailable", async () => {
  const store = createRocketsStore(failing({ status: 500, message: "Internal server error" }));
  expect(await store.list()).toStrictEqual({ status: "unavailable" });
});
