import { supabase } from '@/lib/supabase';

export type UserRole = 'customer' | 'shopkeeper' | 'admin';

export interface AuthProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string | null;
  email?: string;
}

export const authService = {
  // 1. Sign Up using real Supabase auth.signUp()
  signUp: async (
    email: string,
    password: string,
    name: string,
    role: UserRole = 'customer',
    phone?: string
  ): Promise<{ user: any; profile: AuthProfile | null; error: string | null }> => {
    console.log('[authService] Signup Started', { email, name, role, phone });
    try {
      console.log('[authService] Calling Supabase auth.signUp...');
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, name, role, phone },
        },
      });

      console.log('[authService] Supabase Response', response);
      const { data, error } = response;

      if (error) {
        console.error('[authService] Supabase auth.signUp Error:', error.message);
        return { user: null, profile: null, error: error.message };
      }

      if (!data.user) {
        console.error('[authService] Supabase auth.signUp returned no user object');
        return { user: null, profile: null, error: 'User creation failed. No user returned from Supabase.' };
      }

      console.log('[authService] Creating Profile in public.profiles for user:', data.user.id);

      // Insert profile row into public.profiles
      const { error: profileError } = await (supabase.from('profiles') as any).insert({
        id: data.user.id,
        name,
        role,
        phone: phone || null,
      });

      if (profileError) {
        console.error('[authService] Profile row insert error:', profileError.message);
      }

      // Immediately sign out to ensure user is NOT automatically logged in after signup
      console.log('[authService] Signing out newly created user to require manual login...');
      await supabase.auth.signOut();

      console.log('[authService] Signup Success');
      return {
        user: data.user,
        profile: { id: data.user.id, name, role, phone: phone || null, email: data.user.email },
        error: null,
      };
    } catch (err: any) {
      console.error('[authService] Unexpected error during signUp:', err);
      return { user: null, profile: null, error: err.message || 'Unexpected sign up error' };
    }
  },

  // 2. Sign In using real Supabase auth.signInWithPassword()
  signIn: async (
    email: string,
    password: string
  ): Promise<{ user: any; profile: AuthProfile | null; error: string | null }> => {
    console.log('[authService] SignIn Started', { email });
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('[authService] Supabase signIn Response', response);
      const { data, error } = response;

      if (error) {
        console.error('[authService] Supabase auth.signIn Error:', error.message);
        return { user: null, profile: null, error: error.message };
      }

      if (!data.user) {
        console.error('[authService] Supabase auth.signIn returned no user object');
        return { user: null, profile: null, error: 'Sign in failed.' };
      }

      // Fetch profile row from public.profiles using maybeSingle() instead of single()
      const { data: profile, error: profileFetchError } = await (supabase.from('profiles') as any)
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profileFetchError) {
        console.warn('[authService] Profile fetch error during signIn:', profileFetchError.message);
      }

      const pAny = profile as any;

      return {
        user: data.user,
        profile: pAny
          ? {
              id: pAny.id,
              name: pAny.name,
              role: pAny.role as UserRole,
              phone: pAny.phone,
              email: data.user.email,
            }
          : {
              id: data.user.id,
              name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0],
              role: (data.user.user_metadata?.role as UserRole) || 'customer',
              phone: data.user.user_metadata?.phone || null,
              email: data.user.email,
            },
        error: null,
      };
    } catch (err: any) {
      console.error('[authService] Unexpected error during signIn:', err);
      return { user: null, profile: null, error: err.message || 'Unexpected sign in error' };
    }
  },

  // 3. Sign In with Google OAuth
  signInWithGoogle: async (): Promise<{ error: string | null }> => {
    console.log('[authService] Initiating Google OAuth Sign In...');
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            prompt: 'select_account consent',
            access_type: 'offline',
          },
        },
      });
      if (error) {
        console.error('[authService] Google OAuth Error:', error.message);
        return { error: error.message };
      }
      return { error: null };
    } catch (err: any) {
      console.error('[authService] Unexpected Google OAuth Error:', err);
      return { error: err.message || 'Failed to initiate Google OAuth sign in' };
    }
  },

  // 4. Request Password Reset Email
  resetPasswordForEmail: async (email: string): Promise<{ error: string | null }> => {
    console.log('[authService] Requesting password reset email for:', email);
    try {
      const redirectOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const redirectTo = `${redirectOrigin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error('[authService] resetPasswordForEmail Error:', error.message);
        return { error: error.message };
      }

      console.log('[authService] Password reset email dispatched successfully');
      return { error: null };
    } catch (err: any) {
      console.error('[authService] Unexpected resetPasswordForEmail Error:', err);
      return { error: err.message || 'Failed to send password reset email' };
    }
  },

  // 5. Update Password after clicking reset link
  updatePassword: async (password: string): Promise<{ error: string | null }> => {
    console.log('[authService] Updating user password...');
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error('[authService] updateUser password Error:', error.message);
        return { error: error.message };
      }

      console.log('[authService] Password updated successfully');
      return { error: null };
    } catch (err: any) {
      console.error('[authService] Unexpected updateUser Error:', err);
      return { error: err.message || 'Failed to update password' };
    }
  },

  // 6. Logout using real Supabase auth.signOut()
  signOut: async (): Promise<{ error: string | null }> => {
    console.log('[authService] SignOut Started');
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('[authService] SignOut Error:', error.message);
      } else {
        console.log('[authService] SignOut Success');
      }
      return { error: error ? error.message : null };
    } catch (err: any) {
      console.error('[authService] Unexpected SignOut Error:', err);
      return { error: err.message || 'SignOut failed' };
    }
  },

  // 7. Get current user & session using real Supabase auth.getSession()
  getCurrentUser: async (): Promise<{ user: any; profile: AuthProfile | null }> => {
    console.log('[authService] getCurrentUser Started');

    const timeoutPromise = new Promise<{ user: any; profile: AuthProfile | null }>((resolve) => {
      setTimeout(() => {
        console.warn('[authService] getCurrentUser timed out after 2500ms. Returning fallback null state.');
        resolve({ user: null, profile: null });
      }, 2500);
    });

    const fetchPromise = (async (): Promise<{ user: any; profile: AuthProfile | null }> => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.warn('[authService] getSession Error:', sessionError.message);
          return { user: null, profile: null };
        }

        if (!sessionData.session?.user) {
          console.log('[authService] No active user session found');
          return { user: null, profile: null };
        }

        const currentUser = sessionData.session.user;
        console.log('[authService] Session user loaded:', currentUser.email);

        const { data: profile, error: profileFetchError } = await (supabase.from('profiles') as any)
          .select('*')
          .eq('id', currentUser.id)
          .maybeSingle();

        if (profileFetchError) {
          console.warn('[authService] Profile fetch error in getCurrentUser:', profileFetchError.message);
        }

        const pAny = profile as any;
        const resolvedProfile: AuthProfile = pAny
          ? {
              id: pAny.id,
              name: pAny.name,
              role: pAny.role as UserRole,
              phone: pAny.phone,
              email: currentUser.email,
            }
          : {
              id: currentUser.id,
              name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User',
              role: (currentUser.user_metadata?.role as UserRole) || 'customer',
              phone: currentUser.user_metadata?.phone || null,
              email: currentUser.email,
            };

        console.log('[authService] Profile & Role determined:', resolvedProfile.role);
        return { user: currentUser, profile: resolvedProfile };
      } catch (err) {
        console.error('[authService] Unexpected error in getCurrentUser:', err);
        return { user: null, profile: null };
      }
    })();

    return Promise.race([fetchPromise, timeoutPromise]);
  },
};
