import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import { Event } from '../lib/types';
import { RootStackParamList } from '../lib/types';

type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<EventDetailsScreenRouteProp>();
  const { eventId } = route.params;
  
  // Mock data - replace with actual data fetching
  const [event, setEvent] = useState<Event>({
    id: eventId,
    title: 'Beach Party',
    description: 'Join us for a fun day at the beach with music, games, and great company!',
    hostId: 'host1',
    host: {
      id: 'host1',
      displayName: 'Alex Johnson',
      photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    location: {
      name: 'Santa Monica Beach',
      coordinates: {
        latitude: 34.0076,
        longitude: -118.4996,
      } as any,
    },
    startTime: { toDate: () => new Date(Date.now() + 86400000) } as any, // Tomorrow
    endTime: { toDate: () => new Date(Date.now() + 867600000) } as any, // Tomorrow + 10 hours
    attendees: ['user1', 'user2', 'user3'],
    category: 'social',
    isPublic: true,
    createdAt: { toDate: () => new Date() } as any,
    updatedAt: { toDate: () => new Date() } as any,
  });

  const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinEvent = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement join event logic with Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAttending(true);
      // Update local state to reflect the new attendee
      setEvent(prev => ({
        ...prev,
        attendees: [...prev.attendees, 'currentUserId'],
      }));
    } catch (error) {
      console.error('Error joining event:', error);
      Alert.alert('Error', 'Failed to join event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareEvent = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.title}\n\n${event.description}\n\nJoin me at ${event.location.name}!`,
        title: event.title,
      });
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShareEvent} style={styles.shareButton}>
          <Ionicons name="share-social" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
            style={styles.eventImage} 
            resizeMode="cover"
          />
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</Text>
          </View>
        </View>

        {/* Event Content */}
        <View style={styles.content}>
          {/* Title and Host */}
          <View style={styles.titleContainer}>
            <Text style={[styles.eventTitle, { color: theme.colors.text }]}>{event.title}</Text>
            <View style={styles.hostContainer}>
              <Image 
                source={{ uri: event.host.photoURL }} 
                style={styles.avatar} 
              />
              <View style={styles.hostInfo}>
                <Text style={[styles.hostedBy, { color: theme.colors.text }]}>Hosted by</Text>
                <Text style={[styles.hostName, { color: theme.colors.primary }]}>{event.host.displayName}</Text>
              </View>
            </View>
          </View>

          {/* Date and Time */}
          <View style={[styles.detailCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Date & Time</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                  {formatDate(event.startTime?.toDate?.() || new Date())}
                </Text>
                <Text style={[styles.detailSubValue, { color: theme.colors.text, opacity: 0.8 }]}>
                  {formatTime(event.startTime?.toDate?.() || new Date())} - {formatTime(event.endTime?.toDate?.() || new Date())}
                </Text>
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={[styles.detailCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={24} color={theme.colors.primary} />
              <View style={styles.detailTextContainer}>
                <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Location</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{event.location?.name}</Text>
                <Text style={[styles.detailSubValue, { color: theme.colors.primary }]}>Get Directions</Text>
              </View>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: event.location?.coordinates?.latitude || 0,
                  longitude: event.location?.coordinates?.longitude || 0,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: event.location?.coordinates?.latitude || 0,
                    longitude: event.location?.coordinates?.longitude || 0,
                  }}
                >
                  <View style={styles.marker}>
                    <Ionicons name="location" size={24} color={theme.colors.primary} />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>

          {/* About */}
          <View style={[styles.aboutCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About This Event</Text>
            <Text style={[styles.aboutText, { color: theme.colors.text, opacity: 0.9 }]}>
              {event.description}
            </Text>
          </View>

          {/* Attendees */}
          <View style={[styles.attendeesCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.attendeesHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Attendees ({event.attendees.length})
              </Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.attendeesList}>
              {event.attendees.slice(0, 5).map((attendee, index) => (
                <View key={index} style={styles.attendeeAvatar}>
                  <Image 
                    source={{ uri: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg` }} 
                    style={styles.attendeeImage} 
                  />
                </View>
              ))}
              {event.attendees.length > 5 && (
                <View style={styles.moreAttendees}>
                  <Text style={styles.moreAttendeesText}>+{event.attendees.length - 5}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={[styles.footer, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
        <View style={styles.footerContent}>
          <View>
            <Text style={[styles.attendeesCount, { color: theme.colors.text }]}>
              {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} going
            </Text>
            <Text style={[styles.remainingSpots, { color: theme.colors.primary }]}>
              {event.maxAttendees ? `${event.maxAttendees - event.attendees.length} spots left` : 'Unlimited spots'}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleJoinEvent}
            loading={isLoading}
            disabled={isLoading || isAttending}
            style={[styles.joinButton, { 
              backgroundColor: isAttending ? '#4CAF50' : theme.colors.primary 
            }]}
            labelStyle={styles.joinButtonLabel}
          >
            {isAttending ? 'Going' : 'Join Event'}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Space for fixed footer
  },
  titleContainer: {
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostedBy: {
    fontSize: 12,
    opacity: 0.7,
  },
  hostName: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  detailSubValue: {
    fontSize: 14,
  },
  mapContainer: {
    marginTop: 16,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF3FA7',
  },
  aboutCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  attendeesCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  attendeesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  attendeesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attendeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  attendeeImage: {
    width: '100%',
    height: '100%',
  },
  moreAttendees: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAttendeesText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  remainingSpots: {
    fontSize: 12,
    marginTop: 2,
  },
  joinButton: {
    borderRadius: 25,
    paddingHorizontal: 24,
    elevation: 0,
  },
  joinButtonLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6,
  },
});

export default EventDetailsScreen;
