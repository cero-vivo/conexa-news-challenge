import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from '../../model/entities/AuthUser';
import { IAuthGateway } from '../../model/gateways/IAuthGateway';

const USER_KEY = 'auth_user';

export const AuthGateway = (): IAuthGateway => {
  const simulateDelay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  return {
    login: async (email: string, password: string): Promise<AuthUser> => {
      await simulateDelay(1000);
      const user: AuthUser = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        avatar: require('@/assets/images/me.jpeg'),
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    },

    register: async (email: string, password: string, name: string): Promise<AuthUser> => {
      await simulateDelay(1000);
      const user: AuthUser = {
        id: Date.now().toString(),
        email,
        name,
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        avatar: require('@/assets/images/me.jpeg'),
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    },

    loginAnonymous: async (): Promise<AuthUser> => {
      await simulateDelay(500);
      const user: AuthUser = {
        id: 'anonymous_' + Date.now(),
        email: 'anonymous@user.com',
        name: 'Usuario Anónimo',
        isAnonymous: true,
        createdAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    },

    logout: async (): Promise<void> => {
      await simulateDelay(100);
      await AsyncStorage.removeItem(USER_KEY);
    }
  };
}; 