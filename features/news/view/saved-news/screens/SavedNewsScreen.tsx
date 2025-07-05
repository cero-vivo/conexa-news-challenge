import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { News } from '@/features/news/model/entities/News'
import { setSelectedNews } from '@/features/news/model/store/newsSlice'
import { NewsCard } from '@/features/news/view/news-feed/components/NewsCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

export const SavedNewsScreen = () => {
  const savedNews: News[] = useAppSelector((state) => state.savedNews.savedNews)
  const insets = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleNewsPress = (newsItem: News) => {
    dispatch(setSelectedNews(newsItem))
    router.push('/news-detail')
  }

  const renderNewsItem = useMemo(() => {
    return ({ item }: { item: News }) => (
      <NewsCard news={item} onPress={handleNewsPress} />
    )
  }, [savedNews.length])

  const renderEmptyState = () => (
    <ThemedView style={styles(insets).emptyContainer}>
      <ThemedText style={styles(insets).emptyText}>No saved news yet</ThemedText>
    </ThemedView>
  )

  return (
    <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
      <ThemedText type="title" style={styles(insets).title}>Saved News</ThemedText>

      <FlatList
        data={savedNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles(insets).listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </ThemedView>
  )
}

const styles = (insets: EdgeInsets) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: insets.top,
  },
  title: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
})

export default SavedNewsScreen 