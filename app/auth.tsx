import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setShowOnboarding } from '@/store/configUiSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const { login, register, loginAnonymous, loading, error, clearError, isAuthenticated, user } = useAuth()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')
  const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
      clearError()
    }
  }, [error, clearError])

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos')
      return
    }

    if (!isLogin && !name) {
      Alert.alert('Error', 'Por favor ingresa tu nombre')
      return
    }

    const result = isLogin 
      ? await login(email, password)
      : await register(email, password, name)

    if (result.success) {
      router.replace(Routes.TABS)
    }
  }

  const handleAnonymousLogin = async () => {
    const result = await loginAnonymous()
    if (result.success) {
      router.replace(Routes.TABS)
    }
  }

  const handleShowOnboarding = () => {
    dispatch(setShowOnboarding(true))
    router.replace(Routes.ONBOARDING)
  }

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingBottom: insets.bottom + 20,
            minHeight: '100%'
          }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Language Selector */}
        <ThemedView style={[styles.languageContainer, { paddingTop: insets.top + 20 }]}>
          <LanguageSelector compact />
        </ThemedView>

        <ThemedView style={[styles.header, { paddingTop: 20 }]}>
          <IconSymbol name="person.circle.fill" size={80} color={tintColor} />
          <ThemedText type="subtitle" style={[styles.title, { color: textColor }]}>
            {isLogin ? t('auth.login.title') : t('auth.register.title')}
          </ThemedText>
          <ThemedText type="subtitle" style={[styles.subtitle, { color: textColor }]}>
            {isLogin ? t('auth.login.subtitle') : t('auth.register.subtitle')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          {!isLogin && (
            <TextInput
              style={[styles.input, { 
                color: textColor, 
                borderColor,
                backgroundColor: backgroundColor 
              }]}
              placeholder={t('auth.register.name')}
              placeholderTextColor="#9BA1A6"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}
          
          <TextInput
            style={[styles.input, { 
              color: textColor, 
              borderColor,
              backgroundColor: backgroundColor 
            }]}
            placeholder={t('auth.email')}
            placeholderTextColor="#9BA1A6"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input, { 
              color: textColor, 
              borderColor,
              backgroundColor: backgroundColor 
            }]}
            placeholder={t('auth.password')}
            placeholderTextColor="#9BA1A6"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            onPress={handleSubmit}
            disabled={loading === 'loading'}
            variant="primary"
            style={styles.submitButton}
          >
            {loading === 'loading' ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
                {t('common.loading')}
              </>
            ) : (
              isLogin ? t('auth.login.button') : t('auth.register.button')
            )}
          </Button>

          <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setIsLogin(!isLogin)}
            disabled={loading === 'loading'}
          >
            <ThemedText style={[styles.toggleText, { color: tintColor }]}>
              {isLogin ? t('auth.register.link') : t('auth.login.link')}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.divider}>
            <ThemedView style={[styles.dividerLine, { backgroundColor: borderColor }]} />
            <ThemedText style={[styles.dividerText, { color: textColor }]}>
              {t('auth.or')}
            </ThemedText>
            <ThemedView style={[styles.dividerLine, { backgroundColor: borderColor }]} />
          </ThemedView>

          <Button
            onPress={handleAnonymousLogin}
            disabled={loading === 'loading'}
            variant="outline"
            style={styles.anonymousButton}
          >
            {t('auth.anonymous.button')}
          </Button>

          <Button
            onPress={handleShowOnboarding}
            disabled={loading === 'loading'}
            variant="secondary"
            style={styles.onboardingButton}
          >
            {t('auth.onboarding.button')}
          </Button>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  languageContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 20,
  },
  loader: {
    marginRight: 8,
  },
  toggleButton: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.7,
  },
  anonymousButton: {
    marginBottom: 12,
  },
  onboardingButton: {
    marginBottom: 20,
  },
}) 