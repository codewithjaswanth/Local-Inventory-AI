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
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role, phone },
        },
      });

      if (error) return { user: null, profile: null, error: error.message };
      if (!data.user) return { user: null, profile: null, error: 'User creation failed.' };

      // Insert profile row into public.profiles
      const { error: profileError } = await (supabase.from('profiles') as any).insert({
        id: data.user.id,
        name,
        role,
        phone: phone || null,
      });

      if (profileError) {
        console.warn('Profile row insert error:', profileError.message);
      }

      return {
        user: data.user,
        profile: { id: data.user.id, name, role, phone: phone || null, email: data.user.email },
        error: null,
      };
    } catch (err: any) {
      return { user: null, profile: null, error: err.message || 'Unexpected sign up error' };
    }
  },

  // 2. Sign In using real Supabase auth.signInWithPassword()
  signIn: async (
    email: string,
    password: string
  ): Promise<{ user: any; profile: AuthProfile | null; error: string | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { user: null, profile: null, error: error.message };
      if (!data.user) return { user: null, profile: null, error: 'Sign in failed.' };

      // Fetch profile row from public.profiles
      const { data: profile } = await (supabase.from('profiles') as any)
        .select('*')
        .eq('id', data.user.id)
        .single();

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
              name: data.user.user_metadata?.name || email.split('@')[0],
              role: (data.user.user_metadata?.role as UserRole) || 'customer',
              phone: data.user.user_metadata?.phone || null,
              email: data.user.email,
            },
        error: null,
      };
    } catch (err: any) {
      return { user: null, profile: null, error: err.message || 'Unexpected sign in error' };
    }
  },

  // 3. Logout using real Supabase auth.signOut()
  signOut: async (): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  },

  // 4. Get current user & session using real Supabase auth.getSession() & auth.getUser()
  getCurrentUser: async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user) {
      return { user: null, profile: null };
    }

    const currentUser = sessionData.session.user;

    const { data: profile } = await (supabase.from('profiles') as any)
      .select('*')
      .eq('id', currentUser.id)
      .single();

    const pAny = profile as any;

    return {
      user: currentUser,
      profile: pAny
        ? {
            id: pAny.id,
            name: pAny.name,
            role: pAny.role as UserRole,
            phone: pAny.phone,
            email: currentUser.email,
          }
        : {
            id: currentUser.id,
            name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User',
            role: (currentUser.user_metadata?.role as UserRole) || 'customer',
            phone: currentUser.user_metadata?.phone || null,
            email: currentUser.email,
          },
    };
  },
};
