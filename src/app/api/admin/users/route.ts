/**
 * @file route.ts
 * @route src/app/api/admin/users/route.ts
 * @description API para la gestión completa de usuarios por parte del administrador.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserRole } from '@/types';

/**
 * @function GET
 * @description Obtiene todos los usuarios del sistema.
 * @returns {Promise<NextResponse>} Lista de usuarios o error.
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        profileCompleted: true,
        createdAt: true,
        age: true,
        phone: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * @function POST
 * @description Crea un nuevo usuario en el sistema.
 * @param {Request} request - Solicitud con datos del usuario.
 * @returns {Promise<NextResponse>} Usuario creado o error.
 */
export async function POST(request: Request) {
  try {
    const { email, password, name, role, age, phone, address } = await request.json();

    // Validaciones básicas
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, contraseña, nombre y rol son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // En producción, hash la contraseña
        name,
        role: role as UserRole,
        age: age ? parseInt(age) : null,
        phone,
        address,
        isActive: true,
        profileCompleted: false
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    // Crear perfiles específicos según el rol
    if (role === UserRole.Psychologist) {
      await prisma.psychologistProfile.create({
        data: {
          userId: newUser.id,
          specialization: 'General',
          license: 'Pendiente',
          experience: 0
        }
      });
    } else if (role === UserRole.Patient) {
      await prisma.patientProfile.create({
        data: {
          userId: newUser.id,
          symptoms: null
        }
      });
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}