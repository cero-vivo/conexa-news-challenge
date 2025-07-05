import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { User } from '@/features/users/model/entities/User'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

interface UserCardProps {
    user: User
    onPress: (user: User) => void
}

export const UserCard = ({ user, onPress }: UserCardProps) => {
    const handlePress = () => {
        onPress(user)
    }
    
    // Theme colors
    const backgroundColor = useThemeColor({}, 'background')
    const textColor = useThemeColor({}, 'text')
    const secondaryTextColor = useThemeColor({ light: '#666666', dark: '#9BA1A6' }, 'icon')
    const tintColor = useThemeColor({}, 'tint')
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#2C2C2E' }, 'text')

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <ThemedView style={[styles.card, { backgroundColor, borderColor }]}>
                {/* User Avatar with border */}
                <View style={styles.avatarContainer}>
                    <Image 
                        source={{ uri: `https://picsum.photos/100/100?random=${user.id}` }} 
                        style={styles.avatar}
                    />
                </View>
                
                {/* User Info */}
                <View style={styles.userInfo}>
                    <View style={styles.nameContainer}>
                        <ThemedText type="defaultSemiBold" style={[styles.name, { color: textColor }]}>
                            {user.firstname} {user.lastname}
                        </ThemedText>
                        <View style={styles.verifiedBadge}>
                            <IconSymbol name="checkmark.circle.fill" size={14} color={tintColor} />
                        </View>
                    </View>
                    
                    <View style={styles.emailContainer}>
                        <IconSymbol name="paperplane.fill" size={12} color={secondaryTextColor} />
                        <ThemedText style={[styles.email, { color: secondaryTextColor }]}>
                            {user.email}
                        </ThemedText>
                    </View>
                    
                    <View style={styles.companyContainer}>
                        <IconSymbol name="star.fill" size={12} color="#FFD700" />
                        <ThemedText style={[styles.company, { color: tintColor }]}>
                            {user.company.name}
                        </ThemedText>
                    </View>
                    
                    <View style={styles.locationContainer}>
                        <IconSymbol name="house.fill" size={12} color={secondaryTextColor} />
                        <ThemedText style={[styles.location, { color: secondaryTextColor }]}>
                            {user.address.street}, {user.address.city}
                        </ThemedText>
                    </View>
                </View>
                
                {/* Arrow indicator */}
                <View style={styles.arrowContainer}>
                    <IconSymbol name="chevron.right" size={16} color={secondaryTextColor} />
                </View>
            </ThemedView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        gap: 6,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    verifiedBadge: {
        marginLeft: 6,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    email: {
        fontSize: 14,
        marginLeft: 6,
    },
    companyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    company: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 12,
        marginLeft: 6,
    },
    arrowContainer: {
        justifyContent: 'center',
        marginLeft: 8,
    },
}) 