import type { LaunchStatus } from "../launches/launches.type.ts";
export interface Passenger {
  name: string;
  nationality: string;
  identityDocument: string;
  email: string;
  phone: string;
}
export interface Booking extends Passenger {
  id: string;
  launchId: string;
}
export interface Availability {
  status: LaunchStatus;
  capacity: number;
  bookings: Booking[];
}
export interface BookingsRepository {
  find(launchId: string): Availability | undefined;
  insert(booking: Booking): void;
  transaction<T>(operation: () => T): T;
}
