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
  createdAt: string;
}
export type LaunchInput = Pick<Launch, "rocketId" | "date" | "pricePerPassenger">;
export type StatusChange = Pick<Launch, "status" | "suspensionCause" | "suspensionMessage">;
export interface LaunchRocket {
  id: string;
  name: string;
}
export interface LaunchesRepository {
  list(): Launch[];
  findById(id: string): Launch | undefined;
  findRocket(id: string): LaunchRocket | undefined;
  findByRocketAndDate(rocketId: string, date: string): Launch | undefined;
  insert(launch: Launch): void;
  updateStatus(id: string, change: StatusChange): void;
}
