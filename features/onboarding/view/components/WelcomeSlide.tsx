import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const WelcomeSlide: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={[styles.slide, { backgroundColor }]}> 
      <ThemedView
        style={[styles.content, {
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 40,
        }]}
      >
        <ThemedView style={styles.logoSection}>
          <Image source={require('@/assets/images/conexa_tech_logo.jpg')} style={styles.logoImage} />
        </ThemedView>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}> 
          {t('onboarding.welcome.title')} 
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}> 
          {t('onboarding.welcome.subtitle')} 
        </ThemedText>
        <ThemedText style={[styles.description, { color: textColor }]}> 
          {t('onboarding.welcome.description')} 
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '90%',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 