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

interface Person {
  id: string;
  name: string;
  emoji: string;
  distance: string;
  mutualFriends: number;
  score: number;
  invited?: boolean;
}

const PeopleScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedPeople, setInvitedPeople] = useState<Set<string>>(new Set());

  // Sample data
  const allPeople: Person[] = [
    {
      id: '1',
      name: 'Alex Chen',
      emoji: '👨',
      distance: '0.3 km',
      mutualFriends: 5,
      score: 85,
    },
    {
      id: '2',
      name: 'Sarah Kim',
      emoji: '👩',
      distance: '0.5 km',
      mutualFriends: 3,
      score: 72,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      emoji: '🧑',
      distance: '0.8 km',
      mutualFriends: 8,
      score: 91,
    },
    {
      id: '4',
      name: 'Emma Wilson',
      emoji: '👩',
      distance: '1.2 km',
      mutualFriends: 2,
      score: 68,
    },
  ];

  // Filter people based on search query
  const people = allPeople.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (personId: string) => {
    setInvitedPeople((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(personId)) {
        newSet.delete(personId);
      } else {
        newSet.add(personId);
      }
      return newSet;
    });
  };

  const renderPersonCard = (person: Person) => {
    const isInvited = invitedPeople.has(person.id);
    return (
      <View key={person.id} style={styles.personCard}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          style={styles.personCardGradient}
        >
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#FF3FA7', '#9333EA']}
              style={styles.avatar}
            >
              <ThemedText style={styles.avatarEmoji}>{person.emoji}</ThemedText>
            </LinearGradient>
          </View>

          {/* Info */}
          <View style={styles.personInfo}>
            <ThemedText style={styles.personName}>{person.name}</ThemedText>
            <ThemedText style={styles.personDistance}>
              {person.distance} away • {person.mutualFriends} mutual friends
            </ThemedText>
            <ThemedText style={styles.scoreLabel}>LinkUp Score</ThemedText>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={['#FF3FA7', 'rgba(255, 63, 167, 0.8)', 'rgba(255, 63, 167, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${person.score}%` }]}
              />
            </View>
          </View>

          {/* Invite Button */}
          <TouchableOpacity
            style={styles.inviteButton}
            activeOpacity={0.8}
            onPress={() => handleInvite(person.id)}
          >
            <LinearGradient
              colors={isInvited ? ['#22D3EE', '#22D3EE'] : ['#FF3FA7', '#FF1493']}
              style={styles.inviteButtonGradient}
            >
              <ThemedText style={styles.inviteButtonText}>
                {isInvited ? 'Invited ✓' : 'Invite'}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0F0F0F', '#1C1C1C']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Nearby People</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Connect with people around you
          </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
            style={styles.searchGradient}
          >
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.4)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search people..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </LinearGradient>
        </View>

        {/* People List */}
        <View style={styles.peopleList}>
          {people.map((person) => renderPersonCard(person))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
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
  },
  searchContainer: {
    marginBottom: 24,
    borderRadius: 9999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  peopleList: {
    gap: 16,
  },
  personCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  personCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  avatarContainer: {
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  personDistance: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 4,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  inviteButton: {
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  inviteButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default PeopleScreen;
