import { randomUUID } from "node:crypto";
import { ExpectedError } from "../../shared/error.type.ts";
import type { Launch, LaunchInput, LaunchesRepository } from "./launches.type.ts";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !datePattern.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}
function isPrice(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function collectFields(body: Record<string, unknown>, today: string) {
  const fields: Record<string, string> = {};
  if (typeof body.rocketId !== "string" || body.rocketId.trim() === "")
    fields.rocketId = "rocketId is required";
  if (!isIsoDate(body.date)) fields.date = "date must be a date in the format YYYY-MM-DD";
  else if (body.date <= today) fields.date = "date must be after the current date";
  if (!isPrice(body.pricePerPassenger))
    fields.pricePerPassenger = "pricePerPassenger must be a number greater than 0";
  return fields;
}
function readLaunchInput(value: unknown, today: string): LaunchInput {
  const body =
    typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const fields = collectFields(body, today);
  if (Object.keys(fields).length)
    throw new ExpectedError({ status: 400, message: "Invalid input", fields });
  return {
    rocketId: String(body.rocketId).trim(),
    date: String(body.date),
    pricePerPassenger: Number(body.pricePerPassenger),
  };
}
function currentDate() {
  return new Date().toISOString().slice(0, 10);
}
export function createLaunchesService(repository: LaunchesRepository, today = currentDate) {
  return {
    schedule(value: unknown): Launch {
      const input = readLaunchInput(value, today());
      const rocket = repository.findRocket(input.rocketId);
      if (!rocket) {
        const fields = { rocketId: "rocketId must be a rocket of the fleet" };
        throw new ExpectedError({ status: 400, message: "Invalid input", fields });
      }
      if (repository.findByRocketAndDate(rocket.id, input.date))
        throw new ExpectedError({ status: 409, message: "Rocket has a launch on this date" });
      const launch: Launch = {
        id: randomUUID(),
        ...input,
        rocketName: rocket.name,
        createdAt: new Date().toISOString(),
      };
      repository.insert(launch);
      return launch;
    },
    list() {
      return repository.list();
    },
  };
}
