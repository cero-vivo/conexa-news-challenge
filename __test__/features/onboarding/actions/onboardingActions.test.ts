import { OnboardingActions } from '@/features/onboarding/model/actions/OnboardingActions';

describe('OnboardingActions', () => {
  it('delegan al gateway', async () => {
    const gw = {
      getShowOnboarding: jest.fn().mockResolvedValue(true),
      setShowOnboarding: jest.fn().mockResolvedValue(undefined),
    };
    const actions = OnboardingActions(gw as any);
    await actions.getShowOnboarding();
    expect(gw.getShowOnboarding).toHaveBeenCalled();
    await actions.setShowOnboarding(false);
    expect(gw.setShowOnboarding).toHaveBeenCalledWith(false);
  });
}); 