import { IAuthActions } from "../../model/actions/AuthActions";
import { IAuthPresenter, IAuthScreen } from "../../model/presenter/IAuthPresenter";

export const AuthPresenter = (actions: IAuthActions, screen: IAuthScreen): IAuthPresenter => {
  
  return {
    login: async (email: string, password: string) => {
      try {
        const user = await actions.login(email, password);
        screen.loginSuccess?.(user);
        return { success: true };
      } catch (error: any) {
        screen.loginError?.(error);
        return { success: false, error: error?.message || 'Login error' };
      }
    },

    register: async (email: string, password: string, name: string) => {
      try {
        const user = await actions.register(email, password, name);
        screen.registerSuccess?.(user);
        return { success: true };
      } catch (error: any) {
        screen.registerError?.(error);
        return { success: false, error: error?.message || 'Register error' };
      }
    },

    loginAnonymous: async () => {
      try {
        const user = await actions.loginAnonymous();
        screen.anonymousLoginSuccess?.(user);
        return { success: true };
      } catch (error: any) {
        screen.anonymousLoginError?.(error);
        return { success: false, error: error?.message || 'Anonymous login error' };
      }
    },

    logout: async () => {
      try {
        await actions.logout();
        screen.logoutSuccess?.();
      } catch (error: any) {
        screen.logoutError?.(error);
      }
    }
  };
}; 