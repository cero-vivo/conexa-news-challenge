import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface DebugInfoProps {
  title?: string
  showAuth?: boolean
  showConfig?: boolean
  showNews?: boolean
  showUsers?: boolean
}

export const DebugInfo: React.FC<DebugInfoProps> = ({
  title = 'Debug Info',
  showAuth = true,
  showConfig = true,
  showNews = false,
  showUsers = false,
}) => {
  const textColor = useThemeColor({}, 'text')
  
  const auth = useAppSelector((state) => state.auth)
  const configUI = useAppSelector((state) => state.configUI)
  const news = useAppSelector((state) => state.news)
  const users = useAppSelector((state) => state.users)

  return (
    <ThemedView style={styles.debugContainer}>
      <ThemedText style={[styles.debugTitle, { color: textColor }]}>
        {title}
      </ThemedText>
      
      {showAuth && (
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Auth:
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            isAuthenticated: {auth.isAuthenticated ? 'true' : 'false'}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            loading: {auth.loading}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            user: {auth.user ? auth.user.name : 'null'}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            error: {auth.error || 'null'}
          </ThemedText>
        </View>
      )}
      
      {showConfig && (
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Config:
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            showOnboarding: {configUI.showOnboarding ? 'true' : 'false'}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            language: {configUI.language}
          </ThemedText>
        </View>
      )}
      
      {showNews && (
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            News:
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            loading: {news.loading}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            count: {news.news.length}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            error: {news.error || 'null'}
          </ThemedText>
        </View>
      )}
      
      {showUsers && (
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            Users:
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            loading: {users.loading}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            count: {users.users.length}
          </ThemedText>
          <ThemedText style={[styles.debugText, { color: textColor }]}>
            error: {users.error || 'null'}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  debugContainer: {
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  debugText: {
    fontSize: 12,
    marginBottom: 2,
  },
}) 