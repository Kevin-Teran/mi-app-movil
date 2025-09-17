/**
 * @file AuthProvider.tsx
 * @route components/providers/AuthProvider.tsx
 * @description Proveedor de contexto que gestiona el estado de autenticación.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import { ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { User } from '@/types';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * @function AuthProvider
 * @description Componente que provee el contexto de autenticación a sus hijos.
 * @param {AuthProviderProps} props - Propiedades del componente.
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}