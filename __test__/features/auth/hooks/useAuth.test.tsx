// @ts-nocheck
import { AuthUser } from '@/features/auth/model/entities/AuthUser';
import { loginStart, loginSuccess } from '@/features/auth/store/authSlice';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

// Mock dispatch y selector
const mockDispatch = jest.fn();

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (sel: any) => sel({ auth: { user: null, isAuthenticated: false, loading: 'idle', error: null } }),
}));

// Mock router
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

// Mock AuthPresenter para interceptar screen handler
const mockPresenterLogin = jest.fn();
let screenRef: any;

jest.mock('@/features/auth/infrastructure/presenters/AuthPresenter', () => ({
  AuthPresenter: (_gateway: any, screen: any) => {
    screenRef = screen;
    return {
      login: mockPresenterLogin,
      register: jest.fn(),
      loginAnonymous: jest.fn(),
      logout: jest.fn(),
    };
  },
}));

jest.mock('@/features/auth/infrastructure/gateways/AuthGateway', () => ({
  AuthGateway: () => ({})
}));

import { useAuth } from '@/features/auth/view/hooks/useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('login dispara loginStart y loginSuccess', async () => {
    const sampleUser: AuthUser = { id: '1', email: 'a@b.com', name: 'A', isAnonymous: false, createdAt: '' };

    mockPresenterLogin.mockImplementation(() => {
      screenRef.loginSuccess(sampleUser);
      return Promise.resolve({ success: true });
    });

    let hookRef: any;
    const Test: React.FC = () => {
      hookRef = useAuth();
      return null;
    };

    await act(async () => {
      renderer.create(<Test />);
    });

    await act(async () => {
      await hookRef.login('a@b.com', 'x');
    });

    // First dispatch should be loginStart
    expect(mockDispatch).toHaveBeenCalledWith(loginStart());
    // Expect loginSuccess dispatched
    expect(mockDispatch).toHaveBeenCalledWith(loginSuccess(sampleUser));
    // Presenter invoked with correct args
    expect(mockPresenterLogin).toHaveBeenCalledWith('a@b.com', 'x');
  });
}); 