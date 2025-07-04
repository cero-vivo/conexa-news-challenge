import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Autores</ThemedText>

        <ThemedText type='subtitle'>Conoce a los escritores y periodistas</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedText>
          Aquí encontrarás información sobre los autores de las noticias.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
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
  content: {
    flex: 1,
    gap: 16,
  }
});
