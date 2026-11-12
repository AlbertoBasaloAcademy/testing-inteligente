import { composeApplication } from "./app.compose.ts";
import { openDatabase } from "./core/database.ts";
import { createLogger } from "./core/logger.ts";
import { readSettings } from "./core/settings.ts";
import { registerShutdown } from "./core/shutdown.ts";
import { ensureOperator, readOperatorAccount } from "./features/auth/auth.api.ts";
import { createAuthRepository } from "./features/auth/auth.repository.ts";
import type { Logger } from "./shared/logger.type.ts";

void start();

async function start() {
  let database: ReturnType<typeof openDatabase> | undefined;
  try {
    const settings = readSettings();
    const logger = createLogger({ directory: settings.logDirectory, level: settings.logLevel });
    database = openDatabase(settings.databasePath);
    await ensureOperator(createAuthRepository(database), readOperatorAccount(process.env));
    listen({ settings, database, logger });
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    database?.close();
    process.exitCode = 1;
  }
}
function hostOf(host: string) {
  if (host === "0.0.0.0" || host === "::") return "localhost";
  return host.includes(":") ? `[${host}]` : host;
}
function listen(input: {
  settings: ReturnType<typeof readSettings>;
  database: ReturnType<typeof openDatabase>;
  logger: Logger;
}) {
  const { settings, database, logger } = input;
  const application = composeApplication({
    corsOrigins: settings.corsOrigins,
    database,
    sessionTtlHours: settings.sessionTtlHours,
    logger,
    bodyLimitKb: settings.bodyLimitKb,
  });
  const server = application.listen(settings.port, settings.host, () => {
    console.log(`Listening on http://${hostOf(settings.host)}:${settings.port}`);
  });
  registerShutdown(server, { database, logger });
  server.on("error", (error) => {
    console.error(error.message);
    database.close();
    process.exitCode = 1;
  });
}
