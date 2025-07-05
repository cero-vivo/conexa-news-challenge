import { persistor } from '@/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { Redirect } from 'expo-router';

function AppContent() {
  const { showOnboarding } = useAppSelector((state) => state.configUI);
  
  // If onboarding should be shown, redirect to onboarding
  if (showOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  
  // Otherwise, redirect to tabs
  return <Redirect href="/(tabs)" />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen 
                name="news-detail" 
                options={{ 
                  headerShown: false,
                  presentation: 'modal'
                }} 
              />
              <Stack.Screen 
                name="user-detail" 
                options={{ 
                  headerShown: false,
                  presentation: 'modal'
                }} 
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
