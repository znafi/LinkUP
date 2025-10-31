import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('AuthContext: Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('Auth state changed - User:', user ? user.uid : 'No user');
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error);
        setError(error);
        setLoading(false);
      },
      () => {
        console.log('Auth state observer completed');
        setLoading(false);
      }
    );

    return () => {
      console.log('AuthContext: Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
