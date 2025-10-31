import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Modal, Animated, Dimensions, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { CreateEventModal } from '../components/CreateEventModal';
import ChatScreen from './ChatScreen';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const LandingScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Default coordinates
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Mock data for events and friends
  const events = [
    { 
      id: 1, 
      latitude: 37.78825, 
      longitude: -122.4324, 
      name: 'Beach Party',
      host: { name: 'Mike Johnson', emoji: '👨' },
      date: 'Tomorrow, Oct 23',
      time: '6:00 PM - 11:00 PM',
      location: 'Santa Monica Beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop',
    },
    { 
      id: 2, 
      latitude: 37.79025, 
      longitude: -122.4354, 
      name: 'Music Festival',
      host: { name: 'Sarah Kim', emoji: '👩' },
      date: 'Saturday, Oct 24',
      time: '2:00 PM - 10:00 PM',
      location: 'Golden Gate Park',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop',
    },
    { 
      id: 3, 
      latitude: 37.78625, 
      longitude: -122.4294, 
      name: 'Art Gallery',
      host: { name: 'Alex Chen', emoji: '🧑' },
      date: 'Sunday, Oct 25',
      time: '4:00 PM - 8:00 PM',
      location: 'SFMOMA',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=500&auto=format&fit=crop',
    },
  ];

  const friends = [
    { id: 1, latitude: 37.78925, longitude: -122.4314, avatar: '👤' },
    { id: 2, latitude: 37.78725, longitude: -122.4334, avatar: '👤' },
    { id: 3, latitude: 37.79125, longitude: -122.4304, avatar: '👤' },
    { id: 4, latitude: 37.78525, longitude: -122.4344, avatar: '👤' },
  ];

  // Show chat screen if active
  if (showChat) {
    return <ChatScreen onBack={() => setShowChat(false)} eventTitle={selectedEvent?.name} />;
  }

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1a0a2e', '#16213e', '#0f0f0f']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Map View with Dark Style */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={false}
          showsMyLocationButton={false}
          customMapStyle={darkMapStyle}
        >
          {/* User Location Marker (Center) */}
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
            <View style={styles.userMarker}>
              <View style={styles.userMarkerGlow} />
              <View style={styles.userMarkerInner} />
            </View>
          </Marker>

          {/* Event Markers */}
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{ latitude: event.latitude, longitude: event.longitude }}
              onPress={() => setSelectedEvent(event)}
            >
              <View style={styles.eventMarker}>
                <View style={styles.eventMarkerGlow} />
                <Ionicons name="location" size={32} color="#FF3FA7" />
              </View>
            </Marker>
          ))}

          {/* Friend Markers */}
          {friends.map((friend) => (
            <Marker
              key={friend.id}
              coordinate={{ latitude: friend.latitude, longitude: friend.longitude }}
            >
              <View style={styles.friendMarker}>
                <View style={styles.friendMarkerGlow} />
                <View style={styles.friendMarkerInner}>
                  <ThemedText style={styles.friendAvatar}>{friend.avatar}</ThemedText>
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* Top Floating Buttons */}
      <View style={[styles.topButtons, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <View style={styles.createButtonGlow} />
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => setShowChat(true)}
        >
          <View style={styles.chatButtonGlow} />
          <Ionicons name="chatbubble-outline" size={28} color="#22D3EE" />
        </TouchableOpacity>
      </View>

      {/* Event Preview Modal */}
      <Modal
        visible={!!selectedEvent}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedEvent(null)}
        >
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <LinearGradient
              colors={['rgba(20, 20, 20, 0.98)', 'rgba(10, 10, 10, 0.99)']}
              style={styles.modalGradient}
            >
              {/* Handle Bar */}
              <View style={styles.handleBar} />

              {/* Close Button */}
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedEvent(null)}
              >
                <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>

              {/* Event Title */}
              <ThemedText style={styles.modalTitle}>{selectedEvent?.name}</ThemedText>

              {/* Host Info */}
              <View style={styles.hostRow}>
                <View style={styles.hostAvatar}>
                  <LinearGradient
                    colors={['#FF3FA7', '#9333EA']}
                    style={styles.hostAvatarGradient}
                  >
                    <ThemedText style={styles.hostEmoji}>{selectedEvent?.host?.emoji}</ThemedText>
                  </LinearGradient>
                </View>
                <ThemedText style={styles.hostName}>{selectedEvent?.host?.name}</ThemedText>
              </View>

              {/* Event Details */}
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name="calendar-outline" size={20} color="#22D3EE" />
                  </View>
                  <ThemedText style={styles.detailText}>{selectedEvent?.date}</ThemedText>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name="time-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
                  </View>
                  <ThemedText style={styles.detailText}>{selectedEvent?.time}</ThemedText>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.iconWrapper}>
                    <Ionicons name="location-outline" size={20} color="#FF3FA7" />
                  </View>
                  <ThemedText style={styles.detailText}>{selectedEvent?.location}</ThemedText>
                </View>
              </View>

              {/* Event Image */}
              <View style={styles.eventImageContainer}>
                <Image 
                  source={{ uri: selectedEvent?.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                {/* Gradient Overlay for depth */}
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
                  style={styles.imageOverlay}
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.actionButtonText}>Like</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    setSelectedEvent(null);
                    setShowChat(true);
                  }}
                >
                  <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.actionButtonText}>Chat</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.joinActionButton]}>
                  <LinearGradient
                    colors={['#FF3FA7', '#9333EA']}
                    style={styles.joinActionGradient}
                  >
                    <Ionicons name="person-add-outline" size={24} color="#FFFFFF" />
                    <ThemedText style={styles.actionButtonText}>Join</ThemedText>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.actionButtonText}>Share</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Swipe Up Hint */}
              <ThemedText style={styles.swipeHint}>Swipe up for full details</ThemedText>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onGeneratePreview={() => {
          console.log('Generate AI Preview');
          // TODO: Implement AI preview generation
        }}
      />
    </View>
  );
};

// Dark map style for neon aesthetic
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#4a4a6a' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6a6a8a' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4a4a6a' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a2e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a2e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2a2a3e' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#2a2a4e' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0f0f1f' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Top Floating Buttons
  topButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 100,
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3FA7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  createButtonGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF3FA7',
    opacity: 0.3,
  },
  chatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderWidth: 2,
    borderColor: '#22D3EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  chatButtonGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22D3EE',
    opacity: 0.2,
  },
  // User Marker (Center - Cyan Glow)
  userMarker: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMarkerGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22D3EE',
    opacity: 0.4,
  },
  userMarkerInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#22D3EE',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  // Event Markers (Magenta Glow)
  eventMarker: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventMarkerGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF3FA7',
    opacity: 0.4,
  },
  // Friend Markers (Cyan Border)
  friendMarker: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendMarkerGlow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22D3EE',
    opacity: 0.3,
  },
  friendMarkerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3FA7',
    borderWidth: 2,
    borderColor: '#22D3EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  friendAvatar: {
    fontSize: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: SCREEN_HEIGHT * 0.75,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 24,
    paddingTop: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  hostAvatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostEmoji: {
    fontSize: 20,
  },
  hostName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  detailsContainer: {
    marginBottom: 20,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  eventImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: 4,
  },
  joinActionButton: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  joinActionGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 4,
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  swipeHint: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LandingScreen;
