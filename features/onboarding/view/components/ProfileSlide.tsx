import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	onLogin: () => void;
	onDontShowAgain: () => void;
}

export const ProfileSlide: React.FC<Props> = ({ onLogin, onDontShowAgain }) => {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const backgroundColor = useThemeColor({}, 'background');
	const textColor = useThemeColor({}, 'text');
	const tintColor = useThemeColor({}, 'tint');

	return (
		<ThemedView style={[styles.slide, { backgroundColor }]}>
			<ThemedView
				style={[styles.content, {
					paddingTop: insets.top + 40,
					paddingBottom: insets.bottom + 40,
				}]}
			>
				<ThemedView style={styles.profileSection}>
					<Image source={require('@/assets/images/me.jpeg')} style={[styles.profileImage, {backgroundColor: tintColor}]} />
					<ThemedText type="title" style={[styles.title, { color: textColor }]}>
						{t('onboarding.profile.title')}
					</ThemedText>
					<ThemedText style={[styles.subtitle, { color: textColor }]}>
						{t('onboarding.profile.subtitle')}
					</ThemedText>
					<ThemedText style={[styles.description, { color: textColor }]}>
						{t('onboarding.profile.description')}
					</ThemedText>
				</ThemedView>

				<ThemedView style={styles.buttonSection}>
					<Button variant="primary" size="large" onPress={onLogin}>
						{t('onboarding.buttons.enter')}
					</Button>
					<Button variant="secondary" size="medium" onPress={onDontShowAgain}>
						{t('onboarding.buttons.dontShowAgain')}
					</Button>
				</ThemedView>
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	slide: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		width: '100%',
		paddingHorizontal: 24,
		alignItems: 'center',
	},
	profileSection: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 16,
		resizeMode: 'contain'
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 18,
		textAlign: 'center',
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
	buttonSection: {
		width: '100%',
		gap: 12,
	},
}); 