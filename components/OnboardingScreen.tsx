import { Routes } from '@/constants/Routes'
import { setShowOnboarding } from '@/features/onboarding/store/onboardingSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

export const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')

  const handleEnterApp = () => {
    dispatch(setShowOnboarding(false))
    router.replace(Routes.TABS)
  }

  const handleDontShowAgain = () => {
    dispatch(setShowOnboarding(false))
    router.replace(Routes.TABS)
  }
} 