import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { News } from '@/feature/news/model/entities/News'
import React from 'react'
import { Share, StyleSheet, TouchableOpacity } from 'react-native'

interface ShareButtonProps {
    news: News
}

export const ShareButton = ({ news }: ShareButtonProps) => {
    const handleShare = async () => {
        try {
            await Share.share({
                message: `${news.title}\n\n${news.content.substring(0, 200)}...\n\nLee más en: ${news.url}`,
                title: news.title,
                url: news.url,
            })
        } catch (error) {
            console.error('Error sharing news:', error)
        }
    }

    return (
        <TouchableOpacity 
            style={styles.shareButton} 
            onPress={handleShare}
            activeOpacity={0.7}
        >
            <IconSymbol name="square.and.arrow.up" size={20} color="#007AFF" />
            <ThemedText style={styles.shareText}>Compartir</ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    shareText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
    },
}) 