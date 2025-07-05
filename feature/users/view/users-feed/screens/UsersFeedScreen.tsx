import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { User } from '@/feature/users/model/entities/User'
import { setSelectedUser } from '@/feature/users/model/store/usersSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UserCard } from '../components/UserCard'
import { useUsersFeedScreen } from '../hooks/useUsersFeedScreen'

export const UsersFeedScreen = () => {
    const { users, loading, error } = useUsersFeedScreen();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

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
        <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
                No users available at the moment
            </ThemedText>
        </ThemedView>
    );

    const renderLoadingState = () => (
        <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <ThemedText style={styles.loadingText}>
                Loading users...
            </ThemedText>
        </ThemedView>
    );

    const renderErrorState = () => (
        <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>
                Error loading users: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles.container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={styles.header}>
                <TouchableOpacity 
                    onPress={handleDoubleTapUsers}
                    activeOpacity={0.7}
                    style={styles.titleContainer}
                >
                    <ThemedText type="title">Cx Users</ThemedText>
                </TouchableOpacity>
                <ThemedText type="subtitle">Discover our community members</ThemedText>
            </ThemedView>

            {/* Content section */}
            <ThemedView style={styles.content}>
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
                        contentContainerStyle={[styles.listContainer, { paddingBottom: insets.bottom + 20 }]}
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 60,
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