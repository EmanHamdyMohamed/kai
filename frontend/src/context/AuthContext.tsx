'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence first, then listen to auth state changes
    const initializeAuth = async () => {
      try {
        console.log('Setting persistence to browserLocal');
        await setPersistence(auth, browserLocalPersistence);
        console.log('Persistence set to browserLocal');
      } catch (error) {
        console.error('Error setting persistence:', error);
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      console.log('User object:', user);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      await sendEmailVerification(userCredential.user);
    } catch (error: any) {
      // Convert Firebase error codes to user-friendly messages
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('An account with this email already exists.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/weak-password':
          throw new Error('Password should be at least 6 characters long.');
        case 'auth/operation-not-allowed':
          throw new Error('Email/password accounts are not enabled.');
        default:
          throw new Error(error.message || 'An error occurred during signup.');
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // Convert Firebase error codes to user-friendly messages
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('No account found with this email address.');
        case 'auth/wrong-password':
          throw new Error('Incorrect password. Please try again.');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address.');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled.');
        case 'auth/too-many-requests':
          throw new Error('Too many failed attempts. Please try again later.');
        case 'auth/network-request-failed':
          throw new Error('Network error. Please check your connection.');
        default:
          throw new Error(error.message || 'An error occurred during login.');
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const getToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}