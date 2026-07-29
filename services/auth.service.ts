import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type UserRole = 'customer' | 'shopkeeper' | 'admin';

export const normalizeRole = (inputRole: any): UserRole => {
  if (!inputRole || typeof inputRole !== 'string') return 'customer';
  const cleaned = inputRole.toLowerCase().trim();
  if (cleaned === 'admin') return 'admin';
  if (cleaned === 'shopkeeper' || cleaned === 'vendor' || cleaned === 'seller') return 'shopkeeper';
  return 'customer';
};

export interface AuthProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string | null;
  email?: string;
}

export const authService = {
  // Centralized method to resolve user profile from DB with metadata & localStorage fallback
  getProfile: async (
    userId: string,
    userMetadata?: any,
    email?: string,
    requestedRole?: UserRole
  ): Promise<AuthProfile> => {
    const fallbackName =
      userMetadata?.full_name || userMetadata?.name || (email ? email.split('@')[0] : 'User');
    const fallbackPhone = userMetadata?.phone || null;

    // Check localStorage cache for user role
    let cachedRole: UserRole | null = null;
    if (typeof window !== 'undefined' && userId) {
      const stored = localStorage.getItem(`local_inventory_role_${userId}`);
      if (stored) cachedRole = normalizeRole(stored);
    }

    // Priority: requestedRole > cachedRole > userMetadata.role > email pattern
    let inferredRole: UserRole | null = requestedRole ? normalizeRole(requestedRole) : cachedRole;
    if (!inferredRole && userMetadata?.role) {
      inferredRole = normalizeRole(userMetadata?.role);
    }
    if (!inferredRole && email) {
      const lowerEmail = email.toLowerCase();
      if (lowerEmail.includes('admin')) {
        inferredRole = 'admin';
      } else if (lowerEmail.includes('shopkeeper') || lowerEmail.includes('vendor') || lowerEmail.includes('seller')) {
        inferredRole = 'shopkeeper';
      }
    }
    const finalRole: UserRole = inferredRole || 'customer';

    // Store resolved role in localStorage cache
    if (typeof window !== 'undefined' && userId) {
      localStorage.setItem(`local_inventory_role_${userId}`, finalRole);
    }

    if (!isSupabaseConfigured) {
      return {
        id: userId,
        name: fallbackName,
        role: finalRole,
        phone: fallbackPhone,
        email: email,
      };
    }

    try {
      const { data: profile, error } = await (supabase.from('profiles') as any)
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && profile) {
        const existingRole = normalizeRole(profile.role);
        // If user requested a specific role on login form or email pattern indicates non-customer role, update DB!
        const targetRole = requestedRole
          ? normalizeRole(requestedRole)
          : existingRole === 'customer' && finalRole !== 'customer'
          ? finalRole
          : existingRole;

        if (targetRole !== existingRole) {
          console.log(`[authService] Upgrading profile role in DB for ${email} from ${existingRole} to ${targetRole}`);
          await (supabase.from('profiles') as any).upsert({
            id: userId,
            name: profile.name || fallbackName,
            role: targetRole,
            phone: profile.phone || fallbackPhone,
          });
        }

        if (typeof window !== 'undefined' && userId) {
          localStorage.setItem(`local_inventory_role_${userId}`, targetRole);
        }

        return {
          id: profile.id,
          name: profile.name || fallbackName,
          role: targetRole,
          phone: profile.phone || fallbackPhone,
          email: email,
        };
      } else {
        // Create missing profile in DB with resolved role
        console.log(`[authService] Creating profile in DB for ${email} with role: ${finalRole}`);
        await (supabase.from('profiles') as any).upsert({
          id: userId,
          name: fallbackName,
          role: finalRole,
          phone: fallbackPhone,
        });
      }
    } catch (err) {
      console.warn('[authService] Profile DB query warning:', err);
    }

    return {
      id: userId,
      name: fallbackName,
      role: finalRole,
      phone: fallbackPhone,
      email: email,
    };
  },

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
      const { error: profileError } = await (supabase.from('profiles') as any).upsert({
        id: data.user.id,
        name,
        role,
        phone: phone || null,
      });

      if (profileError) {
        console.error('[authService] Profile row insert error:', profileError.message);
      }

      // Immediately sign out to require manual login
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
    password: string,
    requestedRole?: UserRole
  ): Promise<{ user: any; profile: AuthProfile | null; error: string | null }> => {
    console.log('[authService] SignIn Started', { email, requestedRole });
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

      const resolvedProfile = await authService.getProfile(
        data.user.id,
        data.user.user_metadata,
        data.user.email,
        requestedRole
      );

      return {
        user: data.user,
        profile: resolvedProfile,
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
    console.log('[AUTH] getCurrentUser Started');

    const timeoutPromise = new Promise<{ user: any; profile: AuthProfile | null }>((resolve) => {
      setTimeout(() => {
        console.warn('[AUTH] getCurrentUser timed out after 2500ms. Returning fallback null state.');
        resolve({ user: null, profile: null });
      }, 2500);
    });

    const fetchPromise = (async (): Promise<{ user: any; profile: AuthProfile | null }> => {
      try {
        console.log('[AUTH] Calling supabase.auth.getSession()...');
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.warn('[AUTH] getSession Error:', sessionError.message);
          return { user: null, profile: null };
        }

        if (!sessionData.session?.user) {
          console.log('[AUTH] Session loaded: No active session found.');
          return { user: null, profile: null };
        }

        const currentUser = sessionData.session.user;
        console.log('[AUTH] Session loaded:', currentUser.email);
        console.log('[AUTH] Fetching profile from database...');

        const resolvedProfile = await authService.getProfile(
          currentUser.id,
          currentUser.user_metadata,
          currentUser.email
        );

        console.log('[AUTH] Role fetched:', resolvedProfile.role);
        console.log('[AUTH] getCurrentUser Completed');
        return { user: currentUser, profile: resolvedProfile };
      } catch (err) {
        console.error('[AUTH] getCurrentUser Failed with exception:', err);
        return { user: null, profile: null };
      }
    })();

    return Promise.race([fetchPromise, timeoutPromise]);
  },
};

