import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/model/store/newsSlice'
import { NewsCard } from '@/features/news/view/news-feed/components/NewsCard'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SavedNewsScreen() {
    const savedNews: News[] = useAppSelector((state) => state.savedNews.savedNews);
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    // Theme colors
    const tintColor = useThemeColor({}, 'tint');
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

    const handleNewsPress = (newsItem: News) => {
        dispatch(setSelectedNews(newsItem));
        router.push(Routes.NEWS_DETAIL);
    };

    const handleDoubleTapSaved = () => flatListRef.current?.scrollToOffset({ offset: 0, animated: true })

    const renderNewsItem = ({ item }: { item: News }) => (
        <NewsCard 
            news={item} 
            onPress={() => handleNewsPress(item)}
        />
    );

    const renderEmptyState = () => (
        <ThemedView style={styles(insets).emptyContainer}>
            <IconSymbol name="bookmark" size={64} color={tintColor} style={styles(insets).emptyIcon} />
            <ThemedText style={styles(insets).emptyText}>
                {t('saved.empty.title')}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={[styles(insets).header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity 
                    onPress={handleDoubleTapSaved}
                    activeOpacity={0.7}
                    style={styles(insets).titleContainer}
                >
                    <ThemedView style={styles(insets).headerContent}>
                        <ThemedView style={styles(insets).iconContainer}>
                            <IconSymbol name="bookmark.fill" size={32} color={tintColor} />
                        </ThemedView>
                        <ThemedView style={styles(insets).titleSection}>
                            <ThemedText type="title" style={styles(insets).title}>{t('saved.title')}</ThemedText>
                            <ThemedView style={styles(insets).statsContainer}>
                                <IconSymbol name="star.fill" size={12} color="#FFD700" />
                                <ThemedText style={styles(insets).statsText}>
                                    {t('saved.count', { count: savedNews.length })}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </TouchableOpacity>
                
                <ThemedView style={styles(insets).subtitleContainer}>
                    <IconSymbol name="heart.fill" size={16} color={tintColor} />
                    <ThemedText type="subtitle" style={styles(insets).subtitle}>{t('saved.subtitle')}</ThemedText>
                </ThemedView>
            </ThemedView>

            {/* Content section */}
            <ThemedView style={styles(insets).content}>
                <FlatList
                    ref={flatListRef}
                    data={savedNews}
                    renderItem={renderNewsItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 20 }]}
                    ListEmptyComponent={renderEmptyState}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = (insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: insets.top,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#9BA1A6',
        textAlign: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
    },
    titleSection: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontSize: 12,
        color: '#9BA1A6',
        marginLeft: 4,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#9BA1A6',
        marginLeft: 4,
    },
}); 