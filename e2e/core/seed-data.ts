// Minimal seed data. global-setup creates it before the tests.
// Spec: specs/S0001-register-user/spec.yaml (R0002 S001)
export const existingUser = {
  name: "Existing User",
  email: "already_taken@example.com",
  password: "SecurePassword123!",
};

export const seedUsers = [existingUser];

// The back creates this operator at startup. The seed logs in with the same values.
const DEFAULT_OPERATOR_EMAIL = "operator@example.com";
const DEFAULT_OPERATOR_PASSWORD = "operator-password";

function readOperatorSetting(value: string | undefined, fallback: string): string {
  const text = value?.trim() ?? "";
  return text || fallback;
}

export const operatorAccount = {
  name: "Operator",
  email: readOperatorSetting(process.env.OPERATOR_EMAIL, DEFAULT_OPERATOR_EMAIL),
  password: readOperatorSetting(process.env.OPERATOR_PASSWORD, DEFAULT_OPERATOR_PASSWORD),
};

// Spec: specs/S0003-schedule-launch/spec.md
export const seedRocket = { name: "Seed Rocket", capacity: 5, range: "orbital" };

export const seedRockets = [seedRocket];
