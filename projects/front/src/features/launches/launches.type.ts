export interface Launch {
  id: string;
  rocketId: string;
  rocketName: string;
  date: string;
  pricePerPassenger: number;
}
export interface LaunchInput {
  rocketId: string;
  date: string;
  pricePerPassenger: number;
}
export interface LaunchesClient {
  list(): Promise<Launch[]>;
  schedule(input: LaunchInput): Promise<Launch>;
}
type Failure = { status: "unauthorized" } | { status: "unavailable" };
export type LaunchListState = { status: "loaded"; launches: Launch[] } | Failure;
export type LaunchScheduleResult =
  | { status: "created"; launch: Launch }
  | { status: "rejected"; message: string; fields: Record<string, string> }
  | Failure;
