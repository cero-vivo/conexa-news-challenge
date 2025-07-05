import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { News } from '@/features/news/model/entities/News';
import { toggleSaveNews } from '@/features/news/model/store/savedNewsSlice';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// Props interface for NewsCard component
interface NewsCardProps {
  news: News;
  onPress: (news: News) => void;
}

// NewsCard component - displays individual news item
export const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  // Handle card press
  const handlePress = () => {
    console.log('📰 News card pressed:', news.title);
    onPress(news);
  };

  const dispatch = useAppDispatch();
  const savedNews = useAppSelector((state) => state.savedNews.savedNews);
  const isSaved = savedNews.some((item) => item.id === news.id);

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleToggleSave = () => {
    dispatch(toggleSaveNews(news));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <ThemedView style={[styles.card, { backgroundColor }]}>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: `https://picsum.photos/200/300?random=${news.id}` }} 
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Simple overlay */}
          <View style={styles.overlay} />
          
          {/* Category badge */}
          <View style={styles.categoryContainer}>
            <IconSymbol name="newspaper.fill" size={12} color="#FFFFFF" />
            <ThemedText style={styles.category}>{news.category}</ThemedText>
          </View>
          
          {/* Bookmark icon */}
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleToggleSave}
            activeOpacity={0.8}
          >
            <IconSymbol
              name={isSaved ? 'bookmark.fill' : 'bookmark'}
              size={24}
              color={isSaved ? '#FFD700' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <ThemedText style={[styles.title, { color: textColor }]} numberOfLines={2}>
            {news.title}
          </ThemedText>
          
          <ThemedText style={[styles.excerpt, { color: textColor }]} numberOfLines={3}>
            {news.content}
          </ThemedText>
          
          <View style={styles.footer}>
            <View style={styles.dateContainer}>
              <IconSymbol name="clock" size={12} color={tintColor} />
              <ThemedText style={[styles.date, { color: textColor }]}>
                {news.publishedAt}
              </ThemedText>
            </View>
            
            <View style={styles.readMoreContainer}>
              <ThemedText style={[styles.readMore, { color: tintColor }]}>
                Leer más
              </ThemedText>
              <IconSymbol name="chevron.right" size={12} color={tintColor} />
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

// Styles for NewsCard component
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  categoryContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMore: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
}); 