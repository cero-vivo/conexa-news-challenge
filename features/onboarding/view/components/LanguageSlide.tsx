import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemedView } from '@/components/ThemedView';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export const LanguageSlide: React.FC = () => {
	const insets = useSafeAreaInsets();
	const backgroundColor = useThemeColor({}, 'background');

	return (
		<ThemedView style={[styles(insets).slide, { backgroundColor }]}>
			<ThemedView
				style={[styles(insets).content, {
					paddingTop: insets.top + 40,
					paddingBottom: insets.bottom + 40,
				}]}
			>
				<View style={styles(insets).themeToggleContainer}>
					<ThemeToggle />
				</View>
				<LanguageSelector />
			</ThemedView>
		</ThemedView>
	);
};

const styles = (insets: EdgeInsets) => StyleSheet.create({
	slide: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		width: '90%',
		paddingHorizontal: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	themeToggleContainer: {
		position: 'absolute',
		top: insets.top + 20,
		right: insets.right + 20,
	},
}); 