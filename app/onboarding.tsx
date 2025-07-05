import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useThemeColor } from '@/hooks/useThemeColor'
import { setShowOnboarding } from '@/store/configUiSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')

function OnboardingScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useAppDispatch()

    const textColor = useThemeColor({}, 'text')
    const tintColor = useThemeColor({}, 'tint')
    const backgroundColor = useThemeColor({}, 'background')
    const isDark = useColorScheme() === 'dark'

    const handleEnter = () => {
        dispatch(setShowOnboarding(true))
        router.replace('/(tabs)')
    }

    const handleDontShowAgain = () => {
        dispatch(setShowOnboarding(false))
        router.replace('/(tabs)')
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
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                pagingEnabled={true}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                {/* Slide 1: Bienvenida */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { paddingTop: insets.top + 40 }]}>

                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.logoSection}>
                                <Image source={require('../assets/images/conexa_tech_logo.jpg')} style={styles.logoImage} />
                            </ThemedView>
                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                ¡Bienvenido a Cx News!
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                Tu fuente de información confiable
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                Descubre las últimas noticias y mantente informado con nuestra aplicación de noticias moderna y fácil de usar.
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 2: Funcionalidades */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { paddingTop: insets.top + 40 }]}>
                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.iconSection}>
                                <IconSymbol name="star.fill" size={80} color={tintColor} />
                            </ThemedView>

                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                Funcionalidades Principales
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                Experiencia de usuario premium
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                • Feed de noticias con búsqueda inteligente{'\n'}
                                • Sistema de guardado con persistencia{'\n'}
                                • Navegación fluida por tabs y modales{'\n'}
                                • UI/UX moderna y responsive{'\n'}
                                • Búsqueda por título con coincidencias parciales
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 3: Tecnologías */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { paddingTop: insets.top + 40 }]}>
                        <ThemedView style={styles.contentSection}>
                            <ThemedView style={styles.iconSection}>
                                <IconSymbol name="wrench.and.screwdriver.fill" size={80} color={tintColor} />
                            </ThemedView>

                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                Tecnologías y Arquitectura
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                Código mantenible y escalable
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                • React Native con Expo Router{'\n'}
                                • Redux Toolkit para gestión de estado{'\n'}
                                • Redux Persist para persistencia de datos{'\n'}
                                • Arquitectura modular por features{'\n'}
                                • TypeScript para type safety{'\n'}
                                • Navegación con expo-router
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                {/* Slide 4: Presentación Personal */}
                <ThemedView style={[styles.slide, { backgroundColor }]}>
                    <ThemedView style={[styles.slideContent, { paddingTop: insets.top  }]}>
                        <ThemedView style={styles.profileSection}>
                            <Image source={require('../assets/images/me.jpeg')} style={styles.profileImage} />
                            <ThemedText type="title" style={[styles.slideTitle, { color: textColor }]}>
                                ¡Hola! Soy Luis Espinoza
                            </ThemedText>

                            <ThemedText style={[styles.slideSubtitle, { color: textColor }]}>
                                React Native Developer
                            </ThemedText>

                            <ThemedText style={[styles.slideDescription, { color: textColor }]}>
                                Estoy emocionado por la oportunidad de unirme al equipo de Conexa y contribuir con mi experiencia en desarrollo móvil.
                            </ThemedText>
                        </ThemedView>

                        <ThemedView style={styles.buttonSection}>
                            <TouchableOpacity
                                style={[styles.primaryButton, { 
                                    backgroundColor: isDark ? '#FFFFFF' : tintColor,
                                }]}
                                onPress={handleEnter}
                                activeOpacity={0.8}
                            >
                                <ThemedText style={[styles.primaryButtonText, { 
                                    color: isDark ? '#000000' : '#FFFFFF' 
                                }]}>
                                    Entrar
                                </ThemedText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={handleDontShowAgain}
                                activeOpacity={0.8}
                            >
                                <ThemedText style={[styles.secondaryButtonText, { color: textColor }]}>
                                    No mostrar más
                                </ThemedText>
                            </TouchableOpacity>
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
    primaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        opacity: 0.7,
    },
    dot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        bottom: -4,
    },
    activeDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        bottom: -4,
    },
    iconSection: {
        marginBottom: 40,
    },
}) 