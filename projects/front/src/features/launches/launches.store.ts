import { ExpectedError } from "../../shared/error.type.ts";
import type {
  LaunchInput,
  LaunchListState,
  LaunchScheduleResult,
  LaunchStatusResult,
  LaunchesClient,
  StatusChange,
} from "./launches.type.ts";

function toFailure(error: unknown) {
  const isUnauthorized = error instanceof ExpectedError && error.details.status === 401;
  return { status: isUnauthorized ? "unauthorized" : "unavailable" } as const;
}
function toRejection(error: unknown) {
  if (!(error instanceof ExpectedError) || ![400, 404, 409].includes(error.details.status))
    return toFailure(error);
  const fields = error.details.fields ?? {};
  return { status: "rejected", message: error.message, fields } as const;
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
        return toRejection(error);
      }
    },
    async changeStatus(id: string, change: StatusChange): Promise<LaunchStatusResult> {
      try {
        return { status: "changed", launch: await client.changeStatus(id, change) };
      } catch (error) {
        return toRejection(error);
      }
    },
  };
}
