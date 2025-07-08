// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'bookmark': 'bookmark-outline',
  'bookmark.fill': 'bookmark',
  'newspaper': 'article',
  'newspaper.fill': 'article',
  'person.2': 'people',
  'person.2.fill': 'people',
  'person.circle': 'account-circle',
  'person.circle.fill': 'account-circle',
  'person.fill': 'person',
  'line.3.horizontal': 'menu',
  'star.fill': 'star',
  'gear': 'settings',
  'wrench.and.screwdriver.fill': 'build',
  'checkmark.circle.fill': 'check-circle',
  'arrow.right.circle.fill': 'arrow-forward',
  'heart.fill': 'favorite',
  'bolt.fill': 'flash-on',
  'shield.fill': 'security',
  'rocket.fill': 'rocket-launch',
  'camera.fill': 'photo-camera',
  'magnifyingglass': 'search',
  'clock': 'schedule',
  'envelope': 'email',
  'link': 'link',
  'phone': 'phone',
  'phone.fill': 'phone',
  'rectangle.portrait.and.arrow.right': 'logout',
  'moon.fill': 'brightness-2',
  'sun.max.fill': 'brightness-5',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
