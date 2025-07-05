import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { News } from '@/feature/news/model/entities/News'
import { clearSelectedNews } from '@/feature/news/model/store/newsSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

export const NewsDetailScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const selectedNews: News | null = useAppSelector(state => state.news.selectedNews) || null


    // Theme colors
    const textColor = useThemeColor({}, 'text')
    const tintColor = useThemeColor({}, 'tint')
    const backgroundColor = useThemeColor({}, 'background')
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')
    const categoryBgColor = useThemeColor({ light: '#E3F2FD', dark: '#1A3A5F' }, 'background')
    const categoryTextColor = useThemeColor({ light: '#007AFF', dark: '#4DA6FF' }, 'tint')
    const secondaryTextColor = useThemeColor({ light: '#666666', dark: '#9BA1A6' }, 'icon')
    const contentTextColor = useThemeColor({ light: '#333333', dark: '#ECEDEE' }, 'text')

    const handleBackPress = () => {
        dispatch(clearSelectedNews())
        router.back()
    }

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={[styles.header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={24} color={tintColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={[styles.headerTitle, { color: textColor }]}>
                    {"Volver"}
                </ThemedText>
            </ThemedView>

            {/* Content */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image */}
                <Image 
                    source={{ uri: selectedNews?.image }} 
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
        padding: 8,
        marginRight: 12,
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
}) 