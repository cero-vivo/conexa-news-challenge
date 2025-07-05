import { AuthUser } from "../entities/AuthUser";

export interface IAuthGateway {
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string, name: string) => Promise<AuthUser>;
  loginAnonymous: () => Promise<AuthUser>;
  logout: () => Promise<void>;
} 