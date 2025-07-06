import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setLanguage } from '@/store/configUiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, useColorScheme } from 'react-native'

interface LanguageSelectorProps {
  compact?: boolean
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { language } = useAppSelector((state) => state.configUI)
  const colorScheme = useColorScheme()

  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')
  const backgroundColor = useThemeColor({}, 'background')

  const isDarkMode = colorScheme === 'dark'
  const selectedTextColor = isDarkMode ? '#000000' : '#FFFFFF'

  const handleLanguageChange = (newLanguage: 'es' | 'en') => {
    dispatch(setLanguage(newLanguage))
    i18n.changeLanguage(newLanguage)
  }

  if (compact) {
    return (
      <ThemedView style={styles.compactContainer}>
        <Button
          variant={language === 'es' ? 'primary' : 'secondary'}
          size="small"
          onPress={() => handleLanguageChange('es')}
          style={styles.compactButton}
        >
          ES
        </Button>
        <Button
          variant={language === 'en' ? 'primary' : 'secondary'}
          size="small"
          onPress={() => handleLanguageChange('en')}
          style={styles.compactButton}
        >
          EN
        </Button>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoSection}>
        <Image 
          source={language === "es" ? require('../assets/images/flag_arg.png') : require('../assets/images/flag_eeuu.png')} 
          style={styles.flagImage} 
        />
      </ThemedView>
      <ThemedText type="title" style={[styles.title, { color: textColor }]}>
        {t('onboarding.language.title')}
      </ThemedText>
      <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>
        {t('onboarding.language.subtitle')}
      </ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <Button
          variant={language === 'es' ? 'primary' : 'secondary'}
          size="medium"
          onPress={() => handleLanguageChange('es')}
          style={styles.languageButton}
        >
          {t('onboarding.language.spanish')}
        </Button>

        <Button
          variant={language === 'en' ? 'primary' : 'secondary'}
          size="medium"
          onPress={() => handleLanguageChange('en')}
          style={styles.languageButton}
        >
          {t('onboarding.language.english')}
        </Button>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoSection: {
    marginBottom: 20,
  },
  flagImage: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  languageButton: {
    flex: 1,
  },
  compactContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  compactButton: {
    minWidth: 40
  },
}) 