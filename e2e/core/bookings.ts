// API steps for the passenger booking specs.
import type { APIRequestContext, APIResponse } from "@playwright/test";
import { backUrl } from "./env";
import { bearer } from "./rockets";

export type Passenger = {
  name: string;
  nationality: string;
  identityDocument: string;
  email: string;
  phone: string;
};

export type LaunchBookings = {
  capacity: number;
  availableSeats: number;
  bookings: Passenger[];
};

function bookingsUrl(launchId: string): string {
  return `${backUrl}/api/launches/${encodeURIComponent(launchId)}/bookings`;
}

export async function sendBooking(
  request: APIRequestContext,
  launchId: string,
  passenger: Record<string, unknown>,
  token?: string,
): Promise<APIResponse> {
  return request.post(bookingsUrl(launchId), {
    data: passenger,
    headers: token ? bearer(token) : {},
  });
}

export async function getBookings(
  request: APIRequestContext,
  launchId: string,
  token: string,
): Promise<APIResponse> {
  return request.get(bookingsUrl(launchId), { headers: bearer(token) });
}
