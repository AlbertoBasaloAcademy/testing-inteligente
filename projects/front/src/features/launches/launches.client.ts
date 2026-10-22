import type { HttpClient } from "../../shared/http.type.ts";
import type { Launch, LaunchesClient } from "./launches.type.ts";

export function createLaunchesClient(http: HttpClient): LaunchesClient {
  return {
    async list() {
      return (await (await http.request("/api/launches")).json()) as Launch[];
    },
    async schedule(input) {
      return (await (
        await http.request("/api/launches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        })
      ).json()) as Launch;
    },
  };
}
