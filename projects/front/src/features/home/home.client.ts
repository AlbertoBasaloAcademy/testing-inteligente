import type { HttpClient } from "../../shared/http.type.ts";
import type { PublicLaunch } from "./home.type.ts";

export async function loadUpcomingLaunches(http: HttpClient): Promise<PublicLaunch[]> {
  const response = await http.request("/api/launches/upcoming");
  return (await response.json()) as PublicLaunch[];
}
