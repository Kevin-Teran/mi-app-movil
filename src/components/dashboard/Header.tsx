/**
 * @file Header.tsx
 * @route components/dashboard/Header.tsx
 * @description Componente de encabezado para las páginas del dashboard.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

/**
 * @function Header
 * @description Renderiza el encabezado del dashboard con información del usuario y controles.
 * @returns {JSX.Element}
 */
export function Header(): JSX.Element {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center space-x-2">
        <UserCircle size={24} />
        <span className="font-semibold">{user?.email}</span>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <button onClick={logout} className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}