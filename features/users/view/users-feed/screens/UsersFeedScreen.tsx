import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { User } from '@/features/users/model/entities/User'
import { setSelectedUser } from '@/features/users/model/store/usersSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { UserCard } from '../components/UserCard'
import { useUsersFeedScreen } from '../hooks/useUsersFeedScreen'

export const UsersFeedScreen = () => {
    const { users, loading, error } = useUsersFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    const handleUserPress = (user: User) => {
        dispatch(setSelectedUser(user));
        router.push(`/user-detail`);
    };

    const handleDoubleTapUsers = () => flatListRef.current?.scrollToOffset({ offset: 0, animated: true })

    const renderUserItem = useMemo(() => {
        return ({ item }: { item: User }) => (
            <UserCard 
                user={item} 
                onPress={handleUserPress}
            />
        );
    }, [handleUserPress, users?.length]);

    const renderEmptyState = () => (
        <ThemedView style={styles(insets).emptyContainer}>
            <ThemedText style={styles(insets).emptyText}>
                {t('users.empty')}
            </ThemedText>
        </ThemedView>
    );

    const renderLoadingState = () => (
        <ThemedView style={styles(insets).loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText style={styles(insets).loadingText}>
                {t('users.loading')}
            </ThemedText>
        </ThemedView>
    );

    const renderErrorState = () => (
        <ThemedView style={styles(insets).errorContainer}>
            <ThemedText style={styles(insets).errorText}>
                {t('users.error')}: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={styles(insets).header}>
                <TouchableOpacity 
                    onPress={handleDoubleTapUsers}
                    activeOpacity={0.7}
                    style={styles(insets).titleContainer}
                >
                    <ThemedText type="title">{t('users.title')}</ThemedText>
                </TouchableOpacity>
                <ThemedText type="subtitle">{t('users.subtitle')}</ThemedText>
            </ThemedView>

            {/* Content section */}
            <ThemedView style={styles(insets).content}>
                {loading === 'loading' ? (
                    renderLoadingState()
                ) : loading === 'error' ? (
                    renderErrorState()
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={users}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[styles(insets).listContainer, { paddingBottom: insets.bottom + 20 }]}
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </ThemedView>
        </ThemedView>
    )
}

const styles = (insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: insets.top,
        marginBottom: 30,
        gap: 8,
    },
    titleContainer: {
        alignSelf: 'flex-start',
    },
    content: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#666666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
}); 