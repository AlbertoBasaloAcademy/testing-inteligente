import type { ApplicationServices, RouteRegistration } from "../shared/http/application.type.ts";
import { registerHealth } from "./health/health.routes.ts";
import { registerAuth } from "./auth/auth.routes.ts";

import { usersRegistration } from "./users/users.routes.ts";
import { registerRockets } from "./rockets/rockets.routes.ts";
import { registerLaunches } from "./launches/launches.routes.ts";
export function registerFeatures(services: ApplicationServices) {
  const auth = registerAuth(services);
  const registrations: readonly RouteRegistration[] = [
    {
      basePath: "/api/health",
      isPublic: true,
      register: (router) => registerHealth(router, services),
    },
    ...auth.registrations,
    usersRegistration,
    registerRockets(services),
    registerLaunches(services),
  ];
  return { registrations, resolve: auth.resolve };
}
