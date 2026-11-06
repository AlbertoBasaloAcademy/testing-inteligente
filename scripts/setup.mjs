// Checks the Node version, then installs the dependencies of all the projects and Chromium.
// Usage: node scripts/setup.mjs
import { execSync } from "node:child_process";

const supportedNode = "^22.18, ^24.11 or >=26";
const steps = [
  "npm install",
  "npm install --prefix projects/back",
  "npm install --prefix projects/front",
  "npm install --prefix e2e",
  "npx --prefix e2e playwright install chromium",
];

function isSupportedNode(version) {
  const [major, minor] = version.split(".").map(Number);
  if (major === 22) return minor >= 18;
  if (major === 24) return minor >= 11;
  return major >= 26;
}

function runSteps() {
  for (const step of steps) {
    console.log(`\n> ${step}`);
    execSync(step, { stdio: "inherit" });
  }
  console.log("\nSetup complete. To check the project, use `npm run verify`.");
}

if (isSupportedNode(process.versions.node)) {
  runSteps();
} else {
  console.error(`Node ${process.versions.node} is not supported. Use Node ${supportedNode}.`);
  process.exitCode = 1;
}
