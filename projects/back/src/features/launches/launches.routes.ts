import type { ApplicationServices, RouteRegistration } from "../../shared/http/application.type.ts";
import { currentUser, runAsOperator } from "../auth/auth.api.ts";
import { createLaunchesRepository } from "./launches.repository.ts";
import { createLaunchesService } from "./launches.service.ts";

type LaunchesService = ReturnType<typeof createLaunchesService>;

function registerUpcoming(launches: LaunchesService): RouteRegistration {
  return {
    basePath: "/api/launches/upcoming",
    isPublic: true,
    register(router) {
      router.get("/", (_request, response) => {
        response.json(launches.listUpcoming());
      });
    },
  };
}
function registerManaged(launches: LaunchesService): RouteRegistration {
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
export function registerLaunches(services: ApplicationServices): readonly RouteRegistration[] {
  const launches = createLaunchesService(createLaunchesRepository(services.database));
  return [registerUpcoming(launches), registerManaged(launches)];
}
