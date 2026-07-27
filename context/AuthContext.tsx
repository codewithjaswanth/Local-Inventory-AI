'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { authService, AuthProfile, UserRole, normalizeRole } from '@/services/auth.service';
import { ConfirmLogoutDialog } from '@/components/ui/ConfirmLogoutDialog';
import { Toast } from '@/components/ui/Toast';

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
    console.log('[BOOT] App started');
    console.log('[AUTH] Initializing session');

    // Safety timeout guarantee: Ensure isLoading becomes false within 2000ms
    const safetyTimeout = setTimeout(() => {
      console.warn('[AUTH] Safety timeout triggered (2000ms). Forcing isLoading = false.');
      setIsLoading(false);
    }, 2000);

    const checkSession = async () => {
      try {
        console.log('[AUTH] checkSession Started');
        console.log('[AUTH] Fetching user and profile...');
        const { user: currentUser, profile: currentProfile } = await authService.getCurrentUser();

        if (currentUser && currentProfile) {
          console.log('[AUTH] Session loaded:', currentUser.email);
          console.log('[AUTH] Role fetched:', currentProfile.role);
          setUser(currentUser);
          setProfile(currentProfile);
          setRole(currentProfile.role);
        } else {
          console.log('[AUTH] Session loaded: No active user session found.');
          setUser(null);
          setProfile(null);
          setRole(null);
        }
      } catch (err) {
        console.error('[AUTH] Failed: Error during session check:', err);
        setUser(null);
        setProfile(null);
        setRole(null);
      } finally {
        console.log('[AUTH] checkSession Completed. Setting isLoading = false.');
        clearTimeout(safetyTimeout);
        setIsLoading(false);
      }
    };

    checkSession();

    // Supabase Auth State Change Listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AUTH] Auth state change event:', event);
      if (session?.user) {
        console.log('[AUTH] Session updated via listener:', session.user.email);
        setUser(session.user);
        const resolvedRole = normalizeRole(session.user.user_metadata?.role);
        const resolvedName = session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User';

        console.log('[AUTH] Role fetched via listener:', resolvedRole);
        setProfile({
          id: session.user.id,
          name: resolvedName,
          role: resolvedRole,
          phone: session.user.user_metadata?.phone || null,
          email: session.user.email,
        });
        setRole(resolvedRole);
      } else {
        console.log('[AUTH] Listener received no session (signed out).');
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
    if (isSigningOut) return; // Prevent multiple clicks/requests
    console.log('[AuthContext] Logout confirmed. Executing session & storage cleanup...');
    setIsSigningOut(true);
    setError(null);

    try {
      const { error: signOutErr } = await authService.signOut();

      if (signOutErr) {
        console.error('[AuthContext] Logout failed:', signOutErr);
        setError(`Failed to sign out: ${signOutErr}`);
        setIsSigningOut(false);
        setShowLogoutModal(false);
        return; // Keep user signed in on failure!
      }

      setUser(null);
      setProfile(null);
      setRole(null);
      setIsLoading(false);
      setIsSigningOut(false);
      setShowLogoutModal(false);

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (err: any) {
      console.error('[AuthContext] Unexpected error during logout:', err);
      setError(err?.message || 'Failed to sign out. Please try again.');
      setIsSigningOut(false);
      setShowLogoutModal(false);
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

      {/* Global Error Notification Toast */}
      <Toast
        toast={error ? { id: 'auth-error', title: 'Sign Out Notice', message: error, type: 'warning' } : null}
        onClose={() => setError(null)}
      />

      {/* Global Confirmation Logout Dialog */}
      <ConfirmLogoutDialog
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
