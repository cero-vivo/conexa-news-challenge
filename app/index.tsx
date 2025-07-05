import { Routes } from '@/constants/Routes'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function Index() {
  const { showOnboarding } = useAppSelector((state) => state.configUI)
  const router = useRouter()
  
  // Sync language with i18n
  useLanguageSync()

  useEffect(() => {
    if (showOnboarding) {
      router.push(Routes.ONBOARDING)
    } else {
      router.replace(Routes.TABS)
    }
  }, [showOnboarding, router])

  return null
} 