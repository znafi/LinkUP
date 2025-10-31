import { Timestamp, GeoPoint } from 'firebase/firestore';

export type User = {
  id: string;
  username: string;
  displayName: string;
  photoURL: string;
  email: string;
  linkUpScore: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  hostId: string;
  host: Pick<User, 'id' | 'displayName' | 'photoURL'>;
  location: {
    name: string;
    coordinates: GeoPoint;
  };
  startTime: Timestamp;
  endTime: Timestamp;
  attendees: string[];
  maxAttendees?: number;
  imageURL?: string;
  category: string;
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Message = {
  id: string;
  senderId: string;
  sender: Pick<User, 'id' | 'displayName' | 'photoURL'>;
  content: string;
  timestamp: Timestamp;
};

export type Chat = {
  id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type RootStackParamList = {
  Home: undefined;
  CreateEvent: undefined;
  EventDetails: { eventId: string };
  Profile: { userId: string };
  Chat: { chatId: string };
  Auth: undefined;
};
