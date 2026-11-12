import type { SessionPorts } from "./auth.persistence.type.ts";
import type { AuthSession, PublicUser } from "./auth.type.ts";

export function createSessionStore(ports: SessionPorts) {
  let user: PublicUser | undefined;
  return {
    readUser() {
      return user;
    },
    setSession(session: AuthSession) {
      ports.persistence.writeToken(session.token);
      user = session.user;
      ports.notify();
    },
    restoreUser(value: PublicUser) {
      user = value;
      ports.notify();
    },
    clearSession() {
      ports.persistence.clearToken();
      user = undefined;
      ports.notify();
    },
  };
}
let sessionStore: ReturnType<typeof createSessionStore>;
export function initializeSessionStore(ports: SessionPorts) {
  sessionStore = createSessionStore(ports);
}
export function readUser() {
  return sessionStore.readUser();
}
export function setSession(session: AuthSession) {
  sessionStore.setSession(session);
}
export function restoreUser(value: PublicUser) {
  sessionStore.restoreUser(value);
}
export function clearSession() {
  sessionStore.clearSession();
}
export function sessionLabel(user: { name: string; role: string }) {
  return `${user.name} (${user.role})`;
}
export function canManage(user: { role: string } | undefined) {
  return user?.role === "operator";
}
export function createSubmission() {
  let isSending = false;
  return {
    get isSending() {
      return isSending;
    },
    begin() {
      if (isSending) return false;
      isSending = true;
      return true;
    },
    finish() {
      isSending = false;
    },
  };
}
