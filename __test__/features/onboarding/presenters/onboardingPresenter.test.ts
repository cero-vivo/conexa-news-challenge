import { OnboardingPresenter } from '../../../../features/onboarding/infrastructure/presenters/OnboardingPresenter';
import { IOnboardingActions } from '../../../../features/onboarding/model/actions/OnboardingActions';

describe('OnboardingPresenter', () => {
  const createActionsMock = (): jest.Mocked<IOnboardingActions> => ({
    getShowOnboarding: jest.fn(),
    setShowOnboarding: jest.fn(),
  });

  const createScreenMock = () => ({
    setShowOnboardingComplete: jest.fn(),
  });

  it('completeOnboarding debe guardar flag en false y notificar', async () => {
    const actions = createActionsMock();
    const screen = createScreenMock();

    const presenter = OnboardingPresenter(actions, screen);

    await presenter.completeOnboarding();

    expect(actions.setShowOnboarding).toHaveBeenCalledWith(false);
    expect(screen.setShowOnboardingComplete).toHaveBeenCalled();
  });

  it('loadFlag debe completar cuando flag es false', async () => {
    const actions = createActionsMock();
    actions.getShowOnboarding.mockResolvedValue(false);
    const screen = createScreenMock();
    const presenter = OnboardingPresenter(actions, screen);

    await presenter.loadFlag();

    expect(actions.getShowOnboarding).toHaveBeenCalled();
    expect(screen.setShowOnboardingComplete).toHaveBeenCalled();
  });

  it('loadFlag no debe llamar callback cuando flag es true', async () => {
    const actions = createActionsMock();
    actions.getShowOnboarding.mockResolvedValue(true);
    const screen = createScreenMock();
    const presenter = OnboardingPresenter(actions, screen);

    await presenter.loadFlag();

    expect(screen.setShowOnboardingComplete).not.toHaveBeenCalled();
  });
}); 