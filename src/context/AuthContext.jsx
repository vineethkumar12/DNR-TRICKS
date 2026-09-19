import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const loggedInUser = await api.login(email, password);
    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(loggedInUser));
    return loggedInUser;
  }

  async function register(form) {
    const newUser = await api.register(form);
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser));
    return newUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
