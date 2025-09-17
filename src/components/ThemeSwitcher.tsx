/**
 * @file ThemeSwitcher.tsx
 * @route src/components/ThemeSwitcher.tsx
 * @description Componente de botón que permite al usuario alternar entre el tema claro y oscuro.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * @function ThemeSwitcher
 * @description Renderiza un botón que, al ser presionado, cambia el tema actual de la aplicación.
 * @returns {JSX.Element}
 */
export const ThemeSwitcher = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};