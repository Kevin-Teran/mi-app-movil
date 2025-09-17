/**
 * @file layout.tsx
 * @route app/(dashboard)/layout.tsx
 * @description Layout para las páginas protegidas del dashboard.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';

/**
 * @function DashboardLayout
 * @description Protege las rutas del dashboard y muestra un layout común.
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element | null}
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}