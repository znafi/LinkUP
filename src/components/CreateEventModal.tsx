import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './themed-text';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePreview?: () => void;
}

const EVENT_TAGS = ['Outdoor', 'Food', 'Music', 'Sports', 'Study', 'Party', 'Coffee', 'Gaming'];

export function CreateEventModal({ isOpen, onClose, onGeneratePreview }: CreateEventModalProps) {
  const insets = useSafeAreaInsets();
  const [eventData, setEventData] = useState({
    title: '',
    date: new Date(),
    time: new Date(),
    location: '',
    privacy: 'public' as 'public' | 'friends',
    tags: [] as string[],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleTag = (tag: string) => {
    setEventData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter((t) => t !== tag) 
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = () => {
    console.log('[LinkUp] Creating event:', eventData);
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { paddingBottom: insets.bottom + 20 }]}>
          <LinearGradient
            colors={['rgba(20, 20, 20, 0.98)', 'rgba(10, 10, 10, 0.99)']}
            style={styles.modalContent}
          >
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.headerTitle}>Create Event</ThemedText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
              >
                <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              {/* Event Title */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What's happening?"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={eventData.title}
                  onChangeText={(text) => setEventData({ ...eventData, title: text })}
                />
              </View>

              {/* Date & Time */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <View style={styles.labelRow}>
                    <Ionicons name="calendar-outline" size={16} color="#22D3EE" />
                    <Text style={styles.label}>Date</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.inputText}>{formatDate(eventData.date)}</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <View style={styles.labelRow}>
                    <Ionicons name="time-outline" size={16} color="#22D3EE" />
                    <Text style={styles.label}>Time</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.inputText}>{formatTime(eventData.time)}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Date/Time Pickers */}
              {showDatePicker && (
                <DateTimePicker
                  value={eventData.date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setEventData({ ...eventData, date: selectedDate });
                    }
                  }}
                />
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={eventData.time}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) {
                      setEventData({ ...eventData, time: selectedTime });
                    }
                  }}
                />
              )}

              {/* Location */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Ionicons name="location-outline" size={16} color="#FF3FA7" />
                  <Text style={styles.label}>Location</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Where is it?"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={eventData.location}
                  onChangeText={(text) => setEventData({ ...eventData, location: text })}
                />
              </View>

              {/* Privacy Toggle */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Privacy</Text>
                <View style={styles.privacyButtons}>
                  <TouchableOpacity
                    style={[
                      styles.privacyButton,
                      eventData.privacy === 'public' && styles.privacyButtonActive,
                    ]}
                    onPress={() => setEventData({ ...eventData, privacy: 'public' })}
                  >
                    {eventData.privacy === 'public' ? (
                      <LinearGradient
                        colors={['#FF3FA7', '#9333EA']}
                        style={styles.privacyButtonGradient}
                      >
                        <Text style={styles.privacyButtonTextActive}>Public</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.privacyButtonText}>Public</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.privacyButton,
                      eventData.privacy === 'friends' && styles.privacyButtonActive,
                    ]}
                    onPress={() => setEventData({ ...eventData, privacy: 'friends' })}
                  >
                    {eventData.privacy === 'friends' ? (
                      <LinearGradient
                        colors={['#FF3FA7', '#9333EA']}
                        style={styles.privacyButtonGradient}
                      >
                        <Text style={styles.privacyButtonTextActive}>Friends Only</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.privacyButtonText}>Friends Only</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tags */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tags</Text>
                <View style={styles.tagsContainer}>
                  {EVENT_TAGS.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tag,
                        eventData.tags.includes(tag) && styles.tagActive,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      {eventData.tags.includes(tag) ? (
                        <LinearGradient
                          colors={['#FF3FA7', '#9333EA']}
                          style={styles.tagGradient}
                        >
                          <Text style={styles.tagTextActive}>{tag}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.tagText}>{tag}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* AI Preview Button */}
              <TouchableOpacity
                style={styles.aiButton}
                onPress={onGeneratePreview}
              >
                <View style={styles.aiButtonContent}>
                  <Ionicons name="sparkles" size={20} color="#FF3FA7" />
                  <Text style={styles.aiButtonText}>Generate AI Video Preview</Text>
                </View>
              </TouchableOpacity>

              {/* Create Button */}
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleSubmit}
              >
                <LinearGradient
                  colors={['#FF3FA7', '#9333EA']}
                  style={styles.createButtonGradient}
                >
                  <Text style={styles.createButtonText}>Create Event</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  modalContent: {
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  privacyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  privacyButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  privacyButtonActive: {
    borderColor: 'transparent',
  },
  privacyButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  privacyButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 12,
  },
  privacyButtonTextActive: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  tagActive: {
    borderColor: 'transparent',
  },
  tagGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagTextActive: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  aiButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 63, 167, 0.5)',
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  aiButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  aiButtonText: {
    color: '#FF3FA7',
    fontSize: 14,
    fontWeight: '500',
  },
  createButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  createButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
