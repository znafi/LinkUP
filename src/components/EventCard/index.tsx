import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Event } from '../../lib/types';
import { useTheme } from '../../contexts/ThemeContext';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const { theme } = useTheme();
  const { title, host, startTime, attendees, location } = event;
  
  const eventDate = startTime?.toDate ? startTime.toDate() : new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>{formattedTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.detailText, { color: theme.colors.text }]} numberOfLines={1}>
            {location?.name || 'Location TBD'}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.avatars}>
          <Image 
            source={{ uri: host.photoURL || 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.avatar} 
          />
          <View style={styles.attendeeCount}>
            <Text style={styles.attendeeCountText}>+{attendees?.length || 0}</Text>
          </View>
        </View>
        <View style={styles.hostInfo}>
          <Text style={[styles.hostedBy, { color: theme.colors.text }]}>Hosted by</Text>
          <Text style={[styles.hostName, { color: theme.colors.primary }]}>{host.displayName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: '#FF3FA7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    opacity: 0.7,
  },
  detailText: {
    fontSize: 14,
    opacity: 0.9,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1C1C1C',
  },
  attendeeCount: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#1C1C1C',
    marginLeft: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendeeCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hostInfo: {
    marginLeft: 16,
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
});

export { EventCard };
