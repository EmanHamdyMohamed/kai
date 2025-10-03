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
  setPersistence,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Define Firebase error type
interface FirebaseError extends Error {
  code: string;
}

// Type guard to check if error is a Firebase error
function isFirebaseError(error: unknown): error is FirebaseError {
  return error instanceof Error && 'code' in error;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isTokenValid: boolean;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

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
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Validate token when user is set
      const isValid = await validateTokenWithUser(user);
      if (isValid) {
        setUser(user);
        setIsTokenValid(true);
      } else {
        // Token is invalid, clear persistence and logout
        console.log('Token invalid, clearing persistence and logging out');
        await signOut(auth);
        setUser(null);
        setIsTokenValid(false);
      }
    } else {
      setUser(null);
      setIsTokenValid(false);
    }
    
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
    } catch (error: unknown) {
      // Convert Firebase error codes to user-friendly messages
      if (isFirebaseError(error)) {
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
      } else {
        throw new Error('An unexpected error occurred during signup.');
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      // Convert Firebase error codes to user-friendly messages
      if (isFirebaseError(error)) {
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
      } else {
        throw new Error('An unexpected error occurred during login.');
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Helper function to validate token with a specific user
  const validateTokenWithUser = async (user: User): Promise<boolean> => {
    try {
      // For frontend, we rely on Firebase's built-in token management
      // Firebase automatically handles token refresh and validation
      if (!user) return false;
      
      // Get fresh token - Firebase automatically handles refresh if needed
      const token = await user.getIdToken(false); // false = don't force refresh
      return token !== null;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const getToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const validateToken = async (): Promise<boolean> => {
    if (!user) {
      setIsTokenValid(false);
      return false;
    }
    
    const isValid = await validateTokenWithUser(user);
    if (isValid) {
      setIsTokenValid(true);
      return true;
    } else {
      // Token is invalid, clear persistence and logout
      console.log('Token validation failed, clearing persistence and logging out');
      await signOut(auth);
      setUser(null);
      setIsTokenValid(false);
      return false;
    }
  };

  const value = {
    user,
    loading,
    isTokenValid,
    signup,
    login,
    logout,
    getToken,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}