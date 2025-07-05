import { ThemedText } from '@/components/ThemedText';
import { News } from '@/feature/news/model/entities/News';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

// Props interface for NewsCard component
interface NewsCardProps {
  news: News;
  onPress: (news: News) => void;
}

// NewsCard component - displays individual news item
export const NewsCard: React.FC<NewsCardProps> = ({ news, onPress }) => {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle card press
  const handlePress = () => {
    console.log('📰 News card pressed:', news.title);
    onPress(news);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.card}>
        {/* News image */}
        <Image 
          source={{ uri: news.image || news.thumbnail }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* News content */}
        <View style={styles.content}>
          {/* Category badge */}
          <View style={styles.categoryContainer}>
            <ThemedText style={styles.category}>{news.category}</ThemedText>
          </View>
          
          {/* News title */}
          <ThemedText style={styles.title} numberOfLines={2}>
            {news.title}
          </ThemedText>
          
          {/* News excerpt */}
          <ThemedText style={styles.excerpt} numberOfLines={3}>
            {news.content}
          </ThemedText>
          
          {/* Publication date */}
          <ThemedText style={styles.date}>
            {formatDate(news.publishedAt)}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles for NewsCard component
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F0F8FF', // Light blue background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E6F3FF', // Subtle border for better definition
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF', // Darker blue for category
    backgroundColor: '#DBEAFE', // Lighter blue background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: '#1E3A8A', // Darker blue for better contrast
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151', // Darker gray for better readability
  },
  date: {
    fontSize: 12,
    color: '#6B7280', // Medium gray for date
    marginTop: 4,
  },
}); 