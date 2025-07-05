import { AuthUser } from "../entities/AuthUser";

export interface IAuthScreen {
  loginSuccess?: (user: AuthUser) => void;
  loginError?: (error: any) => void;
  registerSuccess?: (user: AuthUser) => void;
  registerError?: (error: any) => void;
  anonymousLoginSuccess?: (user: AuthUser) => void;
  anonymousLoginError?: (error: any) => void;
  logoutSuccess?: () => void;
  logoutError?: (error: any) => void;
}

export interface IAuthPresenter {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>; 
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loginAnonymous: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
} 