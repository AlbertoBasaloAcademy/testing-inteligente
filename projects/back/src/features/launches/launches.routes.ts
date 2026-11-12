import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { currentUser, runAsOperator } from "../auth/auth.api.ts";
import { createLaunchesRepository } from "./launches.repository.ts";
import { createLaunchesService } from "./launches.service.ts";

export function registerLaunches(services: ApplicationServices): RouteRegistration {
  const launches = createLaunchesService(createLaunchesRepository(services.database));
  return {
    basePath: "/api/launches",
    register(router) {
      router.post("/", (request, response) => {
        const launch = runAsOperator(currentUser(response.locals.user), () =>
          launches.schedule(request.body),
        );
        response.status(201).json(launch);
      });
      router.get("/", (_request, response) => {
        response.json(launches.list());
      });
      router.patch("/:id", (request, response) => {
        const launch = runAsOperator(currentUser(response.locals.user), () =>
          launches.changeStatus(request.params.id, request.body),
        );
        response.json(launch);
      });
    },
  };
}
