import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { createBookingsRepository } from "./bookings.repository.ts";
import { createBookingsService } from "./bookings.service.ts";
export function registerBookings(services: ApplicationServices): RouteRegistration {
  const bookings = createBookingsService(createBookingsRepository(services.database));
  return {
    basePath: "/api/launches",
    register(router) {
      router.get("/:id/bookings", (request, response) =>
        response.json(bookings.list(request.params.id)),
      );
      router.post("/:id/bookings", (request, response) =>
        response.status(201).json(bookings.book(request.params.id, request.body)),
      );
    },
  };
}
