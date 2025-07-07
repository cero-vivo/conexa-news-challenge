import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useThemeToggle } from '@/hooks/useThemeToggle'
import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'small' | 'medium' | 'large'
	children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'medium', children, style, ...props }) => {
	const textColor = useThemeColor({}, 'text')
	const tintColor = useThemeColor({}, 'tint')
	const { isDark } = useThemeToggle()

	const getTextColor = () => {
		if (variant === 'primary') {
			return isDark ? '#000000' : '#FFFFFF'
		}
		return textColor
	}

	// Get button styles based on variant
	const getButtonStyle = () => {
		const baseStyle = [styles.button, styles[size]]

		switch (variant) {
			case 'primary':
				return [
					...baseStyle,
					{ backgroundColor: tintColor, borderColor: tintColor }
				]
			case 'secondary':
				return [
					...baseStyle,
					{ backgroundColor: 'transparent', borderColor: textColor }
				]
			case 'outline':
				return [
					...baseStyle,
					{ backgroundColor: 'transparent', borderColor: textColor }
				]
			default:
				return baseStyle
		}
	}

	return (
		<TouchableOpacity
			style={[getButtonStyle(), style]}
			activeOpacity={0.8}
			{...props}
		>
			<ThemedText style={[
				styles.text,
				styles[`${size}Text`],
				{ color: getTextColor() }
			]}>
				{children}
			</ThemedText>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		minWidth: 120,
	},
	// Size variants
	small: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		minWidth: 80,
	},
	medium: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		minWidth: 120,
	},
	large: {
		paddingVertical: 16,
		paddingHorizontal: 32,
		minWidth: 140,
	},
	// Text sizes
	smallText: {
		fontSize: 14,
		fontWeight: '500',
	},
	mediumText: {
		fontSize: 16,
		fontWeight: '600',
	},
	largeText: {
		fontSize: 18,
		fontWeight: '600',
	},
	text: {
		textAlign: 'center',
	},
}) 