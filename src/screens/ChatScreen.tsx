import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../components/themed-text';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatScreenProps {
  onBack: () => void;
  eventTitle?: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    avatar: '☕',
    content: 'Hey everyone! Looking forward to this!',
    timestamp: '2:30 PM',
    isCurrentUser: false,
  },
  {
    id: '2',
    sender: 'You',
    avatar: '🎯',
    content: 'Same here! What should I bring?',
    timestamp: '2:32 PM',
    isCurrentUser: true,
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    avatar: '🏖️',
    content: 'Just bring yourself and good vibes!',
    timestamp: '2:35 PM',
    isCurrentUser: false,
  },
  {
    id: '4',
    sender: 'Alex Kim',
    avatar: '📚',
    content: "Can't wait to meet you all!",
    timestamp: '2:40 PM',
    isCurrentUser: false,
  },
];

const QUICK_REACTIONS = ['👍', '❤️', '😂', '🎉', '🔥'];

export default function ChatScreen({ onBack, eventTitle = 'Beach Party' }: ChatScreenProps) {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: '🎯',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <ThemedText style={styles.headerTitle}>{eventTitle}</ThemedText>
          <Text style={styles.headerSubtitle}>{messages.length} messages</Text>
        </View>
      </View>

      {/* Event Banner */}
      <View style={styles.eventBanner}>
        <LinearGradient
          colors={['rgba(255, 63, 167, 0.1)', 'rgba(255, 63, 167, 0.05)']}
          style={styles.eventBannerGradient}
        >
          <View style={styles.eventIcon}>
            <LinearGradient
              colors={['#FF3FA7', '#9333EA']}
              style={styles.eventIconGradient}
            >
              <Text style={styles.eventEmoji}>🏖️</Text>
            </LinearGradient>
          </View>
          <View style={styles.eventInfo}>
            <ThemedText style={styles.eventTitle}>{eventTitle}</ThemedText>
            <Text style={styles.eventTime}>Tomorrow, 6:00 PM</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.isCurrentUser && styles.messageRowReverse,
            ]}
          >
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['rgba(255, 63, 167, 0.2)', 'rgba(147, 51, 234, 0.2)']}
                style={styles.avatar}
              >
                <Text style={styles.avatarEmoji}>{message.avatar}</Text>
              </LinearGradient>
            </View>

            <View
              style={[
                styles.messageContent,
                message.isCurrentUser && styles.messageContentReverse,
              ]}
            >
              {!message.isCurrentUser && (
                <Text style={styles.senderName}>{message.sender}</Text>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.isCurrentUser && styles.messageBubbleUser,
                ]}
              >
                {message.isCurrentUser ? (
                  <LinearGradient
                    colors={['#FF3FA7', '#9333EA']}
                    style={styles.messageBubbleGradient}
                  >
                    <Text style={styles.messageTextUser}>{message.content}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.messageText}>{message.content}</Text>
                )}
              </View>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick Reactions */}
      <View style={styles.quickReactions}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickReactionsContent}
        >
          {QUICK_REACTIONS.map((reaction) => (
            <TouchableOpacity
              key={reaction}
              style={styles.reactionButton}
            >
              <Text style={styles.reactionEmoji}>{reaction}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={styles.emojiButton}>
          <Ionicons name="happy-outline" size={24} color="rgba(255, 255, 255, 0.6)" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <LinearGradient
            colors={['#FF3FA7', '#9333EA']}
            style={styles.sendButtonGradient}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 15, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'rgba(28, 28, 28, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  eventBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 63, 167, 0.3)',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  eventBannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  eventIconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventEmoji: {
    fontSize: 20,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  messageRowReverse: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    width: 32,
    height: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  avatarEmoji: {
    fontSize: 18,
  },
  messageContent: {
    flex: 1,
    maxWidth: '70%',
  },
  messageContentReverse: {
    alignItems: 'flex-end',
  },
  senderName: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginBottom: 4,
  },
  messageBubble: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageBubbleUser: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'hidden',
  },
  messageBubbleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  messageText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  messageTextUser: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
  },
  quickReactions: {
    paddingVertical: 8,
  },
  quickReactionsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  reactionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionEmoji: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(28, 28, 28, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF3FA7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
