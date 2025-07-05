import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguageSync = () => {
  const { language } = useAppSelector((state) => state.configUI)
  const { i18n } = useTranslation()

  useEffect(() => {
    // Sync language on mount and when language changes
    if (i18n.language !== language) {
      console.log('Syncing language:', language)
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  // Also sync on mount
  useEffect(() => {
    console.log('Initial language sync:', language)
    i18n.changeLanguage(language)
  }, []) // Empty dependency array means it runs only on mount

  return { language }
} 