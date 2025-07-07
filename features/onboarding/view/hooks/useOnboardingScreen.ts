import { Routes } from '@/constants/Routes';
import { OnboardingGateway } from '@/features/onboarding/infrastructure/gateways/OnboardingGateway';
import { OnboardingPresenter } from '@/features/onboarding/infrastructure/presenters/OnboardingPresenter';
import { OnboardingActions } from '@/features/onboarding/model/actions/OnboardingActions';
import { persistShowOnboarding } from '@/store/configUiSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

export const useOnboardingScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gateway = useMemo(() => OnboardingGateway(), []);
  const actions = useMemo(() => OnboardingActions(gateway), [gateway]);

  const presenter = useMemo(() =>
    OnboardingPresenter(actions, {
      setShowOnboardingComplete: () => {
        router.replace(Routes.AUTH)
        dispatch(persistShowOnboarding(false))
      },
    }), [actions, router]);

  const handleFinish = useCallback(() => {
    presenter.completeOnboarding();
  }, [presenter]);

  return { handleFinish };
}; 