import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { createLaunchesService } from "./launches.service.ts";
import { createLaunchesRepository } from "./launches.repository.ts";

export function registerLaunches(services: ApplicationServices): RouteRegistration {
  const launches = createLaunchesService(createLaunchesRepository(services.database));
  return {
    basePath: "/api/launches",
    register(router) {
      router.post("/", (request, response) => {
        response.status(201).json(launches.schedule(request.body));
      });
      router.get("/", (_request, response) => {
        response.json(launches.list());
      });
      router.patch("/:id", (request, response) => {
        response.json(launches.changeStatus(request.params.id, request.body));
      });
    },
  };
}
