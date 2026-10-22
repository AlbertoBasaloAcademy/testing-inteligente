import type { Database } from "../../shared/database/database.type.ts";
import type { Launch, LaunchesRepository } from "./launches.type.ts";

const SELECT =
  "SELECT launches.*, rockets.name AS rocketName FROM launches JOIN rockets ON rockets.id = launches.rocketId";
const LIST = `${SELECT} ORDER BY launches.date, rockets.name`;
const FIND_BY_ROCKET_AND_DATE = `${SELECT} WHERE launches.rocketId = ? AND launches.date = ?`;
const FIND_ROCKET = "SELECT id, name FROM rockets WHERE id = ?";
const INSERT =
  "INSERT INTO launches(id,rocketId,date,pricePerPassenger,createdAt) VALUES (?,?,?,?,?)";
function toLaunch(row: Record<string, unknown>): Launch {
  return {
    id: String(row.id),
    rocketId: String(row.rocketId),
    rocketName: String(row.rocketName),
    date: String(row.date),
    pricePerPassenger: Number(row.pricePerPassenger),
    createdAt: String(row.createdAt),
  };
}
export function createLaunchesRepository(database: Database): LaunchesRepository {
  return {
    list() {
      return database.prepare(LIST).all().map(toLaunch);
    },
    findRocket(id) {
      const row = database.prepare(FIND_ROCKET).get(id);
      return row ? { id: String(row.id), name: String(row.name) } : undefined;
    },
    findByRocketAndDate(rocketId, date) {
      const row = database.prepare(FIND_BY_ROCKET_AND_DATE).get(rocketId, date);
      return row ? toLaunch(row) : undefined;
    },
    insert(launch) {
      database
        .prepare(INSERT)
        .run(launch.id, launch.rocketId, launch.date, launch.pricePerPassenger, launch.createdAt);
    },
  };
}
