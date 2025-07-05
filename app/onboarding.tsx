import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setShowOnboarding } from '@/store/configUiSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Image, StyleSheet, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')

function OnboardingScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const textColor = useThemeColor({}, 'text')
    const tintColor = useThemeColor({}, 'tint')
    const backgroundColor = useThemeColor({}, 'background')
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark'
    
    // Use the opposite of textColor for button text to ensure contrast
    const buttonTextColor = textColor === '#000000' ? '#FFFFFF' : '#000000'

    const handleEnter = () => {
        dispatch(setShowOnboarding(false))
        router.replace(Routes.AUTH)
    }

    const handleDontShowAgain = () => {
        dispatch(setShowOnboarding(false))
        router.replace(Routes.AUTH)
    }

    const handleLogin = () => {
        dispatch(setShowOnboarding(false))
        router.replace(Routes.AUTH)
    }

    const slides = [
        {
            id: 1,
            title: '¡Bienvenido a Cx News!',
            subtitle: 'Tu fuente de información confiable',
            content: 'Descubre las últimas noticias y mantente informado con nuestra aplicación de noticias moderna y fácil de usar.',
            image: require('../assets/images/conexa_tech_logo.jpg'),
            showLogo: true,
            showProfile: false,
            icon: 'newspaper.fill'
        },
        {
            id: 2,
            title: 'Funcionalidades Principales',
            subtitle: 'Experiencia de usuario premium',
            content: '• Feed de noticias con búsqueda inteligente\n• Sistema de guardado con persistencia\n• Navegación fluida por tabs y modales\n• UI/UX moderna y responsive\n• Búsqueda por título con coincidencias parciales',
            image: null,
            showLogo: false,
            showProfile: false,
            icon: 'star.fill'
        },
        {
            id: 3,
            title: 'Tecnologías y Arquitectura',
            subtitle: 'Código mantenible y escalable',
            content: '• React Native con Expo Router\n• Redux Toolkit para gestión de estado\n• Redux Persist para persistencia de datos\n• Arquitectura modular por features\n• TypeScript para type safety\n• Navegación con expo-router',
            image: null,
            showLogo: false,
            showProfile: false,
            icon: 'wrench.and.screwdriver.fill'
        },
        {
            id: 4,
            title: '¡Hola! Soy Luis Espinoza',
            subtitle: 'React Native Developer',
            content: 'Estoy emocionado por la oportunidad de unirme al equipo de Conexa y contribuir con mi experiencia en desarrollo móvil nativo.',
            image: null,
            showLogo: false,
            showProfile: true,
            icon: 'heart.fill'
        }
    ]

    return (
        <ThemedView style={[styles.container, { backgroundColor }]}>
            <Swiper
                index={currentIndex}
                horizontal={true}
                loop={false}
                showsButtons={false}
                showsPagination={true}
                dotColor={textColor}
                bounces={false}
                onIndexChanged={(index: number) => setCurrentIndex(index)}
                autoplay={false}
                dotStyle={[styles.dot, {bottom: insets.bottom }]}
                activeDotStyle={[styles.activeDot, {bottom: insets.bottom }]}
                pagingEnabled={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                {/* Slide 0: Language Selection */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { 
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 40
                    }]}>
                        <LanguageSelector />
                    </ThemedView>
                </ThemedView>

                {/* Slide 1: Bienvenida */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { 
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 40
                    }]}>
                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.logoSection}>
                                <Image source={require('../assets/images/conexa_tech_logo.jpg')} style={styles.logoImage} />
                            </ThemedView>
                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                {t('onboarding.welcome.title')}
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                {t('onboarding.welcome.subtitle')}
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                {t('onboarding.welcome.description')}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 2: Funcionalidades */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { 
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 40
                    }]}>
                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.iconSection}>
                                <IconSymbol name="star.fill" size={80} color={tintColor} />
                            </ThemedView>

                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                {t('onboarding.features.title')}
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                {t('onboarding.features.subtitle')}
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                {t('onboarding.features.description')}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 3: Tecnologías */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { 
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 40
                    }]}>
                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.iconSection}>
                                <IconSymbol name="wrench.and.screwdriver.fill" size={80} color={tintColor} />
                            </ThemedView>

                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                {t('onboarding.technologies.title')}
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                {t('onboarding.technologies.subtitle')}
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                {t('onboarding.technologies.description')}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 4: Presentación Personal */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { 
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 40
                    }]}>
                        <ThemedView style={styles.profileSection}>
                            <Image source={require('../assets/images/me.jpeg')} style={styles.profileImage} />
                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                {t('onboarding.profile.title')}
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                {t('onboarding.profile.subtitle')}
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                {t('onboarding.profile.description')}
                            </ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.buttonSection}>
                            <Button
                                variant="primary"
                                size="large"
                                onPress={handleEnter}
                            >
                                {t('onboarding.buttons.enter')}
                            </Button>

                            <Button
                                variant="secondary"
                                size="medium"
                                onPress={handleDontShowAgain}
                            >
                                {t('onboarding.buttons.dontShowAgain')}
                            </Button>

                            <Button
                                variant="outline"
                                size="medium"
                                onPress={handleLogin}
                            >
                                {t('onboarding.buttons.login')}
                            </Button>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </Swiper>
        </ThemedView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideContent: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoSection: {
        marginBottom: 20
    },
    logoImage: {
        width: 200,
        height: 100,
        borderRadius: 12,
        marginBottom: 16,
    },
    profileSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
        objectFit: 'contain',
        backgroundColor: "#DBEAFE"
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        opacity: 0.8,
    },
    contentSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    slideTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    slideSubtitle: {
        fontSize: 20,
        marginBottom: 24,
        textAlign: 'center',
        opacity: 0.8,
    },
    slideDescription: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        maxWidth: width * 0.8,
        marginBottom: 20,
    },
    buttonSection: {
        gap: 16,
        marginTop: 20,
    },
    dot: {
        width: 24,
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
    },
    iconSection: {
        marginBottom: 40,
    },
}) 