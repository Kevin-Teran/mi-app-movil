/**
 * @file page.tsx
 * @route app/page.tsx
 * @description Página de inicio que redirige al dashboard o al login.
 * @author kevin mariano
 * @version 1.0.1
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * @function Home
 * @description Componente principal que maneja la redirección inicial.
 * @returns {null} Este componente no renderiza UI, solo redirige.
 */
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push(`/${user.role}`);
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return null; 
}