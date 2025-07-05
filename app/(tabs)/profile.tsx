import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Button } from '@/components/ui/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const tintColor = useThemeColor({}, 'tint')
  const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')

  const handleLogout = () => {
    Alert.alert(
      t('profile.logout'),
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            console.log("🚪 User confirmed logout")
            logout()
          }
        }
      ]
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={require('@/assets/images/me.jpeg')} style={styles.avatar} resizeMode='contain' />
          ) : (
            <ThemedView style={[styles.avatarPlaceholder, { backgroundColor: tintColor }]}>
              <IconSymbol name="person.fill" size={40} color="#FFFFFF" />
            </ThemedView>
          )}
        </TouchableOpacity>
        
        <ThemedText style={[styles.name, { color: textColor }]}>
          {user?.name || t('profile.anonymous')}
        </ThemedText>
        
        <ThemedText style={[styles.email, { color: textColor }]}>
          {user?.email}
        </ThemedText>
        
        {user?.createdAt && (
          <ThemedText style={[styles.memberSince, { color: textColor }]}>
            {t('profile.memberSince')} {formatDate(user.createdAt)}
          </ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            {t('profile.about.title')}
          </ThemedText>
          <ThemedText style={[styles.description, { color: textColor }]}>
            {t('profile.about.description')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            {t('profile.about.skills')}
          </ThemedText>
          <ThemedText style={[styles.skills, { color: textColor }]}>
            {t('profile.about.skillsList')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            {t('profile.about.experience')}
          </ThemedText>
          <ThemedText style={[styles.experience, { color: textColor }]}>
            {t('profile.about.experienceText')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
          <ThemedText style={[styles.sectionTitle, { color: textColor }]}>
            {t('profile.about.contact')}
          </ThemedText>
          <ThemedView style={styles.contactItem}>
            <IconSymbol name="envelope" size={16} color={tintColor} />
            <ThemedText style={[styles.contactText, { color: textColor }]}>
              {t('profile.about.email')}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <IconSymbol name="link" size={16} color={tintColor} />
            <ThemedText style={[styles.contactText, { color: textColor }]}>
              {t('profile.about.linkedin')}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <Button
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        >
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={16} color="#FF3B30" />
          <ThemedText style={[styles.logoutText, { color: '#FF3B30' }]}>
            {t('profile.logout')}
          </ThemedText>
        </Button>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,

    backgroundColor: 'white',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    opacity: 0.6,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  skills: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  experience: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 8,
    opacity: 0.8,
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}) 