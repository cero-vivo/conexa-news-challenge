import { ThemedText } from '@/components/ThemedText'
import { User } from '@/feature/users/model/entities/User'
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Theme colors
    const backgroundColor = useThemeColor({ light: '#E3F2FD', dark: '#2C2C2E' }, 'background')
    const textColor = useThemeColor({}, 'text')
    const secondaryTextColor = useThemeColor({ light: '#666666', dark: '#9BA1A6' }, 'icon')
    const accentColor = useThemeColor({ light: '#007AFF', dark: '#4DA6FF' }, 'tint')

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={[styles.card, { backgroundColor }]}>
                {/* User Avatar */}
                <Image 
                    source={{ uri: `https://picsum.photos/100/100?random=${user.id}` }} 
                    style={styles.avatar}
                />
                
                {/* User Info */}
                <View style={styles.userInfo}>
                    <ThemedText type="defaultSemiBold" style={[styles.name, { color: textColor }]}>
                        {user.firstname} {user.lastname}
                    </ThemedText>
                    
                    <ThemedText style={[styles.email, { color: secondaryTextColor }]}>
                        {user.email}
                    </ThemedText>
                    
                    <ThemedText style={[styles.company, { color: accentColor }]}>
                        {user.company.name}
                    </ThemedText>
                    
                    <ThemedText style={[styles.location, { color: secondaryTextColor }]}>
                        📍 {user.address.city}
                    </ThemedText>
                    
                    <ThemedText style={[styles.birthDate, { color: secondaryTextColor }]}>
                        🎂 {formatDate(user.birthDate)}
                    </ThemedText>
                </View>
            </View>
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
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        marginBottom: 4,
    },
    company: {
        fontSize: 14,
        marginBottom: 4,
    },
    location: {
        fontSize: 12,
        marginBottom: 2,
    },
    birthDate: {
        fontSize: 12,
    },
}) 