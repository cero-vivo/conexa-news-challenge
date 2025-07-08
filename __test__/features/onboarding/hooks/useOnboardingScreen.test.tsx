// @ts-nocheck
import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => ({ setItem: jest.fn(), getItem: jest.fn() }));

const mockDispatch = jest.fn();
jest.mock('@/store/hooks', () => ({ useAppDispatch: () => mockDispatch }));

const mockReplace = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ replace: mockReplace }) }));

const mockComplete = jest.fn();
let screenRef: any;
jest.mock('@/features/onboarding/infrastructure/presenters/OnboardingPresenter', () => ({
  OnboardingPresenter: (_actions: any, screen: any) => {
    screenRef = screen;
    return { completeOnboarding: mockComplete };
  },
}));

jest.mock('@/features/onboarding/infrastructure/gateways/OnboardingGateway', () => ({ OnboardingGateway: () => ({}) }));

import { useOnboardingScreen } from '@/features/onboarding/view/hooks/useOnboardingScreen';

describe('useOnboardingScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('handleFinish invoca presenter.completeOnboarding', async () => {
    const refContainer: {current:any} = { current: null };
    const Test = () => { refContainer.current = useOnboardingScreen(); return null; };
    await act(async () => {
      renderer.create(<Test />);
    });
    await act(async () => { await Promise.resolve(); });

    await act(async () => {
      refContainer.current.handleFinish();
    });

    expect(mockComplete).toHaveBeenCalled();
  });

  it('screen handler realiza navegación y dispatch', async () => {
    const Test = () => { useOnboardingScreen(); return null; };
    await act(async () => { renderer.create(<Test />); });
    await act(async () => { await Promise.resolve(); });

    act(() => { screenRef.setShowOnboardingComplete(); });

    expect(mockReplace).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });
}); 