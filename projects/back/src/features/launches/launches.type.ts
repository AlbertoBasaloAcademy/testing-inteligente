export interface Launch {
  id: string;
  rocketId: string;
  rocketName: string;
  date: string;
  pricePerPassenger: number;
  createdAt: string;
}
export type LaunchInput = Pick<Launch, "rocketId" | "date" | "pricePerPassenger">;
export interface LaunchRocket {
  id: string;
  name: string;
}
export interface LaunchesRepository {
  list(): Launch[];
  findRocket(id: string): LaunchRocket | undefined;
  findByRocketAndDate(rocketId: string, date: string): Launch | undefined;
  insert(launch: Launch): void;
}
