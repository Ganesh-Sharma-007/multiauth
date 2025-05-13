'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMe } from '@/lib/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for loading state

  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
