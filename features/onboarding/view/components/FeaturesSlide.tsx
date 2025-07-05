import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const FeaturesSlide: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={[styles.slide, { backgroundColor }]}> 
      <ThemedView
        style={[styles.content, {
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 40,
        }]}
      >
        <ThemedView style={styles.iconSection}>
          <IconSymbol name="star.fill" size={80} color={tintColor} />
        </ThemedView>
        <ThemedText type="title" style={[styles.title, { color: textColor }]}> 
          {t('onboarding.features.title')}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]}> 
          {t('onboarding.features.subtitle')}
        </ThemedText>
        <ThemedText style={[styles.description, { color: textColor }]}> 
          {t('onboarding.features.description')}
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
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSection: {
    marginBottom: 20,
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