import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useNewsDetailScreen } from '../hooks/useNewsDetailScreen'

export const NewsDetailScreen = () => {
    const router = useRouter()
    const { newsId } = useLocalSearchParams<{ newsId: string }>()
    const { news, loading, error, refetch } = useNewsDetailScreen({ 
        newsId: newsId || '' 
    })

    const handleBackPress = () => {
        router.back()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <ThemedText style={styles.loadingText}>
                    Cargando noticia...
                </ThemedText>
            </ThemedView>
        )
    }

    if (error || !news) {
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>
                    Error al cargar la noticia: {error || 'Noticia no encontrada'}
                </ThemedText>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                    <ThemedText style={styles.retryButtonText}>Reintentar</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={24} color="#007AFF" />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={styles.headerTitle}>
                    Detalle de Noticia
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
                    source={{ uri: news.image }} 
                    style={styles.newsImage}
                    resizeMode="cover"
                />

                {/* News Info */}
                <ThemedView style={styles.newsInfo}>
                    <ThemedText type="title" style={styles.newsTitle}>
                        {news.title}
                    </ThemedText>
                    
                    <ThemedView style={styles.metaInfo}>
                        <ThemedText style={styles.category}>
                            {news.category}
                        </ThemedText>
                        <ThemedText style={styles.date}>
                            {formatDate(news.publishedAt)}
                        </ThemedText>
                    </ThemedView>

                    {/* Content */}
                    <ThemedText style={styles.content}>
                        {news.content}
                    </ThemedText>

                    {/* Additional content for better UX */}
                    <ThemedText style={styles.additionalContent}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </ThemedText>
                    
                    <ThemedText style={styles.additionalContent}>
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
        borderBottomColor: '#E5E5E7',
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
        borderBottomColor: '#E5E5E7',
    },
    category: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    date: {
        fontSize: 14,
        color: '#666666',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        color: '#333333',
    },
    additionalContent: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: '#666666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#666666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
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