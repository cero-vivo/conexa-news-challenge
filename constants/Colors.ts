/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Additional semantic colors
    border: '#E5E5E7',
    secondaryText: '#666666',
    placeholder: '#9BA1A6',
    error: '#FF3B30',
    gold: '#FFD700',
    heart: '#FF6B6B',
    categoryBg: '#E3F2FD',
    categoryTint: '#007AFF',
    white: '#FFFFFF',
    black: '#000000',
  },
  dark: {
    text: '#ECEDEE',
    background: '#1E202D',
    tint: tintColorDark,
    icon: '#B0B7C3',
    tabIconDefault: '#B0B7C3',
    tabIconSelected: tintColorDark,
    // Additional semantic colors
    border: '#2C2C2E',
    secondaryText: '#B0B7C3',
    placeholder: '#9BA1A6', // same value for both modes
    error: '#FF3B30', // same value for both modes
    gold: '#FFD700',
    heart: '#FF6B6B',
    categoryBg: '#1A3A5F',
    categoryTint: '#4DA6FF',
    white: '#FFFFFF',
    black: '#000000',
  },
};
