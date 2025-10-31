import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

// Only import MapView on native platforms
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;

try {
  if (Platform.OS !== 'web') {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
  }
} catch (error) {
  console.warn('Maps not available:', error);
}

const { width, height } = Dimensions.get('window');

// Simple mock data
const mockEvents = [
  {
    id: '1',
    title: 'Beach Party',
    description: 'Fun day at the beach with friends',
    location: {
      name: 'Santa Monica Beach',
      coordinates: {
        latitude: 34.0076,
        longitude: -118.4996,
      },
    },
  },
  {
    id: '2',
    title: 'Hiking Adventure',
    description: 'Exploring the local trails',
    location: {
      name: 'Griffith Park',
      coordinates: {
        latitude: 34.1367,
        longitude: -118.2923,
      },
    },
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 34.0522, // Default to Los Angeles
    longitude: -118.2437,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, styles.webFallback]}>
        <Text style={styles.webFallbackText}>
          Map view is not available on web. Please use a mobile device or emulator.
        </Text>
      </View>
    );
  }

  if (!MapView) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {mockEvents.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.coordinates.latitude,
              longitude: event.location.coordinates.longitude,
            }}
            title={event.title}
            description={event.description}
          >
            <View style={styles.marker}>
              <View style={styles.markerPulse} />
              <View style={styles.markerInner}>
                <Text style={styles.markerText}>🎉</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>
      
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search events...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  webFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webFallbackText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  searchText: {
    color: '#888',
    fontSize: 14,
  },
  marker: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPulse: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 25,
    transform: [{ scale: 1 }],
  },
  markerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  markerText: {
    fontSize: 20,
  },
});
