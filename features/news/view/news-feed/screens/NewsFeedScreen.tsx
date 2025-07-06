import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/model/store/newsSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { SearchBar } from '@/shared/components/SearchBar/SearchBar'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, Keyboard, KeyboardEvent, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NewsCard } from '../components/NewsCard'
import { useNewsFeedScreen } from '../hooks/useNewsFeedScreen'
import { useNewsSearch } from '../hooks/useNewsSearch'

export const NewsFeedScreen = () => {
    const { news, loading, loadingMore, error, loadMoreNews, hasMore, currentPage, totalItems, displayedItems } = useNewsFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    // Theme colors
    const tintColor = useThemeColor({}, 'tint');
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');
    const textColor = useThemeColor({}, 'text');

    // Animation values (reused for both keyboard and scroll)
    const headerHeight = useSharedValue(1);
    const searchBarTranslateY = useSharedValue(.5);
    const headerOpacity = useSharedValue(1);
    const searchBarScale = useSharedValue(1);

    // Logo animation values
    const logoScale = useSharedValue(1);
    const logoTranslateX = useSharedValue(0);
    const logoTranslateY = useSharedValue(0);
    const logoOpacity = useSharedValue(1);

    // Scroll tracking
    const scrollY = useSharedValue(0);
    const isScrolling = useSharedValue(false);
    const scrollDirection = useSharedValue(0); // 0: none, 1: down, -1: up

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

    // Scroll event handlers
    const handleScroll = (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const previousOffset = scrollY.value;
        
        scrollY.value = currentOffset;
        
        // Determine scroll direction
        if (currentOffset > previousOffset) {
            scrollDirection.value = 1; // Scrolling down
        } else if (currentOffset < previousOffset) {
            scrollDirection.value = -1; // Scrolling up
        }
        
        isScrolling.value = true;

        // Use existing animation values for scroll
        if (currentOffset > 10 && scrollDirection.value === 1 && isScrolling.value) {
            // Hide header when scrolling down
            headerHeight.value = withTiming(0, { duration: 300 });
            headerOpacity.value = withTiming(0, { duration: 300 });
            
            // Animate logo to center above search bar
            logoScale.value = withTiming(0.8, { duration: 300 });
            logoTranslateX.value = withTiming(0, { duration: 300 }); // Center horizontally
            logoTranslateY.value = withTiming(-30, { duration: 300 }); // Move up but not too much
            logoOpacity.value = withTiming(1, { duration: 300 });
        } else if (scrollDirection.value === -1 || currentOffset < 10) {
            // Show header when scrolling up or near top
            headerHeight.value = withTiming(1, { duration: 300 });
            headerOpacity.value = withTiming(1, { duration: 300 });
            
            // Animate logo back to original position
            logoScale.value = withTiming(1, { duration: 300 });
            logoTranslateX.value = withTiming(0, { duration: 300 });
            logoTranslateY.value = withTiming(0, { duration: 300 });
            logoOpacity.value = withTiming(1, { duration: 300 });
        }
    };

    const handleScrollBeginDrag = () => {
        isScrolling.value = true;
    };

    const handleScrollEndDrag = () => {
        isScrolling.value = false;
        // Show header when scroll stops near top
        if (scrollY.value < 50) {
            headerHeight.value = withTiming(1, { duration: 300 });
            headerOpacity.value = withTiming(1, { duration: 300 });
            
            // Animate logo back to original position
            logoScale.value = withTiming(1, { duration: 300 });
            logoTranslateX.value = withTiming(0, { duration: 300 });
            logoTranslateY.value = withTiming(0, { duration: 300 });
            logoOpacity.value = withTiming(1, { duration: 300 });
        }
    };

    const handleMomentumScrollEnd = () => {
        isScrolling.value = false;
        // Show header when momentum scroll ends near top
        if (scrollY.value < 50) {
            headerHeight.value = withTiming(1, { duration: 300 });
            headerOpacity.value = withTiming(1, { duration: 300 });
            
            // Animate logo back to original position
            logoScale.value = withTiming(1, { duration: 300 });
            logoTranslateX.value = withTiming(0, { duration: 300 });
            logoTranslateY.value = withTiming(0, { duration: 300 });
            logoOpacity.value = withTiming(1, { duration: 300 });
        }
    };

    const handleLoadMore = () => {
        console.log('🔍 handleLoadMore llamado:', { loadingMore, hasMore, loading });
        if (hasMore && !loadingMore && loading !== "loading") {
            console.log("📰 Cargando más noticias...");
            loadMoreNews();
        } else {
            console.log('🔍 No se puede cargar más:', { loadingMore, hasMore, loading });
        }
    };

    const renderFooter = () => {
        console.log('🔍 renderFooter llamado:', { hasMore, loadingMore, displayedItems, totalItems });
        
        if (!hasMore) {
            console.log('🔍 Mostrando mensaje de fin de lista');
            return (
                <ThemedView style={styles(insets).footerContainer}>
                    <ThemedText style={[styles(insets).footerText, { color: textColor }]}>
                        {t('news.endOfList')} ({displayedItems}/{totalItems})
                    </ThemedText>
                </ThemedView>
            );
        }
        
        if (loadingMore) {
            console.log('🔍 Mostrando spinner de carga');
            return (
                <ThemedView style={styles(insets).footerContainer}>
                    <ActivityIndicator size="small" color={tintColor} />
                    <ThemedText style={[styles(insets).footerText, { color: textColor, marginLeft: 8 }]}>
                        {t('news.loadingMore')}
                    </ThemedText>
                </ThemedView>
            );
        }
        
        console.log('🔍 Footer retorna null');
        return null;
    };

    // Keyboard event handlers
    const onKeyboardShow = (event: KeyboardEvent) => {
        const keyboardHeight = event.endCoordinates.height;
        const animationDuration = 250;
        
        // Animate header out (only the title and subtitle sections)
        headerHeight.value = withTiming(0, { duration: animationDuration });
        headerOpacity.value = withTiming(0, { duration: animationDuration });
        
        // Keep search bar visible but add a subtle effect
        searchBarTranslateY.value = withTiming(-5, { duration: animationDuration });
        searchBarScale.value = withTiming(1.01, { duration: animationDuration });
        
        // Animate logo to center above search bar
        logoScale.value = withTiming(0.8, { duration: animationDuration });
        logoTranslateX.value = withTiming(0, { duration: animationDuration });
        logoTranslateY.value = withTiming(-30, { duration: animationDuration });
        logoOpacity.value = withTiming(1, { duration: animationDuration });
    };

    const onKeyboardHide = () => {
        const animationDuration = 250;
        
        // Animate header back in
        headerHeight.value = withTiming(1, { duration: animationDuration });
        headerOpacity.value = withTiming(1, { duration: animationDuration });
        
        // Move search bar back to original position
        searchBarTranslateY.value = withTiming(0, { duration: animationDuration });
        searchBarScale.value = withTiming(1, { duration: animationDuration });
        
        // Animate logo back to original position
        logoScale.value = withTiming(1, { duration: animationDuration });
        logoTranslateX.value = withTiming(0, { duration: animationDuration });
        logoTranslateY.value = withTiming(0, { duration: animationDuration });
        logoOpacity.value = withTiming(1, { duration: animationDuration });
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
        };
    }, []);

    // Animated styles (reused for both keyboard and scroll)
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(headerHeight.value, [0, 1], [0, 120]), // Reduced height for more compact layout
            opacity: headerOpacity.value,
            transform: [
                {
                    translateY: interpolate(headerHeight.value, [0, 1], [-10, 0])
                }
            ]
        };
    });

    const searchBarAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: searchBarTranslateY.value },
                { scale: searchBarScale.value }
            ],
            shadowOpacity: interpolate(searchBarScale.value, [1, 1.01], [0, 0.08]),
            shadowRadius: interpolate(searchBarScale.value, [1, 1.01], [0, 6]),
            elevation: interpolate(searchBarScale.value, [1, 1.01], [0, 3]),
        };
    });

    // Logo animated style
    const logoAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: logoScale.value },
                { translateX: logoTranslateX.value },
                { translateY: logoTranslateY.value }
            ],
            opacity: logoOpacity.value,
        };
    });

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
                    <LanguageSelector compact />
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
                        contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 20  }]}
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
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 8,
        marginHorizontal: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#9BA1A6',
        fontWeight: '500',
        marginLeft: 8,
    },
});