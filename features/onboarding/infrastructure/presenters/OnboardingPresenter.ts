import { IOnboardingActions } from '../../model/actions/OnboardingActions'
import { IOnboardingPresenter, IOnboardingScreen } from '../../model/presenter/IOnboardingPresenter'

export const OnboardingPresenter = (actions: IOnboardingActions, screen: IOnboardingScreen): IOnboardingPresenter => {
  return {
    completeOnboarding: async () => {
      await actions.setShowOnboarding(false)
      screen.setShowOnboardingComplete?.()
    },
    loadFlag: async () => {
      const flag = await actions.getShowOnboarding()
      if (!flag) {
        screen.setShowOnboardingComplete?.()
      }
    }
  }
} 