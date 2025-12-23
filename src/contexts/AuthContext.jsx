import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
    if (!userId) return null;
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
  };

  useEffect(() => {
    const initSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session fetch error:', error.message);
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
      setLoading(false);
    };

    initSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user,
    loading,
    profile,
    refreshProfile: fetchProfile,
    signIn: async (credentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      setProfile(null);

      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('user_role');
          localStorage.removeItem('school_id');
          document.cookie = 'auth_token=; path=/; max-age=0';
          document.cookie = 'user_role=; path=/; max-age=0';
        } catch (storageError) {
          console.error('Clear auth storage error:', storageError);
        }
      }
    }
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
