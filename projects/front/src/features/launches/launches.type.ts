export type LaunchStatus = "planned" | "confirmed" | "successful" | "suspended" | "failed";
export type SuspensionCause = "weather" | "technical" | "economic";
export interface Launch {
  id: string;
  rocketId: string;
  rocketName: string;
  date: string;
  pricePerPassenger: number;
  status: LaunchStatus;
  suspensionCause?: SuspensionCause;
  suspensionMessage?: string;
}
export interface LaunchInput {
  rocketId: string;
  date: string;
  pricePerPassenger: number;
}
export interface StatusChange {
  status: LaunchStatus;
  suspensionCause?: string;
  suspensionMessage?: string;
}
export interface LaunchesClient {
  list(): Promise<Launch[]>;
  schedule(input: LaunchInput): Promise<Launch>;
  changeStatus(id: string, change: StatusChange): Promise<Launch>;
}
type Failure = { status: "unauthorized" } | { status: "unavailable" };
type Rejection = { status: "rejected"; message: string; fields: Record<string, string> };
export type LaunchListState = { status: "loaded"; launches: Launch[] } | Failure;
export type LaunchScheduleResult = { status: "created"; launch: Launch } | Rejection | Failure;
export type LaunchStatusResult = { status: "changed"; launch: Launch } | Rejection | Failure;
