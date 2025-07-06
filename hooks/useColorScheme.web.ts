import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const systemScheme = useRNColorScheme();
  const themeOverride = useAppSelector((state) => state.configUI.theme);

  let resolvedScheme: 'light' | 'dark' | null = null;

  if (themeOverride && themeOverride !== 'system') {
    resolvedScheme = themeOverride;
  } else {
    resolvedScheme = (systemScheme as 'light' | 'dark' | null);
  }

  if (hasHydrated) {
    return resolvedScheme ?? 'light';
  }

  return 'light';
}
