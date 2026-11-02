import type { Database } from "../../shared/database/database.type.ts";
import type { Availability, Booking, BookingsRepository } from "./bookings.type.ts";

export function createBookingsRepository(database: Database): BookingsRepository {
  return {
    find(id) {
      const row = database
        .prepare(
          "SELECT launches.status, rockets.capacity FROM launches JOIN rockets ON rockets.id = launches.rocketId WHERE launches.id = ?",
        )
        .get(id);
      if (!row) return undefined;
      const bookings = database
        .prepare("SELECT * FROM bookings WHERE launchId = ? ORDER BY rowid")
        .all(id) as unknown as Booking[];
      return {
        status: row.status as Availability["status"],
        capacity: Number(row.capacity),
        bookings,
      };
    },
    insert(booking) {
      database
        .prepare(
          "INSERT INTO bookings (id, launchId, name, nationality, identityDocument, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
        )
        .run(
          booking.id,
          booking.launchId,
          booking.name,
          booking.nationality,
          booking.identityDocument,
          booking.email,
          booking.phone,
        );
    },
    transaction(operation) {
      database.exec("BEGIN IMMEDIATE");
      try {
        const result = operation();
        database.exec("COMMIT");
        return result;
      } catch (error) {
        database.exec("ROLLBACK");
        throw error;
      }
    },
  };
}
