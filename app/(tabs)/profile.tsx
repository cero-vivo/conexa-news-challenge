import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Image,
  Linking,
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
      t('profile.logout.title'),
      t('profile.logout.confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('profile.logout.title'), 
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

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${t('profile.about.email')}`)
  }

  const handlePhonePress = () => {
    Linking.openURL(`tel:${t('profile.about.phone')}`)
  }

  const handleLinkedInPress = () => {
    Linking.openURL(`https://www.${t('profile.about.linkedin')}`)
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={[styles.header]}>
        <TouchableOpacity style={styles.avatarContainer}>
            <Image source={require('@/assets/images/me.jpeg')} style={styles.avatar} resizeMode='contain' />
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
          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <IconSymbol name="envelope" size={16} color={tintColor} />
            <ThemedText style={[styles.contactText, { color: textColor }]}>
              {t('profile.about.email')}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <IconSymbol name="phone" size={16} color={tintColor} />
            <ThemedText style={[styles.contactText, { color: textColor }]}>
              {t('profile.about.phone')}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem} onPress={handleLinkedInPress}>
            <IconSymbol name="link" size={16} color={tintColor} />
            <ThemedText style={[styles.contactText, { color: textColor }]}>
              {t('profile.about.linkedin')}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.logoutButton, { borderColor: '#FF3B30' }]}
        >
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#FF3B30" />
          <ThemedText type='default' style={[styles.logoutText, { color: '#FF3B30' }]}>
            {t('profile.logout.title')}
          </ThemedText>
        </TouchableOpacity>
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
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    opacity: 0.8,
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    fontWeight: '600',
  },
}) 