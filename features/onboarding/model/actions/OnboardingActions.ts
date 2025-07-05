import { IOnboardingGateway } from '../gateways/IOnboardingGateway'

export interface IOnboardingActions {
  getShowOnboarding: () => Promise<boolean>
  setShowOnboarding: (value: boolean) => Promise<void>
}

export const OnboardingActions = (gateway: IOnboardingGateway): IOnboardingActions => {
  return {
    getShowOnboarding: () => gateway.getShowOnboarding(),
    setShowOnboarding: (value) => gateway.setShowOnboarding(value),
  }
} 