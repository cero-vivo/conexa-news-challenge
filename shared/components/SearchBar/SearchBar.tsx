import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, TouchableOpacity, ViewStyle } from 'react-native'
import { useSearchBar } from './useSearchBar'

interface SearchBarProps {
    placeholder?: string
    onSearch: (q: string) => void
    onClear?: () => void
    debounceMs?: number
    style?: ViewStyle
}

export const SearchBar = ({ placeholder = 'Buscar...', onSearch, onClear, debounceMs = 300, style }: SearchBarProps) => {
    const { searchQuery, handleSearchChange, handleClear, isSearching } = useSearchBar({ onSearch, onClear, debounceMs })
    const { t } = useTranslation()

    const bg = useThemeColor({ light: '#F2F2F7', dark: '#1C1C1E' }, 'background')
    const text = useThemeColor({}, 'text')
    const placeholderColor = useThemeColor({ light: '#8E8E93', dark: '#8E8E93' }, 'icon')
    const tint = useThemeColor({}, 'tint')

    return (
        <ThemedView style={[styles.container, { backgroundColor: bg }, style]}>
            <IconSymbol name="magnifyingglass" size={20} color={placeholderColor} style={styles.icon} />
            <TextInput
                style={[styles.input, { color: text }]}
                placeholderTextColor={placeholderColor}
                placeholder={placeholder}
                value={searchQuery}
                onChangeText={handleSearchChange}
                returnKeyType="search"
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                    <ThemedText style={{ color: tint, fontSize: 14 }}>{t('common.clear')}</ThemedText>
                </TouchableOpacity>
            )}
            {isSearching && <IconSymbol name="clock" size={18} color={tint} style={styles.icon} />}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
    },
    icon: { 
        marginHorizontal: 8,
        minWidth: 20,
        textAlign: 'center',
    },
    input: { 
        flex: 1, 
        fontSize: 16, 
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    clearBtn: { 
        paddingHorizontal: 12, 
        paddingVertical: 8,
        minHeight: 32,
        justifyContent: 'center',
    },
}) 