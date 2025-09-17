/**
 * @file ThemeProvider.tsx
 * @route src/components/providers/ThemeProvider.tsx
 * @description Proveedor de contexto para el tema (claro/oscuro) de la aplicación, basado en next-themes.
 * @author kevin mariano
 * @version 1.0.1
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * @function ThemeProvider
 * @description Envuelve la aplicación para proveer la funcionalidad de cambio de tema.
 * @param {ThemeProviderProps} props - Propiedades para el proveedor de temas.
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}