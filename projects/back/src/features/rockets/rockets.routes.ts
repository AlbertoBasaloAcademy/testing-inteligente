import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { createRocketsService } from "./rockets.service.ts";
import { createRocketsRepository } from "./rockets.repository.ts";

export function registerRockets(services: ApplicationServices): RouteRegistration {
  const rockets = createRocketsService(createRocketsRepository(services.database));
  return {
    basePath: "/api/rockets",
    register(router) {
      router.post("/", (request, response) => {
        response.status(201).json(rockets.add(request.body));
      });
      router.get("/", (_request, response) => {
        response.json(rockets.list());
      });
      router.get("/:id", (request, response) => {
        response.json(rockets.read(request.params.id));
      });
    },
  };
}
