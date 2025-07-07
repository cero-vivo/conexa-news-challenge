import AsyncStorage from '@react-native-async-storage/async-storage'
import { IOnboardingGateway } from '../../model/gateways/IOnboardingGateway'

const STORAGE_KEY = 'show_onboarding'

export const OnboardingGateway = (): IOnboardingGateway => {
  return {
    getShowOnboarding: async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      return value !== null ? JSON.parse(value) as boolean : true
    },
    setShowOnboarding: async (val: boolean) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  }
} 