import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

// Simple mock data
const mockEvents = [
  {
    id: '1',
    title: 'Beach Party',
    description: 'Fun day at the beach with friends',
    location: 'Santa Monica Beach',
    date: 'Tomorrow, 2:00 PM',
    attendees: 24,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Hiking Adventure',
    description: 'Exploring the local trails',
    location: 'Griffith Park',
    date: 'Saturday, 9:00 AM',
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Tech Meetup',
    description: 'Networking with local developers',
    location: 'Downtown Co-working Space',
    date: 'Friday, 6:30 PM',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop',
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Events</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search events...</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {mockEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventImageContainer}>
              <Image 
                source={{ uri: event.image }} 
                style={styles.eventImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>
              <View style={styles.eventMeta}>
                <Text style={styles.eventLocation}>📍 {event.location}</Text>
                <Text style={styles.eventDate}>📅 {event.date}</Text>
              </View>
              <View style={styles.eventFooter}>
                <Text style={styles.eventAttendees}>👥 {event.attendees} going</Text>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>🏠</Text>
          <Text style={styles.navButtonLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>🔍</Text>
          <Text style={styles.navButtonLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.addButton]}>
          <Text style={[styles.navButtonText, styles.addButtonText]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>💬</Text>
          <Text style={styles.navButtonLabel}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>👤</Text>
          <Text style={styles.navButtonLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingBottom: 70,
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchText: {
    color: '#888',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImageContainer: {
    height: 150,
    width: '100%',
  },
  eventImage: {
    flex: 1,
    width: '100%',
  },
  eventInfo: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  eventDescription: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventLocation: {
    color: '#666',
    fontSize: 12,
  },
  eventDate: {
    color: '#666',
    fontSize: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventAttendees: {
    color: '#666',
    fontSize: 12,
  },
  joinButton: {
    backgroundColor: '#FF3FA7',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  navButton: {
    alignItems: 'center',
    padding: 5,
  },
  navButtonText: {
    fontSize: 20,
    marginBottom: 2,
  },
  navButtonLabel: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF3FA7',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    marginBottom: 0,
    lineHeight: 30,
  },
});
