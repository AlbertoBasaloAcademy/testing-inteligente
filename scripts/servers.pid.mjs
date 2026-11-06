// Records the process of `npm start`, so that `npm run stop` can find it.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pidFile = join(root, "data", "servers.pid");

export const isWindows = process.platform === "win32";

export function savePid() {
  mkdirSync(dirname(pidFile), { recursive: true });
  writeFileSync(pidFile, String(process.pid));
}

export function removePid() {
  rmSync(pidFile, { force: true });
}

function readProcessName(pid) {
  const [command, args] = isWindows
    ? ["tasklist", ["/FI", `PID eq ${pid}`, "/FO", "CSV", "/NH"]]
    : ["ps", ["-p", pid, "-o", "comm="]];
  return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

// A saved process can be gone. Its number can also belong to another program now.
export function readRunningPid() {
  try {
    const pid = readFileSync(pidFile, "utf8").trim();
    return /(^|\/|")node(\.exe)?("|\s|$)/i.test(readProcessName(pid)) ? pid : null;
  } catch {
    return null;
  }
}
