import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Line } from 'react-native-svg';

type NavItem = 'map' | 'people' | 'events' | 'profile';

interface BottomNavProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  isHidden?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate, isHidden = false }) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isHidden ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHidden, fadeAnim]);

  const getIconColor = (item: NavItem): string => {
    if (active === item) {
      return item === 'events' ? '#22D3EE' : '#FF3FA7';
    }
    return 'rgba(255, 255, 255, 0.7)';
  };

  const getGlowColor = (item: NavItem): string => {
    return item === 'events' ? '#22D3EE' : '#FF3FA7';
  };

  // Map Icon (Location Pin)
  const MapIcon = ({ color }: { color: string }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </Svg>
  );

  // People Icon (Two People)
  const PeopleIcon = ({ color }: { color: string }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
      <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </Svg>
  );

  // Events Icon (Calendar)
  const EventsIcon = ({ color }: { color: string }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
      <Line x1={16} y1={2} x2={16} y2={6} />
      <Line x1={8} y1={2} x2={8} y2={6} />
      <Line x1={3} y1={10} x2={21} y2={10} />
    </Svg>
  );

  // Profile Icon (Person)
  const ProfileIcon = ({ color }: { color: string }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  );

  const renderNavItem = (item: NavItem, Icon: React.ComponentType<{ color: string }>) => {
    const isActive = active === item;
    const color = getIconColor(item);
    const glowColor = getGlowColor(item);

    return (
      <TouchableOpacity
        key={item}
        style={[
          styles.navItem,
          isActive && styles.navItemActive,
          !isActive && styles.navItemInactive,
        ]}
        onPress={() => onNavigate(item)}
        activeOpacity={0.7}
        accessibilityLabel={`Navigate to ${item}`}
        accessibilityState={{ selected: isActive }}
      >
        <View style={styles.iconContainer}>
          <Icon color={color} />
          {isActive && (
            <View
              style={[
                styles.activeIndicator,
                {
                  backgroundColor: glowColor,
                  shadowColor: glowColor,
                },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          paddingBottom: insets.bottom,
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0]
            })
          }]
        }
      ]}
      pointerEvents={isHidden ? 'none' : 'box-none'}
    >
      <View style={styles.navBarWrapper}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.navBar}
        >
          <View style={styles.navList}>
            {renderNavItem('map', MapIcon)}
            {renderNavItem('people', PeopleIcon)}
            {renderNavItem('events', EventsIcon)}
            {renderNavItem('profile', ProfileIcon)}
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
    pointerEvents: 'box-none',
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navBarWrapper: {
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  navBar: {
    flexDirection: 'row',
    borderRadius: 9999,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
    pointerEvents: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  navList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navItem: {
    padding: 8,
    borderRadius: 9999,
  },
  navItemActive: {
    transform: [{ scale: 1.1 }],
    opacity: 1,
  },
  navItemInactive: {
    opacity: 0.7,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default BottomNav;
