import { expect, test } from "vite-plus/test";
import { createRocketsService } from "./rockets.service.ts";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Rocket, RocketsRepository } from "./rockets.type.ts";

function createFakeRepository(): RocketsRepository {
  const rockets: Rocket[] = [];
  return {
    list: () => [...rockets],
    find: (id) => rockets.find((rocket) => rocket.id === id),
    findByName: (name) => rockets.find((rocket) => rocket.name === name),
    insert: (rocket) => {
      rockets.push(rocket);
    },
  };
}
function catchDetails(action: () => unknown) {
  try {
    action();
  } catch (error) {
    expect(error).toBeInstanceOf(ExpectedError);
    return (error as ExpectedError).details;
  }
  throw new Error("Expected an error");
}
const valid = { name: "Falcon", capacity: 4, range: "orbital" };

test("a valid rocket is created with an id and can be listed and read", () => {
  const service = createRocketsService(createFakeRepository());
  const rocket = service.add({ ...valid, name: " Falcon " });
  expect(rocket).toMatchObject({ name: "Falcon", capacity: 4, range: "orbital" });
  expect(rocket.id).toBeTruthy();
  expect(service.list()).toStrictEqual([rocket]);
  expect(service.read(rocket.id)).toStrictEqual(rocket);
});
test("a rocket that does not exist is not found", () => {
  const service = createRocketsService(createFakeRepository());
  expect(catchDetails(() => service.read("missing")).status).toBe(404);
});
test("a rocket name must have 3 to 40 characters", () => {
  const service = createRocketsService(createFakeRepository());
  for (const name of ["ab", "a".repeat(41), undefined]) {
    const details = catchDetails(() => service.add({ ...valid, name }));
    expect(details.status).toBe(400);
    expect(Object.keys(details.fields ?? {})).toStrictEqual(["name"]);
  }
  expect(service.add({ ...valid, name: "abc" }).name).toBe("abc");
  expect(service.add({ ...valid, name: "a".repeat(40) }).name).toHaveLength(40);
});
test("a rocket name must be unique in the fleet", () => {
  const service = createRocketsService(createFakeRepository());
  service.add(valid);
  expect(catchDetails(() => service.add(valid)).status).toBe(409);
});
test("a rocket capacity must be an integer from 1 to 10", () => {
  const service = createRocketsService(createFakeRepository());
  for (const capacity of [0, 11, 2.5, "5", undefined]) {
    const details = catchDetails(() => service.add({ ...valid, capacity }));
    expect(details.status).toBe(400);
    expect(Object.keys(details.fields ?? {})).toStrictEqual(["capacity"]);
  }
  expect(service.add({ ...valid, name: "One", capacity: 1 }).capacity).toBe(1);
  expect(service.add({ ...valid, name: "Ten", capacity: 10 }).capacity).toBe(10);
});
test("a rocket range must be a permitted value", () => {
  const service = createRocketsService(createFakeRepository());
  const details = catchDetails(() => service.add({ ...valid, range: "venus" }));
  expect(details.status).toBe(400);
  expect(Object.keys(details.fields ?? {})).toStrictEqual(["range"]);
  for (const range of ["suborbital", "orbital", "moon", "mars"])
    expect(service.add({ ...valid, name: range, range }).range).toBe(range);
});
