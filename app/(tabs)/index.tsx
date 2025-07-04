import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NoticiasScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Noticias</ThemedText>
        <ThemedText type="subtitle">Mantente informado con las últimas noticias</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedText>
          Aquí se mostrarán las noticias más recientes e importantes.
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
  },
});
