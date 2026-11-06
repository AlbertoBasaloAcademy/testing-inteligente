// Stops the back and front servers that `npm start` runs.
// Usage: node scripts/stop.mjs
import { execFileSync } from "node:child_process";
import { isWindows, readRunningPid, removePid } from "./servers.pid.mjs";

// On Windows, taskkill /T stops the whole process tree. Elsewhere, start.mjs stops its children.
function stopTree(pid) {
  if (isWindows) execFileSync("taskkill", ["/PID", pid, "/T", "/F"], { stdio: "ignore" });
  else process.kill(Number(pid));
}

const pid = readRunningPid();
try {
  if (pid === null) {
    console.log("No servers from `npm start` are running.");
  } else {
    stopTree(pid);
    console.log(`Servers stopped (process ${pid}).`);
  }
  removePid();
} catch (error) {
  console.error(`Cannot stop process ${pid}. ${error.message}`);
  process.exitCode = 1;
}
