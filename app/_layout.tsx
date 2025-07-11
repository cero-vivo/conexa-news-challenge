import { persistor, store } from '@/store'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { LogBox, Platform } from 'react-native'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/constants/i18n'
import { configureNotifications } from '@/constants/Notifications'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useLanguageSync } from '@/hooks/useLanguageSync'

// Ignorar advertencia de expo-notifications en Expo Go para Android SDK 53
LogBox.ignoreLogs([
	'expo-notifications: Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go',
])

function AppContent() {
	const colorScheme = useColorScheme()
	const [loaded] = useFonts({SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),})

	// Sincronizar idioma globalmente
	useLanguageSync()

	useEffect(() => {
		configureNotifications()

		// Sin listener de salida; las notificaciones se programan desde Index
		return () => {}
	}, [])

	if (!loaded) {
		return null
	}

	return (
		<SafeAreaProvider>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="onboarding" options={{ headerShown: false }} />
					<Stack.Screen name="auth" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="news-detail"
						options={{
							headerShown: false,
							presentation: Platform.OS === 'ios' ? 'modal' : 'card',
							animation: Platform.OS === 'ios' ? 'slide_from_bottom' : 'slide_from_right',
							gestureEnabled: true,
							gestureDirection: Platform.OS === 'ios' ? 'vertical' : 'horizontal',
						}}
					/>
					<Stack.Screen
						name="user-detail"
						options={{
							headerShown: false,
							presentation: Platform.OS === 'ios' ? 'modal' : 'card',
							animation: Platform.OS === 'ios' ? 'slide_from_bottom' : 'slide_from_right',
							gestureEnabled: true,
							gestureDirection: Platform.OS === 'ios' ? 'vertical' : 'horizontal',
						}}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</SafeAreaProvider>
	)
}

export default function RootLayout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppContent />
			</PersistGate>
		</Provider>
	)
}
