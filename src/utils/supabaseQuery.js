import { supabase } from './supabaseClient';

/**
 * Enhanced Supabase query wrapper that handles session refresh and errors
 * @param {Function} queryFn - Function that returns a Supabase query
 * @param {Object} options - Options for retry and error handling
 * @returns {Promise} Query result
 */
export const supabaseQuery = async (queryFn, options = {}) => {
  const { retries = 1, onError = null } = options;
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Check if session is valid before making the query
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw new Error(`Session error: ${sessionError.message}`);
      }

      if (!sessionData?.session) {
        throw new Error('No active session. Please log in again.');
      }

      // Execute the query
      const result = await queryFn();

      // Check for Supabase errors
      if (result.error) {
        // Handle token expired or invalid
        if (result.error.message?.includes('JWT') || result.error.message?.includes('token')) {
          // Try to refresh the session
          if (attempt < retries) {
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              throw new Error('Session expired. Please log in again.');
            }
            // Retry the query with refreshed session
            continue;
          }
        }
        
        // If it's a network error, retry
        if (result.error.message?.includes('fetch') && attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }

        throw result.error;
      }

      return result;
    } catch (error) {
      lastError = error;
      
      // If this is the last attempt or error handler is provided, handle the error
      if (attempt === retries) {
        if (onError) {
          onError(error);
        }
        throw error;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw lastError;
};

/**
 * Helper to check if error is a session/authentication error
 */
export const isAuthError = (error) => {
  if (!error) return false;
  const message = error.message?.toLowerCase() || '';
  return (
    message.includes('jwt') ||
    message.includes('token') ||
    message.includes('session') ||
    message.includes('unauthorized') ||
    message.includes('authentication')
  );
};


