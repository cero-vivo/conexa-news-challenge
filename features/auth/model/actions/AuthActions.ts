import { AuthUser } from "../entities/AuthUser";
import { IAuthGateway } from "../gateways/IAuthGateway";

export interface IAuthActions {
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, password: string, name: string) => Promise<AuthUser>;
  loginAnonymous: () => Promise<AuthUser>;
  logout: () => Promise<void>;
}

export const AuthActions = (gateway: IAuthGateway): IAuthActions => {
  return {
    login: (email, password) => gateway.login(email, password),
    register: (email, password, name) => gateway.register(email, password, name),
    loginAnonymous: () => gateway.loginAnonymous(),
    logout: () => gateway.logout(),
  };
};