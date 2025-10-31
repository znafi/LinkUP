import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

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
];

export default function HomeScreen() {
  const [region, setRegion] = useState({
    latitude: 34.0522, // Default to Los Angeles
    longitude: -118.2437,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 63, 167, 0.3)',
  },
  markerInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF3FA7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 16,
  },
});
