/**
 * @file useAuth.ts
 * @route src/hooks/useAuth.ts
 * @description Hook personalizado para acceder al contexto de autenticación.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * @function useAuth
 * @description Proporciona una forma sencilla de consumir el AuthContext.
 * @returns El contexto de autenticación.
 * @throws {Error} Si se usa fuera de un AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};