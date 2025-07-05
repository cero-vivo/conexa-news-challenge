import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/model/store/newsSlice'
import { SearchBar } from '@/shared/components/SearchBar/SearchBar'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NewsCard } from '../components/NewsCard'
import { useNewsFeedScreen } from '../hooks/useNewsFeedScreen'
import { useNewsSearch } from '../hooks/useNewsSearch'

export const NewsFeedScreen = () => {
    const { news, loading, error } = useNewsFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

    const { filteredNews, handleSearch, handleClear } = useNewsSearch(news);

    const handleNewsPress = (newsItem: News) => {
        dispatch(setSelectedNews(newsItem));
        router.push(`/news-detail`);
    };

    const handleDoubleTapNews = () => flatListRef.current?.scrollToOffset({ offset: 0, animated: true })

    const renderNewsItem = useMemo(() => {
        return ({ item }: { item: News }) => (
            <NewsCard 
                news={item} 
                onPress={handleNewsPress}
            />
        );
    }, [handleNewsPress, news?.length]);

    const renderEmptyState = () => (
        <ThemedView style={styles(insets).emptyContainer}>
            <ThemedText style={styles(insets).emptyText}>
                No news available at the moment
            </ThemedText>
        </ThemedView>
    );

    // Render loading state
    const renderLoadingState = () => (
        <ThemedView style={styles(insets).loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText style={styles(insets).loadingText}>
                Loading news...
            </ThemedText>
        </ThemedView>
    );

    // Render error state
    const renderErrorState = () => (
        <ThemedView style={styles(insets).errorContainer}>
            <ThemedText style={styles(insets).errorText}>
                Error loading news: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={styles(insets).header}>
                <TouchableOpacity 
                    onPress={handleDoubleTapNews}
                    activeOpacity={0.7}
                    style={styles(insets).titleContainer}
                >
                    <ThemedText type="title">Cx News</ThemedText>
                </TouchableOpacity>
                <ThemedText type="subtitle">Stay informed with the latest news</ThemedText>

                <SearchBar
                    onSearch={handleSearch}
                    onClear={handleClear}
                    placeholder="Buscar noticias..."
                    debounceMs={300}
                    style={{marginTop: 10}}
                />
            </ThemedView>

            {/* Content section */}
            <ThemedView style={styles(insets).content}>
                {loading === 'loading' ? (
                    renderLoadingState()
                ) : loading === 'error' ? (
                    renderErrorState()
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={filteredNews}
                        renderItem={renderNewsItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 20 }]}
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </ThemedView>
        </ThemedView>
    )
}

const styles = (insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: insets.top,
        gap: 8,
        marginBottom: 15,
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