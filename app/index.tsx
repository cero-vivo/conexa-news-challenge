import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { DEBUG_MODE } from '@/constants/Config'
import { Routes } from '@/constants/Routes'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { logout as logoutAction } from '@/features/auth/model/store/authSlice'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setShowOnboarding } from '@/store/configUiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
	const { showOnboarding } = useAppSelector((state) => state.configUI)
	const { isAuthenticated, user } = useAppSelector((state) => state.auth)
	const { login } = useAuth()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { i18n } = useTranslation()
	const insets = useSafeAreaInsets()

	// Theme colors
	const backgroundColor = useThemeColor({}, 'background')
	const textColor = useThemeColor({}, 'text')
	const tintColor = useThemeColor({}, 'tint')

	// Sync language with i18n
	useLanguageSync()

	useEffect(() => {
		console.log("🔄 useEffect ejecutándose - DEBUG_MODE:", DEBUG_MODE)

		if (DEBUG_MODE) {
			console.log("🐛 Debug mode activado")
			dispatch(setShowOnboarding(true))
			// logout() // Comentado para evitar navegación automática en debug
			console.log("🐛 Debug mode: Staying on loading screen for manual navigation")
			return // Exit early, don't navigate automatically
		}

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

	}, [])

	const handleShowOnboarding = () => {
		router.push(Routes.ONBOARDING)
	}

	const handleShowAuth = () => {
		router.push(Routes.AUTH)
	}

	const handleGoToHome = async () => {
		try {
			const result = await login('luis.espinoza.nav@outlook.com', 'MobileDev')

			if (result.success) {
				console.log("✅ DEV Login exitoso, navegando a Home")
				dispatch(setShowOnboarding(false))
				router.push(Routes.TABS)
			} else {
				console.error("❌ Error en login automático:", result.error)
			}
		} catch (error) {
			console.error("❌ Error en login automático:", error)
		}
	}

	const handleClearStorage = async () => {
		console.log("🗑️ Resetting storage...")
		console.log("📊 Estado ANTES de limpiar storage:")
		console.log("  - showOnboarding:", showOnboarding)
		console.log("  - isAuthenticated:", isAuthenticated)
		console.log("  - user:", user?.name || 'null')
		console.log("  - language:", i18n.language)

		try {
			const keys = await AsyncStorage.getAllKeys()
			console.log("📋 Keys encontradas:", keys)

			if (keys.length > 0) {
				await AsyncStorage.multiRemove(keys)
				console.log("✅ All async storage keys removed successfully")
			} else {
				console.log("ℹ️ No async storage keys found to reset")
			}

			try {
				await AsyncStorage.clear()
				console.log("✅ AsyncStorage.clear() completed successfully")
			} catch (clearError) {
				console.log("⚠️ AsyncStorage.clear() failed:", (clearError as Error).message)
			}

			console.log("✅ Storage cleared successfully");

			// Reset language to Spanish
			await i18n.changeLanguage('es')
			console.log("🌍 Idioma reseteado a español")

			// Reset auth state explicitly
			dispatch(logoutAction())
			console.log("🔐 Estado de auth reseteado")

			// Force reload by updating state
			dispatch(setShowOnboarding(true));

			console.log("📊 Estado DESPUÉS de limpiar storage:")
			console.log("  - showOnboarding: true (reseteado)")
			console.log("  - isAuthenticated: false (reseteado)")
			console.log("  - user: null (reseteado)")
			console.log("  - language: es (reseteado)")

		} catch (error) {
			console.error("❌ Error clearing storage:", error);
			// Even if there's an error, try to reset the app state
			try {
				dispatch(setShowOnboarding(true));
				console.log("🔄 App state reset attempted");
			} catch (resetError) {
				console.error("❌ Error resetting app state:", resetError);
			}
		}
	}

	return (
		<ScrollView style={{ flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor }} showsVerticalScrollIndicator={false}>
			<ThemedView style={[styles.container, { backgroundColor }]}>
				<View style={styles.content}>
					<ThemedText type='title'>DEV MODE</ThemedText>

					{/* Debug Info */}
					<View style={styles.debugContainer}>
						<ThemedText style={[styles.debugText, { color: textColor }]}>
							DEBUG_MODE: {DEBUG_MODE ? 'true' : 'false'}
						</ThemedText>
						<ThemedText style={[styles.debugText, { color: textColor }]}>
							Language: {i18n.language}
						</ThemedText>
						<ThemedText style={[styles.debugText, { color: textColor }]}>
							showOnboarding: {showOnboarding ? 'true' : 'false'}
						</ThemedText>
						<ThemedText style={[styles.debugText, { color: textColor }]}>
							isAuthenticated: {isAuthenticated ? 'true' : 'false'}
						</ThemedText>
						{isAuthenticated &&
							<ThemedText style={[styles.debugText, { color: textColor, width: "95%" }]}>
								Logged User: {JSON.stringify({ user }, null, 2)}
							</ThemedText>
						}
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
							variant="primary"
							size="small"
							onPress={handleGoToHome}
							style={styles.button}
						>
							Ir a Home
						</Button>
					</View>

					<Button
						variant="outline"
						size="small"
						onPress={handleClearStorage}
						style={[styles.button, { marginTop: 10 }]}
					>
						Clear Storage
					</Button>

					<ThemedText style={[styles.infoText, { color: textColor, paddingTop: 20 }]}>
						Para desactivar el debug mode, actualiza las variables de entorno en tu archivo .env:
					</ThemedText>
				</View>

			</ThemedView>
		</ScrollView>
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
		width: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 30,
	},
	debugContainer: {
		width: '100%',
		marginBottom: 20,
		padding: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		borderRadius: 8,
		marginTop: 20,
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
	infoText: {
		fontSize: 16,
		marginBottom: 10,
	},
	codeText: {
		fontSize: 14,
		fontFamily: 'monospace',
	},
}) 