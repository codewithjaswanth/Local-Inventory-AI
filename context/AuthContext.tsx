'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { authService, AuthProfile, UserRole } from '@/services/auth.service';

interface AuthContextType {
  user: any | null;
  profile: AuthProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string, role?: UserRole, phone?: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial Session Check using real Supabase getSession()
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const { user: currentUser, profile: currentProfile } = await authService.getCurrentUser();
        if (currentUser && currentProfile) {
          setUser(currentUser);
          setProfile(currentProfile);
          setRole(currentProfile.role);
        } else {
          setUser(null);
          setProfile(null);
          setRole(null);
        }
      } catch (err) {
        setUser(null);
        setProfile(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Supabase Auth State Change Listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { profile: p } = await authService.getCurrentUser();
        if (p) {
          setProfile(p);
          setRole(p.role);
        }
      } else {
        setUser(null);
        setProfile(null);
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    userRole: UserRole = 'customer',
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const { user: newUser, profile: newProfile, error: err } = await authService.signUp(
      email,
      password,
      name,
      userRole,
      phone
    );
    setIsLoading(false);

    if (err) {
      setError(err);
      return false;
    }

    setUser(newUser);
    setProfile(newProfile);
    setRole(userRole);
    return true;
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const { user: signedUser, profile: signedProfile, error: err } = await authService.signIn(
      email,
      password
    );
    setIsLoading(false);

    if (err) {
      setError(err);
      return false;
    }

    setUser(signedUser);
    setProfile(signedProfile);
    setRole(signedProfile?.role || 'customer');
    return true;
  };

  const signOut = async () => {
    setIsLoading(true);
    await authService.signOut();
    setUser(null);
    setProfile(null);
    setRole(null);
    setIsLoading(false);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        isLoading,
        error,
        signUp,
        signIn,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
