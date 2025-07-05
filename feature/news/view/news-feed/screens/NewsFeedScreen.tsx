import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { News } from '@/feature/news/model/entities/News'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { NewsCard } from '../components/NewsCard'
import { useNewsFeedScreen } from '../hooks/useNewsFeedScreen'

export const NewsFeedScreen = () => {
    const { news, loading, error } = useNewsFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    // Handle news card press - navigate to news detail
    const handleNewsPress = (newsItem: News) => {
        console.log('🎯 Navigate to news detail:', newsItem.id);
        router.push(`/news-detail?newsId=${newsItem.id}`);
    };

    // Handle double tap on "News" title to scroll to top
    const handleDoubleTapNews = () => {
        console.log('🔄 Scrolling to top of news list');
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    // Render individual news item
    const renderNewsItem = useMemo(() => {
        return ({ item }: { item: News }) => (
            <NewsCard 
                news={item} 
                onPress={handleNewsPress}
            />
        );
    }, [handleNewsPress, news?.length]);

    // Render empty state when no news available
    const renderEmptyState = () => (
        <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
                No news available at the moment
            </ThemedText>
        </ThemedView>
    );

    // Render loading state
    const renderLoadingState = () => (
        <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText style={styles.loadingText}>
                Loading news...
            </ThemedText>
        </ThemedView>
    );

    // Render error state
    const renderErrorState = () => (
        <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
                Error loading news: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={styles.container}>
            {/* Header section */}
            <ThemedView style={styles.header}>
                <TouchableOpacity 
                    onPress={handleDoubleTapNews}
                    activeOpacity={0.7}
                    style={styles.titleContainer}
                >
                    <ThemedText type="title">Cx News</ThemedText>
                </TouchableOpacity>
                <ThemedText type="subtitle">Stay informed with the latest news</ThemedText>
            </ThemedView>

            {/* Content section */}
            <ThemedView style={styles.content}>
                {loading === 'loading' ? (
                    renderLoadingState()
                ) : error ? (
                    renderErrorState()
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={news}
                        renderItem={renderNewsItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 60,
        marginBottom: 30,
        gap: 8,
    },
    titleContainer: {
        alignSelf: 'flex-start',
    },
    content: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 20,
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
});