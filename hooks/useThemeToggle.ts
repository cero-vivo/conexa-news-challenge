import { toggleTheme } from '@/store/configUiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'

export function useThemeToggle() {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.configUI.theme)
  const isDark = currentTheme === 'dark'

  const handleToggle = useCallback(() => {
    dispatch(toggleTheme())
  }, [dispatch])

  const iconName: 'sun.max.fill' | 'moon.fill' = isDark ? 'sun.max.fill' : 'moon.fill'

  return {
    isDark,
    iconName,
    toggle: handleToggle,
  }
} 