import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize: Get the active session from Supabase on first load
  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase
        .from('sessions')
        .select('*')
        .order('is_active', { ascending: false }) // Active first
        .limit(1)
        .single();

      if (data) setSelectedSession(data);
      setLoading(false);
    };
    initSession();
  }, []);

  return (
    <SessionContext.Provider value={{ selectedSession, setSelectedSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);