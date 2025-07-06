import { Colors } from '@/constants/Colors';
import { useAppSelector } from '@/store/hooks';
import { useColorScheme as useRNColorScheme } from 'react-native';

// Custom hook that considers user override theme stored in Redux
export function useColorScheme() {
  const systemScheme = useRNColorScheme();
  const themeOverride = useAppSelector((state) => state.configUI.theme);

  if (themeOverride && themeOverride !== 'system') {
    return themeOverride;
  }

  return systemScheme ?? 'light';
}

// Updated hook for colors using the above
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
