/**
 * @file LoginForm.tsx
 * @route src/components/auth/LoginForm.tsx
 * @description Componente de formulario de inicio de sesión con diseño profesional.
 * @author kevin mariano
 * @version 2.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertTriangle, X, User as UserIcon } from 'lucide-react';

export function LoginForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData: User = await response.json();
        login(userData);
        router.push(`/${userData.role}`);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDemoLogin = (userType: 'admin' | 'patient') => {
    if (userType === 'admin') {
      setEmail('admin@demo.com');
      setPassword('admin123');
    } else {
      setEmail('patient@demo.com');
      setPassword('patient123');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Correo Electrónico</h2>
        <div className="relative mt-2">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contraseña</h2>
        <div className="relative mt-2">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"/>
          Recordar sesión
        </label>
      </div>

      {error && (
        <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400" role="alert">
          <AlertTriangle className="flex-shrink-0 inline w-4 h-4 mr-3" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')}><X size={20} /></button>
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 px-4 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Ingresando...' : <><LogIn size={20} /> Iniciar Sesión</>}
      </button>
      <div className="text-center">
        <a href="#" className="text-sm text-green-600 hover:underline dark:text-green-500">¿Olvidaste tu contraseña?</a>
      </div>
      
      <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">O ingresa con una cuenta demo:</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <div className="space-y-3">
          <button onClick={() => handleDemoLogin('admin')} className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <UserIcon className="text-green-600" />
              <div>
                  <p className="font-semibold text-left text-gray-800 dark:text-white">admin@sena.edu.co</p>
                  <p className="text-sm text-left text-gray-500 dark:text-gray-400">Administrador</p>
              </div>
          </button>
          <button onClick={() => handleDemoLogin('patient')} className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
              <UserIcon className="text-green-600" />
              <div>
                  <p className="font-semibold text-left text-gray-800 dark:text-white">usuario@sena.edu.co</p>
                  <p className="text-sm text-left text-gray-500 dark:text-gray-400">Usuario</p>
              </div>
          </button>
      </div>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        © 2025 SENA - Todos los derechos reservados <br/>
        Desarrollado por Kevin Mariano
      </p>
    </div>
  );
}