export const rocketRanges = ["suborbital", "orbital", "moon", "mars"] as const;
export type RocketRange = (typeof rocketRanges)[number];
export interface Rocket {
  id: string;
  name: string;
  capacity: number;
  range: RocketRange;
  createdAt: string;
}
export type RocketInput = Pick<Rocket, "name" | "capacity" | "range">;
export interface RocketsRepository {
  list(): Rocket[];
  find(id: string): Rocket | undefined;
  findByName(name: string): Rocket | undefined;
  insert(rocket: Rocket): void;
}
