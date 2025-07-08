import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { EdgeInsets } from 'react-native-safe-area-context'

interface Params {
  hasMore: boolean
  loadingMore: boolean
  loading: 'idle' | 'loading' | 'error' | 'success' | string
  loadMoreNews: () => void
  insets: EdgeInsets
}

/**
 * Devuelve el manejador `handleLoadMore` y el componente `renderFooter` para la FlatList.
 */
export const useNewsPagination = ({ hasMore, loadingMore, loading, loadMoreNews, insets }: Params) => {
  const { t } = useTranslation()
  const tintColor = useThemeColor({}, 'tint')
  const textColor = useThemeColor({}, 'text')

  const handleLoadMore = () => {
    if (hasMore && !loadingMore && loading !== 'loading') {
      loadMoreNews()
    }
  }

  const renderFooter = useCallback(() => {
    if (!hasMore) {
      return (
        <ThemedView style={footerStyles(insets).footerContainer}>
          <ThemedText style={[footerStyles(insets).footerText, { color: textColor }]}>
            {t('news.endOfList')}
          </ThemedText>
        </ThemedView>
      )
    }

    if (loadingMore) {
      return (
        <ThemedView style={footerStyles(insets).footerContainer}>
          <ActivityIndicator size="small" color={tintColor} />
          <ThemedText style={[footerStyles(insets).footerText, { color: textColor, marginLeft: 8 }]}> 
            {t('news.loadingMore')}
          </ThemedText>
        </ThemedView>
      )
    }

    return null
  }, [hasMore, loadingMore, textColor, tintColor, t, insets])

  return { handleLoadMore, renderFooter }
}

// Estilos inline para el footer
const footerStyles = (insets: EdgeInsets) => ({
  footerContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: insets.bottom + 10,
  },
  footerText: {
    fontSize: 14,
    color: '#9BA1A6',
    fontWeight: '500' as const,
    marginLeft: 8,
  },
}) 