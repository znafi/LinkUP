import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../components/themed-text';

interface Achievement {
  id: string;
  emoji: string;
  label: string;
  earned: boolean;
}

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const achievements: Achievement[] = [
    { id: '1', emoji: '🌟', label: 'Early Adopter', earned: true },
    { id: '2', emoji: '🦋', label: 'Social Butterfly', earned: true },
    { id: '3', emoji: '👑', label: 'Event Master', earned: true },
    { id: '4', emoji: '🦉', label: 'Night Owl', earned: false },
    { id: '5', emoji: '✓', label: 'Verified Pro', earned: false },
    { id: '6', emoji: '🏆', label: 'Top Host', earned: false },
  ];

  const handleBuyCredits = () => {
    // TODO: Implement purchase flow
    console.log('Buy more credits clicked');
    setShowPurchaseModal(true);
  };

  const handleAchievementPress = (achievement: Achievement) => {
    if (achievement.earned) {
      console.log(`Achievement details: ${achievement.label}`);
    } else {
      console.log(`How to unlock: ${achievement.label}`);
    }
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
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
            style={styles.profileCardGradient}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#FF3FA7', '#9333EA', '#22D3EE']}
                style={styles.avatar}
              >
                <ThemedText style={styles.avatarEmoji}>😊</ThemedText>
              </LinearGradient>
            </View>

            {/* Username */}
            <ThemedText style={styles.username}>@username</ThemedText>

            {/* LinkUp Score */}
            <ThemedText style={styles.scoreLabel}>LinkUp Score</ThemedText>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={['#FF3FA7', '#22D3EE', '#FF3FA7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: '78%' }]}
              />
            </View>
            <ThemedText style={styles.scoreText}>78/100</ThemedText>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.statCardGradient}
            >
              <ThemedText style={styles.statNumber}>12</ThemedText>
              <ThemedText style={styles.statLabel}>Events Hosted</ThemedText>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.statCardGradient}
            >
              <ThemedText style={styles.statNumber}>34</ThemedText>
              <ThemedText style={styles.statLabel}>Events Joined</ThemedText>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.statCardGradient}
            >
              <ThemedText style={styles.statNumber}>89%</ThemedText>
              <ThemedText style={styles.statLabel}>Verification</ThemedText>
            </LinearGradient>
          </View>
        </View>

        {/* AI Credits Card */}
        <View style={styles.creditsCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
            style={styles.creditsCardGradient}
          >
            {/* Header */}
            <View style={styles.creditsHeader}>
              <ThemedText style={styles.creditsTitle}>AI Credits</ThemedText>
            </View>

            {/* Credits Display */}
            <View style={styles.creditsDisplay}>
              <View style={styles.creditsIconContainer}>
                <LinearGradient
                  colors={['#22D3EE', '#FF3FA7']}
                  style={styles.creditsIconGradient}
                >
                  <Ionicons name="sparkles" size={24} color="#FFFFFF" />
                </LinearGradient>
              </View>

              <View style={styles.creditsInfo}>
                <ThemedText style={styles.creditsAmount}>150</ThemedText>
                <ThemedText style={styles.creditsLabel}>credits remaining</ThemedText>
              </View>
            </View>

            {/* Buy Button */}
            <TouchableOpacity
              style={styles.buyButton}
              activeOpacity={0.8}
              onPress={handleBuyCredits}
            >
              <LinearGradient
                colors={['#FF3FA7', '#22D3EE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyButtonGradient}
              >
                <ThemedText style={styles.buyButtonText}>Buy More Credits</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Achievements Section */}
        <ThemedText style={styles.sectionTitle}>Achievements</ThemedText>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <TouchableOpacity
              key={achievement.id}
              style={styles.achievementCard}
              activeOpacity={0.8}
              onPress={() => handleAchievementPress(achievement)}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
                style={styles.achievementCardGradient}
              >
                <View
                  style={[
                    styles.achievementBadge,
                    !achievement.earned && styles.achievementBadgeLocked,
                  ]}
                >
                  {achievement.earned ? (
                    <LinearGradient
                      colors={['#FF3FA7', '#9333EA']}
                      style={styles.achievementBadgeGradient}
                    >
                      <ThemedText style={styles.achievementEmoji}>
                        {achievement.emoji}
                      </ThemedText>
                    </LinearGradient>
                  ) : (
                    <View style={styles.achievementBadgeLockedBg}>
                      <ThemedText style={styles.achievementEmoji}>
                        {achievement.emoji}
                      </ThemedText>
                    </View>
                  )}
                </View>
                <ThemedText
                  style={[
                    styles.achievementLabel,
                    !achievement.earned && styles.achievementLabelLocked,
                  ]}
                >
                  {achievement.label}
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
  // Profile Header Card
  profileCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileCardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3FA7',
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statCardGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  // AI Credits Card
  creditsCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  creditsCardGradient: {
    padding: 24,
  },
  creditsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  creditsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  creditsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#22D3EE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  creditsIconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditsInfo: {
    flex: 1,
  },
  creditsAmount: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  creditsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  buyButton: {
    borderRadius: 9999,
    overflow: 'hidden',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  buyButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  // Achievements Section
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  achievementCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementCardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  achievementBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  achievementBadgeLocked: {
    opacity: 0.4,
  },
  achievementBadgeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  achievementBadgeLockedBg: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 32,
  },
  achievementLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
  },
  achievementLabelLocked: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
});

export default ProfileScreen;
