export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: "operator" | "passenger";
  createdAt: string;
}
export interface AuthSession {
  token: string;
  user: PublicUser;
}
