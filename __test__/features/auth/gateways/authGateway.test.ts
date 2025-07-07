import { AuthGateway } from '@/features/auth/infrastructure/gateways/AuthGateway';
import { AuthUser } from '@/features/auth/model/entities/AuthUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock asset require
jest.mock('@/assets/images/me.jpeg', () => 'avatar', { virtual: true });

jest.useFakeTimers();

describe('AuthGateway', () => {
  const gateway = AuthGateway();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login guarda usuario en AsyncStorage y retorna datos', async () => {
    const promise = gateway.login('john@example.com', '123');
    jest.advanceTimersByTime(1000);
    const user = await promise;

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    const [key, value] = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
    expect(key).toBe('auth_user');

    const stored: AuthUser = JSON.parse(value);
    expect(stored.email).toBe('john@example.com');
    expect(stored.isAnonymous).toBe(false);
    expect(user.email).toBe('john@example.com');
  });

  it('register guarda usuario y retorna datos', async () => {
    const promise = gateway.register('jane@example.com', '123', 'Jane');
    jest.advanceTimersByTime(1000);
    const user = await promise;

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(user.name).toBe('Jane');
    expect(user.isAnonymous).toBe(false);
  });

  it('loginAnonymous guarda usuario anónimo', async () => {
    const promise = gateway.loginAnonymous();
    jest.advanceTimersByTime(500);
    const user = await promise;

    expect(AsyncStorage.setItem).toHaveBeenCalled();
    expect(user.isAnonymous).toBe(true);
  });

  it('logout elimina item en AsyncStorage', async () => {
    const promise = gateway.logout();
    jest.advanceTimersByTime(100);
    await promise;

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('auth_user');
  });
}); 