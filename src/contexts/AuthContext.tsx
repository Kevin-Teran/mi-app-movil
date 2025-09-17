/**
 * @file AuthContext.tsx
 * @route contexts/AuthContext.tsx
 * @description Define el contexto de React para gestionar la autenticación del usuario.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { createContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@/types';

/**
 * @interface AuthContextType
 * @description Define la forma del contexto de autenticación.
 */
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);