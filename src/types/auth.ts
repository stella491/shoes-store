import type { Dispatch, SetStateAction } from "react";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  login: (payload: { token: string; user: AuthUser }) => void;
  logout: () => void;
}
