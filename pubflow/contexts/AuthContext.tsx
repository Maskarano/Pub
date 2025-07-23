
import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants'; // Using mock users for simulation

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string) => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => null,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage to persist login
    const savedUser = localStorage.getItem('pubflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string): Promise<User | null> => {
    // Simulate API call to find user
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find((u) => u.username.toLowerCase() === username.toLowerCase());
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('pubflow_user', JSON.stringify(foundUser));
          resolve(foundUser);
        } else {
          resolve(null);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pubflow_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
