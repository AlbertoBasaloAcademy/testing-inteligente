import type { Database } from "../../shared/database/database.type.ts";
import type { Launch, LaunchStatus, LaunchesRepository, SuspensionCause } from "./launches.type.ts";

const SELECT =
  "SELECT launches.*, rockets.name AS rocketName FROM launches JOIN rockets ON rockets.id = launches.rocketId";
const LIST = `${SELECT} ORDER BY launches.date, rockets.name`;
const FIND_BY_ROCKET_AND_DATE = `${SELECT} WHERE launches.rocketId = ? AND launches.date = ?`;
const FIND_BY_ID = `${SELECT} WHERE launches.id = ?`;
const FIND_ROCKET = "SELECT id, name FROM rockets WHERE id = ?";
const INSERT =
  "INSERT INTO launches(id,rocketId,date,pricePerPassenger,status,createdAt) VALUES (?,?,?,?,?,?)";
const UPDATE_STATUS =
  "UPDATE launches SET status = ?, suspensionCause = ?, suspensionMessage = ? WHERE id = ?";
function toLaunch(row: Record<string, unknown>): Launch {
  const launch: Launch = {
    id: String(row.id),
    rocketId: String(row.rocketId),
    rocketName: String(row.rocketName),
    date: String(row.date),
    pricePerPassenger: Number(row.pricePerPassenger),
    status: String(row.status) as LaunchStatus,
    createdAt: String(row.createdAt),
  };
  if (typeof row.suspensionCause === "string")
    launch.suspensionCause = row.suspensionCause as SuspensionCause;
  if (typeof row.suspensionMessage === "string") launch.suspensionMessage = row.suspensionMessage;
  return launch;
}
export function createLaunchesRepository(database: Database): LaunchesRepository {
  return {
    list() {
      return database.prepare(LIST).all().map(toLaunch);
    },
    findById(id) {
      const row = database.prepare(FIND_BY_ID).get(id);
      return row ? toLaunch(row) : undefined;
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
        .run(
          launch.id,
          launch.rocketId,
          launch.date,
          launch.pricePerPassenger,
          launch.status,
          launch.createdAt,
        );
    },
    updateStatus(id, change) {
      const { status, suspensionCause, suspensionMessage } = change;
      database
        .prepare(UPDATE_STATUS)
        .run(status, suspensionCause ?? null, suspensionMessage ?? null, id);
    },
  };
}
