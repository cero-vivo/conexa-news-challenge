import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { User } from '@/features/users/model/entities/User'
import { clearSelectedUser } from '@/features/users/model/store/usersSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const UserDetailScreen = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const selectedUser: User | null = useAppSelector(state => state.users.selectedUser) || null
    const insets = useSafeAreaInsets()
    const { t } = useTranslation()

    // Theme colors
    const textColor = useThemeColor({}, 'text')
    const tintColor = useThemeColor({}, 'tint')
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')
    const secondaryTextColor = useThemeColor({ light: '#666666', dark: '#9BA1A6' }, 'icon')
    const contentTextColor = useThemeColor({ light: '#333333', dark: '#ECEDEE' }, 'text')
    const backgroundColor = useThemeColor({}, 'background')

    const handleBackPress = () => {
        console.log('Back button pressed in UserDetailScreen')
        dispatch(clearSelectedUser())
        router.back()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (!selectedUser) {
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText style={[styles.errorText, { color: '#FF3B30' }]}>
                    {t('users.error')}
                </ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={[styles.header, { borderBottomColor: borderColor, paddingTop: insets.top + 20 }]}>
                <TouchableOpacity 
                    style={[styles.backButton, { backgroundColor: backgroundColor }]} 
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <IconSymbol name="chevron.left" size={24} color={tintColor} />
                </TouchableOpacity>
                <ThemedText type="subtitle" style={[styles.headerTitle, { color: textColor }]}>
                    {t('users.back')}
                </ThemedText>
            </ThemedView>

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
            >
                <ThemedView style={styles.avatarContainer}>
                    <Image 
                        source={{ uri: `https://picsum.photos/200/200?random=${selectedUser.id}` }} 
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                </ThemedView>

                <ThemedView style={styles.userInfo}>
                    <ThemedText type="title" style={[styles.userName, { color: textColor }]}>
                        {selectedUser.firstname} {selectedUser.lastname}
                    </ThemedText>
                    
                    <ThemedText style={[styles.userEmail, { color: secondaryTextColor }]}>
                        📧 {selectedUser.email}
                    </ThemedText>

                    <ThemedText style={[styles.userPhone, { color: secondaryTextColor }]}>
                        📞 {selectedUser.phone}
                    </ThemedText>

                    <ThemedText style={[styles.userWebsite, { color: tintColor }]}>
                        🌐 {selectedUser.website}
                    </ThemedText>

                    <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
                        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: textColor }]}>
                            {t('users.detail.personalInfo')}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            🏠 {t('users.detail.address')}: {selectedUser.address.street}, {selectedUser.address.suite}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            📮 {t('users.detail.zipcode')}: {selectedUser.address.zipcode}
                        </ThemedText>
                    </ThemedView>

                    <ThemedView style={[styles.section, { borderBottomColor: borderColor }]}>
                        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: textColor }]}>
                            {t('users.detail.companyInfo')}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            🏢 {t('users.detail.company')}: {selectedUser.company.name}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            💼 {t('users.detail.catchPhrase')}: {selectedUser.company.catchPhrase}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            🎯 {t('users.detail.bs')}: {selectedUser.company.bs}
                        </ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.section}>
                        <ThemedText type="subtitle" style={[styles.sectionTitle, { color: textColor }]}>
                            {t('users.detail.accountInfo')}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            👤 {t('users.detail.username')}: {selectedUser.login.username}
                        </ThemedText>
                        <ThemedText style={[styles.sectionContent, { color: contentTextColor }]}>
                            📅 {t('users.detail.registered')}: {formatDate(selectedUser.login.registered)}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 12,
        marginRight: 12,
        borderRadius: 8,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    userInfo: {
        padding: 20,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    userEmail: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    userPhone: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    userWebsite: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    sectionContent: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
    },
}) 