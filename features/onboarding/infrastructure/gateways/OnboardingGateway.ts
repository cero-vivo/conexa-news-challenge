import AsyncStorage from '@react-native-async-storage/async-storage'
import { IOnboardingGateway } from '../../model/gateways/IOnboardingGateway'

const KEY = 'show_onboarding'

export const OnboardingGateway = (): IOnboardingGateway => {
  return {
    getShowOnboarding: async () => {
      const value = await AsyncStorage.getItem(KEY)
      return value === null ? true : value === 'true'
    },
    setShowOnboarding: async (val: boolean) => {
      await AsyncStorage.setItem(KEY, val ? 'true' : 'false')
    }
  }
} 