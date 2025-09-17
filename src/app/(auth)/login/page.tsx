/**
 * @file page.tsx
 * @route src/app/(auth)/login/page.tsx
 * @description Página para el inicio de sesión de los usuarios.
 * @author kevin mariano
 * @version 1.1.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { LoginForm } from '@/components/auth/LoginForm';

/**
 * @function LoginPage
 * @description Renderiza la página de inicio de sesión, centrando el formulario.
 * @returns {JSX.Element}
 */
export default function LoginPage(): JSX.Element {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <LoginForm />
    </main>
  );
}