import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async (userId) => {
    if (!userId) return null;
    try {
      const { data, error } = await supabase.from('profiles').select('role, school_id').eq('id', userId).single();

      if (error) {
        console.error('Profile fetch error:', error.message);
        setProfile(null);
        return null;
      }

      setProfile(data);
      if (data?.role && typeof window !== 'undefined') {
        try {
          localStorage.setItem('user_role', data.role);
          if (data.school_id) localStorage.setItem('school_id', String(data.school_id));
        } catch (storageError) {
          console.error('Persist role error:', storageError);
        }
      }

      return data;
    } catch (err) {
      console.error('Profile fetch exception:', err);
      setProfile(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    let subscription = null;

    const initSession = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error('Session fetch error:', error.message);
          setError(error.message);
          setLoading(false);
          return;
        }

        const currentSession = data?.session ?? null;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error('Session init exception:', err);
        if (mounted) {
          setError(err.message || 'Failed to initialize session');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const {
      data: { subscription: authSubscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      try {
        // Handle token refresh
        if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setProfile(null);
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem('user_role');
              localStorage.removeItem('school_id');
            } catch (storageError) {
              console.error('Clear auth storage error:', storageError);
            }
          }
        } else {
          setUser(session?.user ?? null);
          setSession(session);
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        }
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Auth state change error:', err);
        if (mounted) {
          setError(err.message || 'Auth state change failed');
          setLoading(false);
        }
      }
    });

    subscription = authSubscription;

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const value = {
    session,
    user,
    loading,
    profile,
    error,
    refreshProfile: fetchProfile,
    signIn: async (credentials) => {
      try {
        setError(null);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error) {
          setError(error.message);
          throw error;
        }
        return data;
      } catch (err) {
        setError(err.message || 'Sign in failed');
        throw err;
      }
    },
    signOut: async () => {
      try {
        console.log('Sign out successful');
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
        setSession(null);
        setProfile(null);
        setError(null);

        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('user_role');
            localStorage.removeItem('school_id');
            return true;
          } catch (storageError) {
            console.error('Clear auth storage error:', storageError);
          }
        }
      } catch (err) {
        console.error('Sign out error:', err);
        setError(err.message || 'Sign out failed');
        throw err;
      }
    }
  };

  // Always render children, but show loading state if needed
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
