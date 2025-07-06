import { OnboardingPresenter } from '../../../../features/onboarding/infrastructure/presenters/OnboardingPresenter';
import { IOnboardingGateway } from '../../../../features/onboarding/model/gateways/IOnboardingGateway';

describe('OnboardingPresenter', () => {
  const createGatewayMock = (): jest.Mocked<IOnboardingGateway> => ({
    getShowOnboarding: jest.fn(),
    setShowOnboarding: jest.fn(),
  });

  const createScreenMock = () => ({
    setShowOnboardingComplete: jest.fn(),
  });

  it('completeOnboarding debe guardar flag en false y notificar', async () => {
    const gateway = createGatewayMock();
    const screen = createScreenMock();

    const presenter = OnboardingPresenter(gateway, screen);

    await presenter.completeOnboarding();

    expect(gateway.setShowOnboarding).toHaveBeenCalledWith(false);
    expect(screen.setShowOnboardingComplete).toHaveBeenCalled();
  });

  it('loadFlag debe completar cuando flag es false', async () => {
    const gateway = createGatewayMock();
    gateway.getShowOnboarding.mockResolvedValue(false);
    const screen = createScreenMock();
    const presenter = OnboardingPresenter(gateway, screen);

    await presenter.loadFlag();

    expect(gateway.getShowOnboarding).toHaveBeenCalled();
    expect(screen.setShowOnboardingComplete).toHaveBeenCalled();
  });

  it('loadFlag no debe llamar callback cuando flag es true', async () => {
    const gateway = createGatewayMock();
    gateway.getShowOnboarding.mockResolvedValue(true);
    const screen = createScreenMock();
    const presenter = OnboardingPresenter(gateway, screen);

    await presenter.loadFlag();

    expect(screen.setShowOnboardingComplete).not.toHaveBeenCalled();
  });
}); 