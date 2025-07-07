// @ts-nocheck
import { User } from '@/features/users/model/entities/User';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.useFakeTimers();

// Mock del Presenter
const mockGetUsers = jest.fn();
let screenRef: any;

jest.mock('@/features/users/infrastructure/presenters/UsersPresenter', () => ({
  UsersPresenter: (_action: any, screen: any) => {
    screenRef = screen;
    return { getUsers: mockGetUsers };
  },
}));

jest.mock('@/features/users/infrastructure/gateways/UsersGateway', () => ({
  HttpUsersGateway: () => ({})
}));

import { useUsersFeedScreen } from '@/features/users/view/users-feed/hooks/useUsersFeedScreen';

describe('useUsersFeedScreen', () => {
  const sampleUsers: User[] = [({ id: 1, firstname: 'A', lastname: 'B' } as unknown as User)];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gestiona carga exitosa', async () => {
    mockGetUsers.mockImplementation(() => {
      return Promise.resolve().then(() => {
        screenRef.getUsersSuccess(sampleUsers);
      });
    });

    let ref: any = {};
    const Test: React.FC = () => {
      ref = useUsersFeedScreen();
      return null;
    };

    await act(async () => {
      renderer.create(<Test />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(ref.loading).toBe('success');
    expect(ref.users).toEqual(sampleUsers);
    expect(ref.error).toBeNull();
  });

  it('gestiona error en la carga', async () => {
    const err = new Error('fail');
    mockGetUsers.mockImplementation(() => {
      return Promise.resolve().then(() => {
        screenRef.getUsersError(err);
      });
    });

    let ref: any;
    const Test: React.FC = () => {
      ref = useUsersFeedScreen();
      return null;
    };

    await act(async () => {
      renderer.create(<Test />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(ref.loading).toBe('error');
    expect(ref.error).toBe('fail');
  });
}); 