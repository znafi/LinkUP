import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../components/themed-text';
import { CreateEventModal } from '../components/CreateEventModal';

interface Event {
  id: string;
  title: string;
  emoji: string;
  host: {
    name: string;
    emoji: string;
  };
  date: string;
  attendees: number;
  location: string;
  verified: boolean;
}

type TabType = 'trending' | 'friends' | 'past';

interface EventsScreenProps {
  onEventPress?: (event: Event) => void;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ onEventPress }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock event data organized by tab
  const allEvents = {
    trending: [
      {
        id: '1',
        title: 'Downtown Food Festival',
        emoji: '🍕',
        host: {
          name: 'Emma Davis',
          emoji: '👩',
        },
        date: 'Oct 25, 12:00 PM',
        attendees: 156,
        location: 'City Center Plaza',
        verified: true,
      },
      {
        id: '2',
        title: 'Live Music Night',
        emoji: '🎵',
        host: {
          name: 'Olivia Brown',
          emoji: '👩',
        },
        date: 'Oct 26, 8:00 PM',
        attendees: 45,
        location: 'The Blue Note',
        verified: false,
      },
      {
        id: '3',
        title: 'Art Gallery Opening',
        emoji: '🎨',
        host: {
          name: 'James Wilson',
          emoji: '🧑',
        },
        date: 'Oct 27, 6:00 PM',
        attendees: 89,
        location: 'Modern Art Museum',
        verified: true,
      },
    ],
    friends: [
      {
        id: 'f1',
        title: 'Weekend BBQ Party',
        emoji: '🍖',
        host: {
          name: 'Alex Johnson',
          emoji: '🧑',
        },
        date: 'Oct 28, 2:00 PM',
        attendees: 12,
        location: 'Central Park',
        verified: true,
      },
      {
        id: 'f2',
        title: 'Game Night',
        emoji: '🎲',
        host: {
          name: 'Sarah Miller',
          emoji: '👩',
        },
        date: 'Oct 29, 7:00 PM',
        attendees: 8,
        location: "Sarah's Place",
        verified: true,
      },
      {
        id: 'f3',
        title: 'Coffee Meetup',
        emoji: '☕',
        host: {
          name: 'Mike Chen',
          emoji: '👨',
        },
        date: 'Oct 30, 10:00 AM',
        attendees: 5,
        location: 'Brew & Bean Cafe',
        verified: true,
      },
    ],
    past: [
      {
        id: 'p1',
        title: 'Tech Meetup',
        emoji: '💻',
        host: {
          name: 'Dev Community',
          emoji: '👨‍💻',
        },
        date: 'Oct 20, 6:00 PM',
        attendees: 34,
        location: 'Tech Hub',
        verified: true,
      },
      {
        id: 'p2',
        title: 'Beach Cleanup',
        emoji: '🏖️',
        host: {
          name: 'Eco Warriors',
          emoji: '🌍',
        },
        date: 'Oct 15, 9:00 AM',
        attendees: 27,
        location: 'Sunset Beach',
        verified: true,
      },
      {
        id: 'p3',
        title: 'Movie Night',
        emoji: '🎬',
        host: {
          name: 'Film Club',
          emoji: '🎥',
        },
        date: 'Oct 10, 7:30 PM',
        attendees: 18,
        location: 'Cinema Downtown',
        verified: false,
      },
    ],
  };

  // Get events for the active tab
  const events = allEvents[activeTab] || [];

  const renderEventCard = (event: Event) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={styles.eventCard}
        onPress={() => setSelectedEvent(event)}
        activeOpacity={0.8}
      >
        {/* Thumbnail Section */}
        <View style={styles.eventThumbnail}>
          <LinearGradient
            colors={[
              'rgba(255, 63, 167, 0.2)',
              'rgba(34, 211, 238, 0.1)',
              'rgba(255, 63, 167, 0.2)',
            ]}
            style={styles.thumbnailGradient}
          >
            <ThemedText style={styles.eventEmoji}>{event.emoji}</ThemedText>
          </LinearGradient>

          {/* Verification Badge */}
          <View style={styles.verificationBadge}>
            <LinearGradient
              colors={
                event.verified
                  ? ['rgba(255, 63, 167, 0.9)', 'rgba(255, 20, 147, 0.9)']
                  : ['rgba(34, 211, 238, 0.9)', 'rgba(34, 211, 238, 0.9)']
              }
              style={styles.badgeGradient}
            >
              <ThemedText style={styles.badgeText}>
                {event.verified ? '✓ Verified' : 'Likely'}
              </ThemedText>
            </LinearGradient>
          </View>
        </View>

        {/* Event Info Section */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.eventInfo}
        >
          <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>

          {/* Host */}
          <View style={styles.eventRow}>
            <View style={styles.hostAvatar}>
              <LinearGradient
                colors={['#FF3FA7', '#9333EA']}
                style={styles.hostAvatarGradient}
              >
                <ThemedText style={styles.hostEmoji}>{event.host.emoji}</ThemedText>
              </LinearGradient>
            </View>
            <ThemedText style={styles.eventRowText}>{event.host.name}</ThemedText>
          </View>

          {/* Date */}
          <View style={styles.eventRow}>
            <Ionicons name="calendar-outline" size={16} color="rgba(255, 255, 255, 0.6)" />
            <ThemedText style={styles.eventRowText}>{event.date}</ThemedText>
          </View>

          {/* Attendees */}
          <View style={styles.eventRow}>
            <Ionicons name="people-outline" size={16} color="rgba(255, 255, 255, 0.6)" />
            <ThemedText style={styles.eventRowText}>{event.attendees} going</ThemedText>
          </View>

          {/* Location */}
          <View style={styles.eventRow}>
            <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.6)" />
            <ThemedText style={styles.eventRowText}>{event.location}</ThemedText>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1a0a2e', '#16213e', '#0f0f0f']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Blurred Map Background Texture */}
      <View style={styles.backgroundTexture} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <ThemedText style={styles.headerTitle}>Events</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Discover what's happening</ThemedText>

        {/* Tab Navigation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'trending' && styles.tabActive]}
            onPress={() => setActiveTab('trending')}
            activeOpacity={0.8}
          >
            {activeTab === 'trending' ? (
              <LinearGradient
                colors={['#FF3FA7', '#FF1493']}
                style={styles.tabActiveGradient}
              >
                <ThemedText style={styles.tabTextActive}>Trending 🔥</ThemedText>
              </LinearGradient>
            ) : (
              <ThemedText style={styles.tabText}>Trending 🔥</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
            onPress={() => setActiveTab('friends')}
            activeOpacity={0.8}
          >
            {activeTab === 'friends' ? (
              <LinearGradient
                colors={['#FF3FA7', '#FF1493']}
                style={styles.tabActiveGradient}
              >
                <ThemedText style={styles.tabTextActive}>Friends 👬</ThemedText>
              </LinearGradient>
            ) : (
              <ThemedText style={styles.tabText}>Friends 👬</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.tabActive]}
            onPress={() => setActiveTab('past')}
            activeOpacity={0.8}
          >
            {activeTab === 'past' ? (
              <LinearGradient
                colors={['#FF3FA7', '#FF1493']}
                style={styles.tabActiveGradient}
              >
                <ThemedText style={styles.tabTextActive}>Past 🕓</ThemedText>
              </LinearGradient>
            ) : (
              <ThemedText style={styles.tabText}>Past 🕓</ThemedText>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {events.map((event) => renderEventCard(event))}
      </ScrollView>

      {/* Floating Create Button */}
      <View style={[styles.floatingButtonContainer, { bottom: insets.bottom + 80 }]}>
        <TouchableOpacity 
          style={styles.createButton} 
          activeOpacity={0.8}
          onPress={() => setShowCreateModal(true)}
        >
          <View style={styles.createButtonGlow} />
          <LinearGradient
            colors={['#FF3FA7', '#FF1493']}
            style={styles.createButtonGradient}
          >
            <Ionicons name="add" size={32} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Event Preview Bottom Sheet */}
      {selectedEvent && (
        <TouchableOpacity
          style={styles.bottomSheetOverlay}
          activeOpacity={1}
          onPress={() => setSelectedEvent(null)}
        >
          <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
            <LinearGradient
              colors={['rgba(28, 28, 28, 0.98)', 'rgba(15, 15, 15, 0.99)']}
              style={styles.bottomSheetGradient}
            >
              <View style={styles.bottomSheetHandle} />
              <ThemedText style={styles.bottomSheetTitle}>
                {selectedEvent.title}
              </ThemedText>
              <ThemedText style={styles.bottomSheetDescription}>
                {selectedEvent.description}
              </ThemedText>
              <View style={styles.bottomSheetInfo}>
                <Ionicons name="location" size={20} color="#22D3EE" />
                <ThemedText style={styles.bottomSheetInfoText}>
                  {selectedEvent.location}
                </ThemedText>
              </View>
              <View style={styles.bottomSheetInfo}>
                <Ionicons name="calendar" size={20} color="#FF3FA7" />
                <ThemedText style={styles.bottomSheetInfoText}>
                  {selectedEvent.date} at {selectedEvent.time}
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.bottomSheetButton}>
                <LinearGradient
                  colors={['#FF3FA7', '#FF1493']}
                  style={styles.bottomSheetButtonGradient}
                >
                  <ThemedText style={styles.bottomSheetButtonText}>
                    View Details
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      )}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  backgroundTexture: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 10, 46, 0.3)',
    opacity: 0.5,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 24,
  },
  tabsContainer: {
    marginBottom: 8,
  },
  tabsContent: {
    gap: 8,
  },
  tab: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  tabActive: {
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  tabActiveGradient: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34, 211, 238, 0.2)',
    borderWidth: 1,
    borderColor: '#22D3EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  searchContainer: {
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  searchGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  eventThumbnail: {
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  thumbnailGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventEmoji: {
    fontSize: 60,
  },
  verificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  badgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hostAvatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostEmoji: {
    fontSize: 12,
  },
  eventRowText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  floatingButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 100,
  },
  createButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF3FA7',
    opacity: 0.3,
  },
  createButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomSheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    zIndex: 200,
  },
  bottomSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  bottomSheetGradient: {
    padding: 24,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 63, 167, 0.4)',
  },
  bottomSheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#FF3FA7',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.6,
  },
  bottomSheetTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  bottomSheetDescription: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
    lineHeight: 24,
  },
  bottomSheetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomSheetInfoText: {
    fontSize: 15,
    color: '#CCC',
    marginLeft: 10,
  },
  bottomSheetButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomSheetButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  bottomSheetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default EventsScreen;
