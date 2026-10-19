export const rocketRanges = ["suborbital", "orbital", "moon", "mars"] as const;
export interface Rocket {
  id: string;
  name: string;
  capacity: number;
  range: string;
}
export interface RocketInput {
  name: string;
  capacity: number;
  range: string;
}
export interface RocketsClient {
  list(): Promise<Rocket[]>;
  read(id: string): Promise<Rocket>;
  add(input: RocketInput): Promise<Rocket>;
}
type Failure = { status: "unauthorized" } | { status: "unavailable" };
export type RocketListState = { status: "loaded"; rockets: Rocket[] } | Failure;
export type RocketDetailState =
  | { status: "loaded"; rocket: Rocket }
  | { status: "not-found" }
  | Failure;
export type RocketAddResult =
  | { status: "created"; rocket: Rocket }
  | { status: "rejected"; message: string; fields: Record<string, string> }
  | Failure;
