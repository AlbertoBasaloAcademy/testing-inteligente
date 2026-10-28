import { ExpectedError } from "../../shared/error.type.ts";
import type { Launch, LaunchStatus, StatusChange, SuspensionCause } from "./launches.type.ts";

const NEXT_STATUSES: Record<LaunchStatus, LaunchStatus[]> = {
  planned: ["confirmed", "suspended"],
  confirmed: ["successful", "suspended", "failed"],
  successful: [],
  suspended: [],
  failed: [],
};
const STATUSES = Object.keys(NEXT_STATUSES);
const CAUSES: SuspensionCause[] = ["weather", "technical", "economic"];

function isMessage(value: unknown): value is string {
  return typeof value === "string" && value.trim().length >= 3 && value.trim().length <= 200;
}
function collectSuspensionFields(body: Record<string, unknown>) {
  const fields: Record<string, string> = {};
  if (!CAUSES.includes(body.suspensionCause as SuspensionCause))
    fields.suspensionCause = "suspensionCause must be weather, technical or economic";
  if (!isMessage(body.suspensionMessage))
    fields.suspensionMessage = "suspensionMessage must have 3 to 200 characters";
  return fields;
}
function collectFields(body: Record<string, unknown>) {
  if (!STATUSES.includes(String(body.status)))
    return { status: `status must be one of ${STATUSES.join(", ")}` };
  return body.status === "suspended" ? collectSuspensionFields(body) : {};
}
export function readStatusChange(value: unknown): StatusChange {
  const body =
    typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
  const fields = collectFields(body);
  if (Object.keys(fields).length)
    throw new ExpectedError({ status: 400, message: "Invalid input", fields });
  if (body.status !== "suspended") return { status: body.status as LaunchStatus };
  return {
    status: "suspended",
    suspensionCause: body.suspensionCause as SuspensionCause,
    suspensionMessage: String(body.suspensionMessage).trim(),
  };
}
export function checkTransition(launch: Launch, status: LaunchStatus) {
  if (!NEXT_STATUSES[launch.status].includes(status))
    throw new ExpectedError({
      status: 409,
      message: `Launch cannot change from ${launch.status} to ${status}`,
    });
}
