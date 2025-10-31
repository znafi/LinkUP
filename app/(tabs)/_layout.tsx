import { Tabs, useRouter, usePathname } from 'expo-router';
import React, { useState } from 'react';
import BottomNav from '../../src/components/BottomNav';

type NavItem = 'map' | 'people' | 'events' | 'profile';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Determine active tab from pathname
  const getActiveTab = (): NavItem => {
    if (pathname.includes('/map')) return 'map';
    if (pathname.includes('/explore')) return 'people';
    if (pathname.includes('/profile')) return 'profile';
    return 'events'; // default to events for index
  };

  const handleNavigate = (item: NavItem) => {
    switch (item) {
      case 'map':
        router.push('/map' as any);
        break;
      case 'people':
        router.push('/explore' as any);
        break;
      case 'events':
        router.push('/' as any);
        break;
      case 'profile':
        router.push('/profile' as any);
        break;
    }
  };

  return (
    <>
      <Tabs
        initialRouteName="map"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide default tab bar
        }}>
        <Tabs.Screen name="map" options={{ title: 'Map' }} />
        <Tabs.Screen name="explore" options={{ title: 'People' }} />
        <Tabs.Screen name="index" options={{ title: 'Events' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        <Tabs.Screen name="chats" options={{ href: null }} />
      </Tabs>

      {/* Custom Bottom Navigation */}
      <BottomNav 
        active={getActiveTab()} 
        onNavigate={handleNavigate}
        isHidden={!!selectedEvent}
      />
    </>
  );
}
