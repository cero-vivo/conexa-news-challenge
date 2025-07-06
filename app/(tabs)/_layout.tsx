import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { t } = useTranslation();
  
  // Theme colors
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

  // Safe area
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 12),
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.news'),
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              name="newspaper.fill"
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabs.users'),
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              name="person.2.fill"
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved-news"
        options={{
          title: t('tabs.saved'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              name={focused ? 'bookmark.fill' : 'bookmark'}
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              name={focused ? 'person.circle.fill' : 'person.circle'}
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
