import { ThemedView } from '@/components/ThemedView';
import { Routes } from '@/constants/Routes';
import { setShowOnboarding } from '@/features/onboarding/model/store/onboardingSlice';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { FeaturesSlide } from '../components/FeaturesSlide';
import { LanguageSlide } from '../components/LanguageSlide';
import { ProfileSlide } from '../components/ProfileSlide';
import { TechnologiesSlide } from '../components/TechnologiesSlide';
import { WelcomeSlide } from '../components/WelcomeSlide';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const completeOnboarding = useCallback(() => {
    dispatch(setShowOnboarding(false));
    router.replace(Routes.AUTH);
  }, [dispatch, router]);

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
        <ProfileSlide onLogin={completeOnboarding} onDontShowAgain={completeOnboarding} />
      </Swiper>
    </ThemedView>
  );
} 