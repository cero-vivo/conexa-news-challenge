import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { Routes } from '@/constants/Routes'
import { User } from '@/features/users/model/entities/User'
import { setSelectedUser } from '@/features/users/store/usersSlice'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'expo-router'
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native'
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

    // Theme colors
    const tintColor = useThemeColor({}, 'tint');
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text');

    // Evita doble apertura rápida
    const navigatingRef = useRef(false);

    const handleUserPress = (user: User) => {
        if (navigatingRef.current) return;
        navigatingRef.current = true;

        dispatch(setSelectedUser(user));

        // Usar navigate en todos los SO para evitar duplicar la pantalla
        router.navigate(Routes.USER_DETAIL);

        setTimeout(() => {
            navigatingRef.current = false;
        }, 600);
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
            <IconSymbol name="person.2.fill" size={64} color={tintColor} style={styles(insets).emptyIcon} />
            <ThemedText style={styles(insets).emptyText}>
                {t('users.empty')}
            </ThemedText>
        </ThemedView>
    );

    const renderLoadingState = () => (
        <ThemedView style={styles(insets).loadingContainer}>
            <ActivityIndicator size="large" color={tintColor} />
            <ThemedText style={styles(insets).loadingText}>
                {t('users.loading')}
            </ThemedText>
        </ThemedView>
    );

    const renderErrorState = () => (
        <ThemedView style={styles(insets).errorContainer}>
            <IconSymbol name="shield.fill" size={48} color={Colors.light.error} style={styles(insets).errorIcon} />
            <ThemedText style={styles(insets).errorText}>
                {t('users.error')}: {error}
            </ThemedText>
        </ThemedView>
    );

    return (
        <ThemedView style={[styles(insets).container, { paddingBottom: insets.bottom }]}>
            {/* Header section */}
            <ThemedView style={[styles(insets).header, { borderBottomColor: borderColor }]}>
                <TouchableOpacity 
                    onPress={handleDoubleTapUsers}
                    activeOpacity={0.7}
                    style={styles(insets).titleContainer}
                >
                    <ThemedView style={styles(insets).headerContent}>
                        <ThemedView style={styles(insets).iconContainer}>
                            <IconSymbol name="person.2.fill" size={32} color={tintColor} />
                        </ThemedView>
                        <ThemedView style={styles(insets).titleSection}>
                            <ThemedText type="title" style={styles(insets).title}>{t('users.title')}</ThemedText>
                            <ThemedView style={styles(insets).statsContainer}>
                                <IconSymbol name="star.fill" size={12} color={Colors.light.gold} />
                                <ThemedText style={styles(insets).statsText}>
                                    {t('users.community', { count: users?.length || 0 })}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </TouchableOpacity>
                
                <ThemedView style={styles(insets).subtitleContainer}>
                    <IconSymbol name="heart.fill" size={16} color={tintColor} />
                    <ThemedText type="subtitle" style={styles(insets).subtitle}>{t('users.subtitle')}</ThemedText>
                </ThemedView>
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
                        contentContainerStyle={[styles(insets).listContainer]}
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
        flexGrow: 1,
        paddingBottom: insets.bottom + (Platform.OS === 'ios' ? 100 : 30),
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
        color: Colors.light.placeholder,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: Colors.light.error,
        textAlign: 'center',
    },
    errorIcon: {
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.light.placeholder,
        textAlign: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16,
    },
    titleSection: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontSize: 12,
        color: Colors.light.placeholder,
        marginLeft: 4,
        width: '85%',
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.placeholder,
        marginLeft: 4,
        lineHeight: 20,
    },
}); 