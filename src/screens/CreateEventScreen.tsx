import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateEventScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: 'social',
    isPublic: true,
    maxAttendees: '10',
  });
  
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!eventData.title || !eventData.description || !location) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement event creation with Firebase
      console.log('Creating event:', {
        ...eventData,
        date,
        location,
        image,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back on success
      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Create Event</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Event Image */}
        <TouchableOpacity 
          style={[styles.imageUpload, { backgroundColor: theme.colors.card }]}
          onPress={pickImage}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="camera" size={32} color={theme.colors.text} />
              <Text style={[styles.uploadText, { color: theme.colors.text }]}>
                Add Event Photo
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Event Title */}
        <TextInput
          label="Event Title"
          value={eventData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          style={[styles.input, { backgroundColor: theme.colors.card }]}
          theme={{
            colors: {
              primary: theme.colors.primary,
              text: theme.colors.text,
              placeholder: theme.colors.text,
              background: theme.colors.card,
            },
          }}
        />

        {/* Event Description */}
        <TextInput
          label="Description"
          value={eventData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea, { backgroundColor: theme.colors.card }]}
          theme={{
            colors: {
              primary: theme.colors.primary,
              text: theme.colors.text,
              placeholder: theme.colors.text,
              background: theme.colors.card,
            },
          }}
        />

        {/* Date & Time Picker */}
        <TouchableOpacity 
          style={[styles.datePicker, { backgroundColor: theme.colors.card }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={20} color={theme.colors.text} style={styles.icon} />
          <Text style={[styles.dateText, { color: theme.colors.text }]}>
            {date.toLocaleString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        {/* Location */}
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          style={[styles.input, { backgroundColor: theme.colors.card }]}
          left={
            <TextInput.Icon 
              name="map-marker" 
              color={theme.colors.text}
            />
          }
          theme={{
            colors: {
              primary: theme.colors.primary,
              text: theme.colors.text,
              placeholder: theme.colors.text,
              background: theme.colors.card,
            },
          }}
        />

        {/* Category Picker */}
        <View style={[styles.pickerContainer, { backgroundColor: theme.colors.card }]}>
          <Ionicons name="pricetags" size={20} color={theme.colors.text} style={styles.icon} />
          <Picker
            selectedValue={eventData.category}
            onValueChange={(value) => handleInputChange('category', value)}
            style={[styles.picker, { color: theme.colors.text }]}
            dropdownIconColor={theme.colors.text}
          >
            <Picker.Item label="Social" value="social" />
            <Picker.Item label="Sports" value="sports" />
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="Food & Drink" value="food" />
            <Picker.Item label="Arts" value="arts" />
            <Picker.Item label="Business" value="business" />
          </Picker>
        </View>

        {/* Max Attendees */}
        <TextInput
          label="Max Attendees"
          value={eventData.maxAttendees}
          onChangeText={(text) => handleInputChange('maxAttendees', text.replace(/[^0-9]/g, ''))}
          keyboardType="number-pad"
          style={[styles.input, { backgroundColor: theme.colors.card }]}
          left={
            <TextInput.Icon 
              name="account-group" 
              color={theme.colors.text}
            />
          }
          theme={{
            colors: {
              primary: theme.colors.primary,
              text: theme.colors.text,
              placeholder: theme.colors.text,
              background: theme.colors.card,
            },
          }}
        />

        {/* Privacy Toggle */}
        <View style={[styles.privacyContainer, { backgroundColor: theme.colors.card }]}>
          <Ionicons 
            name={eventData.isPublic ? 'earth' : 'lock-closed'} 
            size={20} 
            color={theme.colors.text} 
            style={styles.icon} 
          />
          <View style={styles.privacyTextContainer}>
            <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>
              {eventData.isPublic ? 'Public Event' : 'Private Event'}
            </Text>
            <Text style={[styles.privacySubtitle, { color: theme.colors.text }]}>
              {eventData.isPublic 
                ? 'Anyone can see and join this event' 
                : 'Only people with the link can join'}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => handleInputChange('isPublic', !eventData.isPublic)}
            style={[
              styles.toggleButton,
              { 
                backgroundColor: eventData.isPublic 
                  ? 'rgba(34, 211, 238, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)' 
              }
            ]}
          >
            <View 
              style={[
                styles.toggleCircle,
                { 
                  backgroundColor: theme.colors.primary,
                  alignSelf: eventData.isPublic ? 'flex-end' : 'flex-start'
                }
              ]} 
            />
          </TouchableOpacity>
        </View>

        {/* Create Button */}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.createButtonContent}
          labelStyle={styles.createButtonLabel}
        >
          Create Event
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  imageUpload: {
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  input: {
    marginBottom: 16,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 12,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  privacyTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  privacySubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  createButton: {
    borderRadius: 25,
    elevation: 0,
    marginBottom: 32,
  },
  createButtonContent: {
    height: 50,
  },
  createButtonLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateEventScreen;
