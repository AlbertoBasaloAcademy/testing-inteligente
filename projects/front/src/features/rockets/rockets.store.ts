import { ExpectedError } from "../../shared/error.type.ts";
import type {
  RocketAddResult,
  RocketDetailState,
  RocketInput,
  RocketListState,
  RocketsClient,
} from "./rockets.type.ts";

function toFailure(error: unknown) {
  const isUnauthorized = error instanceof ExpectedError && error.details.status === 401;
  return { status: isUnauthorized ? "unauthorized" : "unavailable" } as const;
}
function hasStatus(error: unknown, status: number): error is ExpectedError {
  return error instanceof ExpectedError && error.details.status === status;
}
export function createRocketsStore(client: RocketsClient) {
  return {
    async list(): Promise<RocketListState> {
      try {
        return { status: "loaded", rockets: await client.list() };
      } catch (error) {
        return toFailure(error);
      }
    },
    async read(id: string): Promise<RocketDetailState> {
      try {
        return { status: "loaded", rocket: await client.read(id) };
      } catch (error) {
        return hasStatus(error, 404) ? { status: "not-found" } : toFailure(error);
      }
    },
    async add(input: RocketInput): Promise<RocketAddResult> {
      try {
        return { status: "created", rocket: await client.add(input) };
      } catch (error) {
        if (!hasStatus(error, 400) && !hasStatus(error, 409)) return toFailure(error);
        return { status: "rejected", message: error.message, fields: error.details.fields ?? {} };
      }
    },
  };
}
