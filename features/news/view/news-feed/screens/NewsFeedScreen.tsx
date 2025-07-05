import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/model/store/newsSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { SearchBar } from '@/shared/components/SearchBar/SearchBar'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
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
    const { t } = useTranslation();

    // Theme colors
    const tintColor = useThemeColor({}, 'tint');
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

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
            <IconSymbol name="newspaper.fill" size={64} color={tintColor} style={styles(insets).emptyIcon} />
            <ThemedText style={styles(insets).emptyText}>
                {t('news.empty')}
            </ThemedText>
        </ThemedView>
    );

    // Render loading state
    const renderLoadingState = () => (
        <ThemedView style={styles(insets).loadingContainer}>
            <ActivityIndicator size="large" color={tintColor} />
            <ThemedText style={styles(insets).loadingText}>
                {t('news.loading')}
            </ThemedText>
        </ThemedView>
    );

    // Render error state
    const renderErrorState = () => (
        <ThemedView style={styles(insets).errorContainer}>
            <IconSymbol name="bolt.fill" size={48} color="#FF3B30" style={styles(insets).errorIcon} />
            <ThemedText style={styles(insets).errorText}>
                {t('news.error')}: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={[styles(insets).header, { borderBottomColor: borderColor }]}>
                <ThemedView style={styles(insets).headerTop}>
                    <TouchableOpacity 
                        onPress={handleDoubleTapNews}
                        activeOpacity={0.7}
                        style={styles(insets).titleContainer}
                    >
                        <ThemedView style={styles(insets).logoContainer}>
                            <Image 
                                source={require('@/assets/images/conexa_tech_logo.jpg')} 
                                style={styles(insets).logo}
                                resizeMode="contain"
                            />
                            <ThemedView style={styles(insets).titleSection}>
                                <ThemedText type="title" style={styles(insets).title}>{t('news.title')}</ThemedText>
                                <ThemedView style={styles(insets).badge}>
                                    <IconSymbol name="newspaper.fill" size={12} color="#FFFFFF" />
                                    <ThemedText style={styles(insets).badgeText}>LIVE</ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </TouchableOpacity>
                    <LanguageSelector compact />
                </ThemedView>
                
                <ThemedView style={styles(insets).subtitleContainer}>
                    <IconSymbol name="star.fill" size={16} color={tintColor} />
                    <ThemedText type="subtitle" style={styles(insets).subtitle}>{t('news.subtitle')}</ThemedText>
                </ThemedView>

                <SearchBar
                    onSearch={handleSearch}
                    onClear={handleClear}
                    placeholder={t('news.search')}
                    debounceMs={300}
                    style={styles(insets).searchBar}
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
                        contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 20  }]}
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
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        alignSelf: 'flex-start',
    },
    content: {
        flexGrow: 1,
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
        color: '#9BA1A6',
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
    errorIcon: {
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#9BA1A6',
        textAlign: 'center',
    },
    emptyIcon: {
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 8,
    },
    titleSection: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginTop: 2,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 4,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    searchBar: {
        marginTop: 10,
    },
});