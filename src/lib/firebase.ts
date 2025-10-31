import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
try {
  console.log('Initializing Firebase...');
  console.log('Firebase Config:', JSON.stringify(firebaseConfig, null, 2));
  
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully!');
  } else {
    app = getApp();
    console.log('Using existing Firebase app');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error; // Re-throw to prevent app from starting with broken Firebase
}

export const auth = getAuth(app);
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user ? 'User logged in' : 'No user');
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

console.log('Firebase services initialized');

// Helper functions
export const getUserWithUsername = async (username: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0];
};

export const postToJSON = (doc: any) => {
  const data = doc.data();
  return {
    ...data,
    // Convert Firebase Timestamp to number
    createdAt: data?.createdAt?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
  };
};
