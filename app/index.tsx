import { useAppSelector } from '@/store/hooks'
import { Redirect } from 'expo-router'

export default function Index() {
  const { showOnboarding } = useAppSelector((state) => state.configUI)
  
  if (!showOnboarding) {
    return <Redirect href="/onboarding" />
  }
  return <Redirect href="/(tabs)" />
} 