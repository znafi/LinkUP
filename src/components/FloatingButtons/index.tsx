import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface FloatingButtonsProps {
  onCreateEvent: () => void;
  onSearch?: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onCreateEvent, onSearch }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Search Button */}
      <TouchableOpacity
        style={[styles.button, styles.searchButton, { backgroundColor: theme.colors.glass }]}
        onPress={onSearch}
        activeOpacity={0.8}
      >
        <Ionicons name="search" size={22} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Create Event Button */}
      <TouchableOpacity
        style={[styles.button, styles.createButton, { backgroundColor: theme.colors.primary }]}
        onPress={onCreateEvent}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    alignItems: 'flex-end',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  createButton: {
    backgroundColor: '#FF3FA7',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});

export { FloatingButtons };
