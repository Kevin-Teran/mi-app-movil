/**
 * @file route.ts
 * @route src/app/api/auth/route.ts
 * @description Maneja la lógica de autenticación contra la base de datos.
 * @author kevin mariano
 * @version 1.1.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @function POST
 * @description Valida las credenciales del usuario contra la base de datos.
 * @param {Request} request - La solicitud entrante.
 * @returns {Promise<NextResponse>} La respuesta con los datos del usuario o un error.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Correo y contraseña son requeridos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } else {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}