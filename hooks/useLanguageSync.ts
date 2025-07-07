import { useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguageSync = () => {
  const { language } = useAppSelector((state) => state.configUI)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [])

  return { language }
} 