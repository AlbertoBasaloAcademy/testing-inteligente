import { ExpectedError } from "../../shared/error.type.ts";
import type {
  LaunchInput,
  LaunchListState,
  LaunchScheduleResult,
  LaunchesClient,
} from "./launches.type.ts";

function toFailure(error: unknown) {
  const isUnauthorized = error instanceof ExpectedError && error.details.status === 401;
  return { status: isUnauthorized ? "unauthorized" : "unavailable" } as const;
}
function isRejection(error: unknown): error is ExpectedError {
  return error instanceof ExpectedError && [400, 409].includes(error.details.status);
}
export function createLaunchesStore(client: LaunchesClient) {
  return {
    async list(): Promise<LaunchListState> {
      try {
        return { status: "loaded", launches: await client.list() };
      } catch (error) {
        return toFailure(error);
      }
    },
    async schedule(input: LaunchInput): Promise<LaunchScheduleResult> {
      try {
        return { status: "created", launch: await client.schedule(input) };
      } catch (error) {
        if (!isRejection(error)) return toFailure(error);
        return { status: "rejected", message: error.message, fields: error.details.fields ?? {} };
      }
    },
  };
}
