import { randomUUID } from "node:crypto";
import { ExpectedError } from "../../shared/error.type.ts";
import { rocketRanges } from "./rockets.type.ts";
import type { Rocket, RocketInput, RocketRange, RocketsRepository } from "./rockets.type.ts";

const nameLength = { minimum: 3, maximum: 40 };
const capacityRange = { minimum: 1, maximum: 10 };

function isCapacity(value: unknown) {
  return (
    Number.isInteger(value) &&
    Number(value) >= capacityRange.minimum &&
    Number(value) <= capacityRange.maximum
  );
}
function collectFields(input: { name: string; capacity: unknown; range: unknown }) {
  const fields: Record<string, string> = {};
  if (input.name.length < nameLength.minimum || input.name.length > nameLength.maximum)
    fields.name = `name must have ${nameLength.minimum} to ${nameLength.maximum} characters`;
  if (!isCapacity(input.capacity))
    fields.capacity = `capacity must be an integer from ${capacityRange.minimum} to ${capacityRange.maximum}`;
  if (!rocketRanges.includes(input.range as RocketRange))
    fields.range = `range must be one of ${rocketRanges.join(", ")}`;
  return fields;
}
export function readRocketInput(value: unknown): RocketInput {
  const body =
    typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const fields = collectFields({ name, capacity: body.capacity, range: body.range });
  if (Object.keys(fields).length)
    throw new ExpectedError({ status: 400, message: "Invalid input", fields });
  return { name, capacity: Number(body.capacity), range: body.range as RocketRange };
}
export function createRocketsService(repository: RocketsRepository) {
  return {
    add(value: unknown): Rocket {
      const input = readRocketInput(value);
      if (repository.findByName(input.name))
        throw new ExpectedError({ status: 409, message: "Rocket name already exists" });
      const rocket: Rocket = { id: randomUUID(), ...input, createdAt: new Date().toISOString() };
      repository.insert(rocket);
      return rocket;
    },
    list() {
      return repository.list();
    },
    read(id: string) {
      const rocket = repository.find(id);
      if (!rocket) throw new ExpectedError({ status: 404, message: "Rocket not found" });
      return rocket;
    },
  };
}
