import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();
  
  // Theme colors
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 20,
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
    </Tabs>
  );
}
