export interface IOnboardingScreen {
  setShowOnboardingComplete?: () => void
}

export interface IOnboardingPresenter {
  completeOnboarding: () => Promise<void>
  loadFlag: () => Promise<void>
} 