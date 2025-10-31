import { StyleSheet } from 'react-native';
import { ThemedView } from '../../src/components/themed-view';
import { ThemedText } from '../../src/components/themed-text';

export default function ChatsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Chats</ThemedText>
      <ThemedText style={styles.subtitle}>Your conversations will appear here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
