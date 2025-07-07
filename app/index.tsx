import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { DEBUG_MODE } from '@/constants/Config'
import { Routes } from '@/constants/Routes'
import { logout } from '@/features/auth/store/authSlice'
import { useAuth } from '@/features/auth/view/hooks/useAuth'
import { createNotificationsGateway } from '@/features/notifications/infrastructure/gateways/NotificationsGateway'
import { createNotificationsPresenter } from '@/features/notifications/infrastructure/presenters/NotificationsPresenter'
import { useLanguageSync } from '@/hooks/useLanguageSync'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useThemeToggle } from '@/hooks/useThemeToggle'
import { useAppDispatch, useAppSelector } from '@/store'
import { persistShowOnboarding } from '@/store/configUiSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth)
	const showOnboarding = useAppSelector(state=>state.configUI.showOnboarding)
	console.log("🚀 ~ Index ~ showOnboarding:", showOnboarding)
	const { login } = useAuth()
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { i18n } = useTranslation()
	const insets = useSafeAreaInsets()

	// Theme colors
	const backgroundColor = useThemeColor({}, 'background')
	const textColor = useThemeColor({}, 'text')
	const { isDark } = useThemeToggle()

	// Sync language with i18n
	useLanguageSync()

	// Programar notificación de bienvenida al montar Index
	useEffect(() => {
		const gateway = createNotificationsGateway()
		const presenter = createNotificationsPresenter(gateway)
		presenter.scheduleWelcomeNotifications().catch(console.error)
	}, [])

	useEffect(()=>{
		const init=async()=>{
			const value=await AsyncStorage.getItem('show_onboarding')
			dispatch(persistShowOnboarding(value!==null?JSON.parse(value):true))
		}
		init()
	}, [dispatch])

	useEffect(() => {
		if (DEBUG_MODE) return
		if (showOnboarding) {
			router.replace(Routes.ONBOARDING)
		} else if (!isAuthenticated) {
			router.replace(Routes.AUTH)
		} else {
			router.replace(Routes.TABS)
		}
	}, [showOnboarding, isAuthenticated])

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
				router.push(Routes.TABS)
			} else {
				console.error("❌ Error en login automático:", result.error)
			}
		} catch (error) {
			console.error("❌ Error en login automático:", error)
		}
	}

	const handleClearStorage = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys()
			if (keys.length > 0) {
				await AsyncStorage.multiRemove(keys)
			}

			try {
				await AsyncStorage.clear()
			} catch (clearError) {
				console.log("⚠️ AsyncStorage.clear() failed:", (clearError as Error).message)
			}

			// Reset language to Spanish and store state
			await i18n.changeLanguage('es')
			// Force reload by updating state
			dispatch(persistShowOnboarding(true))

			// Reset auth state explicitly
			dispatch(logout())

		} catch (error) {
			console.error("❌ Error clearing storage:", error)
			// Even if there's an error, try to reset the app state
			try {
				dispatch(persistShowOnboarding(true))
			} catch (resetError) {
				console.error("❌ Error resetting app state:", resetError)
			}
		}
	}

	return (
		<ScrollView style={{ flexGrow: 1, paddingTop: insets.top, backgroundColor }} showsVerticalScrollIndicator={false}>
			<ThemedView style={[styles.container, { backgroundColor, paddingBottom: insets.bottom + 20 }]}>
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
							Theme: {isDark ? "Dark" : "Light"}
						</ThemedText>
						<ThemedText style={[styles.debugText, { color: textColor }]}>
							showOnboarding: {Boolean(showOnboarding).toString()}
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