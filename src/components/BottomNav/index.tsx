import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'home' | 'people' | 'events' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
  const { theme } = useTheme();

  const tabs: { id: TabType; icon: string; label: string }[] = [
    { id: 'home', icon: 'map-outline', label: 'Map' },
    { id: 'people', icon: 'people-outline', label: 'People' },
    { id: 'events', icon: 'calendar-outline', label: 'Events' },
    { id: 'profile', icon: 'person-outline', label: 'Profile' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.text}
              style={isActive ? styles.activeIcon : {}}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? theme.colors.primary : theme.colors.text,
                  opacity: isActive ? 1 : 0.6,
                },
              ]}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1C1C1C',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    position: 'relative',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter-Medium',
  },
  activeIcon: {
    textShadowColor: 'rgba(255, 63, 167, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    width: '40%',
    backgroundColor: '#FF3FA7',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});

export { BottomNav };
