import type { Database } from "../../shared/database/database.type.ts";
import type { Rocket, RocketRange, RocketsRepository } from "./rockets.type.ts";

const LIST = "SELECT * FROM rockets ORDER BY name";
const FIND = "SELECT * FROM rockets WHERE id = ?";
const FIND_BY_NAME = "SELECT * FROM rockets WHERE name = ?";
const INSERT = "INSERT INTO rockets(id,name,capacity,range,createdAt) VALUES (?,?,?,?,?)";
function toRocket(row: Record<string, unknown>): Rocket {
  return {
    id: String(row.id),
    name: String(row.name),
    capacity: Number(row.capacity),
    range: String(row.range) as RocketRange,
    createdAt: String(row.createdAt),
  };
}
export function createRocketsRepository(database: Database): RocketsRepository {
  return {
    list() {
      return database.prepare(LIST).all().map(toRocket);
    },
    find(id) {
      const row = database.prepare(FIND).get(id);
      return row ? toRocket(row) : undefined;
    },
    findByName(name) {
      const row = database.prepare(FIND_BY_NAME).get(name);
      return row ? toRocket(row) : undefined;
    },
    insert(rocket) {
      database
        .prepare(INSERT)
        .run(rocket.id, rocket.name, rocket.capacity, rocket.range, rocket.createdAt);
    },
  };
}
