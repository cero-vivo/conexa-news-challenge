import { OnboardingGateway } from '@/features/onboarding/infrastructure/gateways/OnboardingGateway';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('OnboardingGateway', () => {
  const gateway = OnboardingGateway();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getShowOnboarding devuelve true por defecto', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    expect(await gateway.getShowOnboarding()).toBe(true);
  });

  it('getShowOnboarding parsea valor almacenado', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('false');
    expect(await gateway.getShowOnboarding()).toBe(false);
  });

  it('setShowOnboarding persiste valor', async () => {
    await gateway.setShowOnboarding(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('show_onboarding', 'false');
  });
}); 