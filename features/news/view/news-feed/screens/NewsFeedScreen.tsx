import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Routes } from '@/constants/Routes'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/store/newsSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { SearchBar } from '@/shared/components/SearchBar/SearchBar'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NewsCard } from '../components/NewsCard'
import { useNewsFeedAnimations } from '../hooks/useNewsFeedAnimations'
import { useNewsFeedScreen } from '../hooks/useNewsFeedScreen'
import { useNewsPagination } from '../hooks/useNewsPagination'
import { useNewsSearch } from '../hooks/useNewsSearch'

export const NewsFeedScreen = () => {
    const { news, loading, loadingMore, error, loadMoreNews, hasMore } = useNewsFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    // Theme colors
    const tintColor = useThemeColor({}, 'tint');

    // Hook de animaciones y scroll
    const { headerAnimatedStyle,searchBarAnimatedStyle,logoAnimatedStyle,handleScroll,handleScrollBeginDrag,handleScrollEndDrag,handleMomentumScrollEnd} = useNewsFeedAnimations();

    const { filteredNews, handleSearch, handleClear } = useNewsSearch(news);

    // Previene apertura duplicada por doble tap rápido خاصة en Android
    const navigatingRef = useRef(false);

    const handleNewsPress = (newsItem: News) => {
        if (navigatingRef.current) return;
        navigatingRef.current = true;

        dispatch(setSelectedNews(newsItem))
        router.navigate(Routes.NEWS_DETAIL)

        // Restablecer bandera tras breve lapso
        setTimeout(() => {
            navigatingRef.current = false;
        }, 600);
    };

    const handleDoubleTapNews = () => flatListRef.current?.scrollToOffset({ offset: 0, animated: true })

    // Hook de paginación (load more + footer)
    const { handleLoadMore, renderFooter } = useNewsPagination({hasMore,loadingMore,loading,loadMoreNews,insets});

    // La lógica de teclado y suscripciones vive ahora en el hook de animaciones

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
            <IconSymbol name="bolt.fill" size={48} color="#FF3B30" />
            <ThemedText style={styles(insets).errorText}>
                {t('news.error')}: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Animated Header section (only title and subtitle) */}
            <Animated.View style={[styles(insets).header, headerAnimatedStyle]}>
                <ThemedView style={styles(insets).headerTop}>
                    <TouchableOpacity
                        onPress={handleDoubleTapNews}
                        activeOpacity={0.7}
                        style={styles(insets).titleContainer}
                    >
                        <ThemedView style={styles(insets).logoContainer}>
                            <Animated.Image
                                source={require('@/assets/images/conexa_tech_logo.jpg')}
                                style={[styles(insets).logo, logoAnimatedStyle]}
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
                    <ThemedView style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                        <LanguageSelector compact />
                        <ThemeToggle />
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles(insets).subtitleContainer}>
                    <IconSymbol name="star.fill" size={16} color={tintColor} />
                    <ThemedText type="subtitle" style={styles(insets).subtitle}>{t('news.subtitle')}</ThemedText>
                </ThemedView>
            </Animated.View>

            {/* Search Bar - Always visible */}
            <Animated.View style={[styles(insets).searchBarContainer, searchBarAnimatedStyle]}>
                <SearchBar
                    onSearch={handleSearch}
                    onClear={handleClear}
                    placeholder={t('news.search')}
                    debounceMs={300}
                />
            </Animated.View>

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
                        contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 120 }]}
                        ListEmptyComponent={renderEmptyState}
                        ListFooterComponent={renderFooter}
                        onScroll={handleScroll}
                        onScrollBeginDrag={handleScrollBeginDrag}
                        onScrollEndDrag={handleScrollEndDrag}
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                        scrollEventThrottle={16}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
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
        gap: 20,
        overflow: 'hidden',
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
        paddingBottom: insets.bottom + 20,
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
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
    },
    titleSection: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22,
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
    searchBarContainer: {
        marginBottom: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
});