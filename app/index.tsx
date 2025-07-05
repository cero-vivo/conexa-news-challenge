import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { Routes } from '@/constants/Routes'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setShowOnboarding } from '@/store/configUiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Index() {
  const { showOnboarding } = useAppSelector((state) => state.configUI)
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { logout } = useAuth()
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  // Theme colors
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')
  
  // Sync language with i18n
  useLanguageSync()

  useEffect(() => {
    console.log("🔄 useEffect triggered - showOnboarding:", showOnboarding, "isAuthenticated:", isAuthenticated)
    
    const handleNavigation = async () => {
      console.log("🚀 ~ handleNavigation ~ showOnboarding:", showOnboarding)
      console.log("🔐 ~ handleNavigation ~ isAuthenticated:", isAuthenticated)
      
      if (showOnboarding) {
        console.log("📱 Navigating to ONBOARDING")
        router.replace(Routes.ONBOARDING)
      } else if (!isAuthenticated) {
        console.log("🔐 Navigating to AUTH")
        router.replace(Routes.AUTH)
      } else {
        console.log("📱 Navigating to TABS")
        router.replace(Routes.TABS)
      }
    }

    handleNavigation()
  }, [showOnboarding, isAuthenticated, router])

  const handleShowOnboarding = () => {
    dispatch(setShowOnboarding(true))
  }

  const handleShowAuth = () => {
    dispatch(setShowOnboarding(false))
  }

  const handleTestLogout = () => {
    console.log("🧪 Testing logout...")
    logout()
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={tintColor} />
        <ThemedText style={[styles.title, { color: textColor }]}>
          Cargando...
        </ThemedText>
        
        {/* Debug Info */}
        <View style={styles.debugContainer}>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            showOnboarding: {showOnboarding ? 'true' : 'false'}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            isAuthenticated: {isAuthenticated ? 'true' : 'false'}
          </ThemedText>
        </View>
        
        {/* Manual Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            variant="primary"
            size="small"
            onPress={handleShowOnboarding}
            style={styles.button}
          >
            Ir a Onboarding
          </Button>
          
          <Button 
            variant="primary"
            size="small"
            onPress={handleShowAuth}
            style={styles.button}
          >
            Ir a Auth
          </Button>

          <Button 
            variant="outline"
            size="small"
            onPress={handleTestLogout}
            style={styles.button}
          >
            Test Logout
          </Button>
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  debugContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  debugText: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
  },
}) 