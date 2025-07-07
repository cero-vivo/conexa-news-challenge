import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { News } from '@/features/news/model/entities/News'
import { clearSelectedNews } from '@/features/news/store/newsSlice'
import { toggleSaveNews } from '@/features/news/store/savedNewsSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Image, Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const NewsDetailScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const selectedNews: News | null = useAppSelector(state => state.news.selectedNews) || null
    const savedNews = useAppSelector(state => state.savedNews.savedNews)
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)
    const isSaved = selectedNews ? savedNews.some(item => item.id === selectedNews.id) : false
    const insets = useSafeAreaInsets()
    const { t } = useTranslation()

    // Theme colors
    const textColor = useThemeColor({}, 'text')
    const tintColor = useThemeColor({}, 'tint')
    const backgroundColor = useThemeColor({}, 'background')
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')
    const categoryBgColor = useThemeColor({ light: '#E3F2FD', dark: '#1A3A5F' }, 'background')
    const categoryTextColor = useThemeColor({ light: '#007AFF', dark: '#4DA6FF' }, 'tint')
    const secondaryTextColor = useThemeColor({ light: '#666666', dark: '#B0B7C3' }, 'icon')
    const contentTextColor = useThemeColor({ light: '#333333', dark: '#ECEDEE' }, 'text')

    // Check if user can save news (authenticated and not anonymous)
    const canSaveNews = isAuthenticated && user && !user.isAnonymous;

    const handleBackPress = () => {
        dispatch(clearSelectedNews())
        router.back()
    }

    const handleToggleSave = () => {
        if (!canSaveNews) {
            Alert.alert(
                t('auth.required.title'),
                t('auth.required.message'),
                [
                    { text: t('auth.required.cancel'), style: 'cancel' },
                    { text: t('auth.required.login'), onPress: () => {
                        router.dismissAll()
                        router.replace(Routes.AUTH);
                    }}
                ]
            );
            return;
        }
        
        if (selectedNews) {
            dispatch(toggleSaveNews(selectedNews));
        }
    }

    useEffect(() => {
        return () => {
            dispatch(clearSelectedNews())
        }
    }, [])

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={[styles.header, { borderBottomColor: borderColor, paddingTop:  Platform.OS === "ios" ? 20 : insets.top+10 }]}>
                <TouchableOpacity 
                    style={[styles.backButton, { backgroundColor: backgroundColor }]} 
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={24} color={tintColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={[styles.headerTitle, { color: textColor }]}>
                    {t('news.back')}
                </ThemedText>

                {/* Bookmark toggle */}
                <TouchableOpacity
                    onPress={handleToggleSave}
                    style={[styles.saveButton, { backgroundColor: backgroundColor }]}
                    activeOpacity={0.7}
                >
                    <IconSymbol name={isSaved ? 'bookmark.fill' : 'bookmark'} size={24} color={tintColor} />
                </TouchableOpacity>
            </ThemedView>

            {/* Content */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
            >
                {/* Image */}
                <Image 
                    source={{ uri: `https://picsum.photos/200/300?random=${selectedNews?.id}` }} 
                    style={styles.newsImage}
                    resizeMode="cover"
                />

                {/* News Info */}
                <ThemedView style={styles.newsInfo}>
                    <ThemedText type="title" style={[styles.newsTitle, { color: textColor }]}>
                        {selectedNews?.title}
                    </ThemedText>
                    
                    <ThemedView style={[styles.metaInfo, { borderBottomColor: borderColor }]}>
                        <ThemedText style={[styles.category, { 
                            backgroundColor: categoryBgColor, 
                            color: categoryTextColor 
                        }]}>
                            {selectedNews?.category}
                        </ThemedText>
                        <ThemedText style={[styles.date, { color: secondaryTextColor }]}>
                            {selectedNews?.publishedAt || ''}
                        </ThemedText>
                    </ThemedView>

                    {/* Content */}
                    <ThemedText style={[styles.content, { color: contentTextColor }]}>
                        {selectedNews?.content}
                    </ThemedText>

                    {/* Additional content for better UX */}
                    <ThemedText style={[styles.additionalContent, { color: secondaryTextColor }]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </ThemedText>
                    
                    <ThemedText style={[styles.additionalContent, { color: secondaryTextColor }]}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 12,
        marginRight: 12,
        borderRadius: 8,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    newsImage: {
        width: '100%',
        height: 250,
    },
    newsInfo: {
        padding: 20,
    },
    newsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        lineHeight: 32,
    },
    metaInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    date: {
        fontSize: 14,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    additionalContent: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        padding: 12,
        borderRadius: 8,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
}) 