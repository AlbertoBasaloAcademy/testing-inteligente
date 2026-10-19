import type { HttpClient } from "../../shared/http.type.ts";
import type { Rocket, RocketsClient } from "./rockets.type.ts";

export function createRocketsClient(http: HttpClient): RocketsClient {
  return {
    async list() {
      return (await (await http.request("/api/rockets")).json()) as Rocket[];
    },
    async read(id) {
      return (await (
        await http.request("/api/rockets/" + encodeURIComponent(id))
      ).json()) as Rocket;
    },
    async add(input) {
      return (await (
        await http.request("/api/rockets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
      ).json()) as Rocket;
    },
  };
}
