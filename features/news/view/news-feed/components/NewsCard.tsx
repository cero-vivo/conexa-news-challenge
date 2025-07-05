import { ThemedText } from '@/components/ThemedText';
import { News } from '@/features/news/model/entities/News';
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

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.card}>
        
        <Image 
          source={{ uri: `https://picsum.photos/200/300?random=${news.id}` }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <ThemedText style={styles.category}>{news.category}</ThemedText>
          </View>
          
          <ThemedText style={styles.title} numberOfLines={2}>
            {news.title}
          </ThemedText>
          
          <ThemedText style={styles.excerpt} numberOfLines={3}>
            {news.content}
          </ThemedText>
          
          <ThemedText style={styles.date}>
            {news.publishedAt}
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