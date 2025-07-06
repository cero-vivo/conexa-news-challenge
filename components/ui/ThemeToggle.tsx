import { IconSymbol } from '@/components/ui/IconSymbol'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useThemeToggle } from '@/hooks/useThemeToggle'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function ThemeToggle({ size = 24 }: { size?: number }) {
  const { iconName, toggle } = useThemeToggle()
  const tintColor = useThemeColor({}, 'tint')

  return (
    <TouchableOpacity onPress={toggle} style={styles.button} hitSlop={8}>
      <IconSymbol name={iconName} size={size} color={tintColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
}) 