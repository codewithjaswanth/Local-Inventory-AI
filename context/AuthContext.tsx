'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { authService, AuthProfile, UserRole } from '@/services/auth.service';
import { LogoutModal } from '@/components/ui/LogoutModal';

interface AuthContextType {
  user: any | null;
  profile: AuthProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  signUp: (
    email: string,
    password: string,
    name: string,
    role?: UserRole,
    phone?: string
  ) => Promise<{ success: boolean; error: string | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  resetPasswordForEmail: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
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
  
  // Global Logout Confirmation Modal State
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  useEffect(() => {
    console.log('[AuthContext] App mounted. Starting authentication initialization...');

    // Safety timeout guarantee: Ensure isLoading becomes false within 2 seconds
    const safetyTimeout = setTimeout(() => {
      console.warn('[AuthContext] Safety timeout triggered (2000ms). Forcing isLoading = false.');
      setIsLoading(false);
    }, 2000);

    const checkSession = async () => {
      try {
        console.log('[AuthContext] Session loaded: Querying current user session...');
        const { user: currentUser, profile: currentProfile } = await authService.getCurrentUser();

        if (currentUser && currentProfile) {
          console.log('[AuthContext] User loaded:', currentUser.email);
          console.log('[AuthContext] Profile loaded:', currentProfile.name);
          console.log('[AuthContext] Role determined:', currentProfile.role);
          setUser(currentUser);
          setProfile(currentProfile);
          setRole(currentProfile.role);
        } else {
          console.log('[AuthContext] Session loaded: No active user session found.');
          setUser(null);
          setProfile(null);
          setRole(null);
        }
      } catch (err) {
        console.error('[AuthContext] Error during session check:', err);
        setUser(null);
        setProfile(null);
        setRole(null);
      } finally {
        console.log('[AuthContext] Loading finished. Setting isLoading = false.');
        clearTimeout(safetyTimeout);
        setIsLoading(false);
      }
    };

    checkSession();

    // Supabase Auth State Change Listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state change event:', event);
      if (session?.user) {
        setUser(session.user);
        const resolvedRole = (session.user.user_metadata?.role as UserRole) || 'customer';
        const resolvedName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User';

        setProfile({
          id: session.user.id,
          name: resolvedName,
          role: resolvedRole,
          phone: session.user.user_metadata?.phone || null,
          email: session.user.email,
        });
        setRole(resolvedRole);
      } else {
        setUser(null);
        setProfile(null);
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => {
      clearTimeout(safetyTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    userRole: UserRole = 'customer',
    phone?: string
  ): Promise<{ success: boolean; error: string | null }> => {
    console.log('[AuthContext] signUp method invoked');
    setIsLoading(true);
    setError(null);
    try {
      const { user: newUser, error: err } = await authService.signUp(
        email,
        password,
        name,
        userRole,
        phone
      );

      if (err || !newUser) {
        const errorMsg = err || 'User creation failed.';
        console.error('[AuthContext] signUp failed:', errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log('[AuthContext] signUp succeeded. User remains unauthenticated for manual login.');
      setUser(null);
      setProfile(null);
      setRole(null);
      return { success: true, error: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error: string | null }> => {
    console.log('[AuthContext] signIn method invoked');
    setIsLoading(true);
    setError(null);
    try {
      const { user: signedUser, profile: signedProfile, error: err } = await authService.signIn(
        email,
        password
      );

      if (err || !signedUser) {
        const errorMsg = err || 'Sign in failed.';
        console.error('[AuthContext] signIn failed:', errorMsg);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log('[AuthContext] signIn succeeded. Setting context state...');
      setUser(signedUser);
      setProfile(signedProfile);
      setRole(signedProfile?.role || 'customer');
      return { success: true, error: null };
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<{ error: string | null }> => {
    setError(null);
    return await authService.signInWithGoogle();
  };

  const resetPasswordForEmail = async (email: string): Promise<{ error: string | null }> => {
    setError(null);
    return await authService.resetPasswordForEmail(email);
  };

  const updatePassword = async (password: string): Promise<{ error: string | null }> => {
    setError(null);
    return await authService.updatePassword(password);
  };

  // Called when user clicks Sign Out anywhere in the UI
  const signOut = async () => {
    console.log('[AuthContext] signOut requested. Opening confirmation modal...');
    setShowLogoutModal(true);
  };

  // Executed when user confirms logout in the modal
  const handleConfirmSignOut = async () => {
    console.log('[AuthContext] Logout confirmed. Executing session & storage cleanup...');
    setIsSigningOut(true);
    try {
      await authService.signOut();
    } finally {
      setUser(null);
      setProfile(null);
      setRole(null);
      setIsLoading(false);
      setIsSigningOut(false);
      setShowLogoutModal(false);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
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
        signInWithGoogle,
        resetPasswordForEmail,
        updatePassword,
        signOut,
        clearError,
      }}
    >
      {children}

      {/* Global Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        isSigningOut={isSigningOut}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmSignOut}
      />
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
