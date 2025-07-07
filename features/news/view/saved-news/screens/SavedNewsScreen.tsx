import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Routes } from '@/constants/Routes'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/store/newsSlice'
import { NewsCard } from '@/features/news/view/news-feed/components/NewsCard'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

export const SavedNewsScreen = () => {
  const savedNews: News[] = useAppSelector((state) => state.savedNews.savedNews)
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation()

  // Theme colors
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

  // Evita doble apertura rápida
  const navigatingRef = useRef(false)

  const handleNewsPress = (newsItem: News) => {
    if (navigatingRef.current) return
    navigatingRef.current = true

    dispatch(setSelectedNews(newsItem))
    router.navigate(Routes.NEWS_DETAIL)

    setTimeout(() => {
      navigatingRef.current = false
    }, 1000)
  }

  const renderNewsItem = useMemo(() => {
    return ({ item }: { item: News }) => (
      <NewsCard news={item} onPress={handleNewsPress} />
    )
  }, [savedNews.length])

  const renderEmptyState = () => (
    <ThemedView style={styles(insets).emptyContainer}>
      <IconSymbol name="bookmark.fill" size={64} color={tintColor} style={styles(insets).emptyIcon} />
      <ThemedText style={styles(insets).emptyText}>{t('saved.empty.title')}</ThemedText>
    </ThemedView>
  )

  return (
    <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <ThemedView style={[styles(insets).header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity 
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
                <IconSymbol name="heart.fill" size={12} color="#FF6B6B" />
                <ThemedText style={styles(insets).statsText}>
                  {t('saved.count', { count: savedNews.length })}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
        
        <ThemedView style={styles(insets).subtitleContainer}>
          <IconSymbol name="star.fill" size={16} color={tintColor} />
          <ThemedText type="subtitle" style={styles(insets).subtitle}>{t('saved.subtitle')}</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles(insets).content}>
        <FlatList
          data={savedNews}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles(insets).listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
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
    marginBottom: 30,
    gap: 8,
  },
  content: {
    flexGrow: 1,
    paddingBottom: insets.bottom + 20,
  },
  listContainer: {
    paddingBottom: insets.bottom + 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#9BA1A6',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9BA1A6',
    textAlign: 'center',
  },
  titleContainer: {
    alignSelf: 'flex-start',
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
    marginTop: 4,
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
    fontWeight: 'bold',
    marginLeft: 5,
  },
})

export default SavedNewsScreen 