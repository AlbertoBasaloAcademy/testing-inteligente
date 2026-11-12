import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { currentUser, runAsOperator } from "../auth/auth.api.ts";
import { createRocketsRepository } from "./rockets.repository.ts";
import { createRocketsService } from "./rockets.service.ts";

export function registerRockets(services: ApplicationServices): RouteRegistration {
  const rockets = createRocketsService(createRocketsRepository(services.database));
  return {
    basePath: "/api/rockets",
    register(router) {
      router.post("/", (request, response) => {
        const rocket = runAsOperator(currentUser(response.locals.user), () =>
          rockets.add(request.body),
        );
        response.status(201).json(rocket);
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
