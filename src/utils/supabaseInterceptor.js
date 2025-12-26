import { supabase } from './supabaseClient';

/**
 * Sets up global interceptors for Supabase to handle session refresh
 * This should be called once when the app initializes
 */
export const setupSupabaseInterceptors = () => {
  // Intercept auth state changes to handle token refresh
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed successfully');
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      // Clear any cached data
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('user_role');
          localStorage.removeItem('school_id');
        } catch (e) {
          console.error('Error clearing storage:', e);
        }
      }
    } else if (event === 'USER_UPDATED') {
      console.log('User updated');
    }
  });

  // Monitor network status
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('Network connection restored');
      // Try to refresh session when connection is restored
      supabase.auth.getSession().then(({ error }) => {
        if (error) {
          console.error('Failed to refresh session after reconnection:', error);
        }
      });
    });

    window.addEventListener('offline', () => {
      console.warn('Network connection lost');
    });
  }
};


