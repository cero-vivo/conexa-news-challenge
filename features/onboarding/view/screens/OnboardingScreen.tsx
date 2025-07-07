import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { FeaturesSlide } from '../components/FeaturesSlide';
import { LanguageSlide } from '../components/LanguageSlide';
import { ProfileSlide } from '../components/ProfileSlide';
import { TechnologiesSlide } from '../components/TechnologiesSlide';
import { WelcomeSlide } from '../components/WelcomeSlide';
import { useOnboardingScreen } from '../hooks/useOnboardingScreen';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { handleFinish } = useOnboardingScreen();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <Swiper
        index={index}
        loop={false}
        showsButtons={false}
        showsPagination={true}
        dotColor={textColor}
        activeDotColor={useThemeColor({}, 'tint')}
        onIndexChanged={setIndex}
        dotStyle={{ marginBottom: insets.bottom }}
        activeDotStyle={{ marginBottom: insets.bottom }}
        scrollEventThrottle={16}
      >
        <LanguageSlide />
        <WelcomeSlide />
        <FeaturesSlide />
        <TechnologiesSlide />
        <ProfileSlide onLogin={handleFinish} onDontShowAgain={handleFinish} />
      </Swiper>
    </ThemedView>
  );
} 