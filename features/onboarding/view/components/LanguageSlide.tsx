import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LanguageSlide: React.FC = () => {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <ThemedView style={[styles.slide, { backgroundColor }]}> 
      <ThemedView
        style={[styles.content, {
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 40,
        }]}
      >
        <LanguageSelector />
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
}); 