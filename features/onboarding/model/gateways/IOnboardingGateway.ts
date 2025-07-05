export interface IOnboardingGateway {
  getShowOnboarding: () => Promise<boolean>;
  setShowOnboarding: (value: boolean) => Promise<void>;
} 