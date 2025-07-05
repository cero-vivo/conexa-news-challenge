import { IOnboardingActions, OnboardingActions } from '../../model/actions/OnboardingActions'
import { IOnboardingGateway } from '../../model/gateways/IOnboardingGateway'
import { IOnboardingPresenter, IOnboardingScreen } from '../../model/presenter/IOnboardingPresenter'

export const OnboardingPresenter = (gateway: IOnboardingGateway, screen: IOnboardingScreen): IOnboardingPresenter => {
  const actions: IOnboardingActions = OnboardingActions(gateway)

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