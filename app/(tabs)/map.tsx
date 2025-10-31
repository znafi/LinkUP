import { Platform } from 'react-native';
import { ThemedView } from '../../src/components/themed-view';
import { ThemedText } from '../../src/components/themed-text';
import { StyleSheet } from 'react-native';

let LandingScreen: React.ComponentType | null = null;

// Only import LandingScreen on native platforms
if (Platform.OS !== 'web') {
  try {
    LandingScreen = require('../../src/screens/LandingScreen').default;
  } catch (error) {
    console.warn('Failed to load LandingScreen:', error);
  }
}

export default function MapTab() {
  if (Platform.OS === 'web') {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.webMessage}>
          Map view is not available on web. Please use a mobile device or emulator to view the map.
        </ThemedText>
      </ThemedView>
    );
  }

  if (!LandingScreen) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading map...</ThemedText>
      </ThemedView>
    );
  }

  return <LandingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMessage: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});
