/**
 * @file route.ts
 * @route src/app/api/admin/users/[id]/route.ts
 * @description API para operaciones específicas de un usuario (actualizar, eliminar).
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * @function PATCH
 * @description Actualiza un usuario específico.
 * @param {Request} request - Solicitud con datos a actualizar.
 * @param {{ params: { id: string } }} context - Parámetros de la ruta.
 * @returns {Promise<NextResponse>} Usuario actualizado o error.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * @function DELETE
 * @description Elimina un usuario del sistema.
 * @param {Request} request - Solicitud de eliminación.
 * @param {{ params: { id: string } }} context - Parámetros de la ruta.
 * @returns {Promise<NextResponse>} Confirmación de eliminación o error.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Eliminar perfiles relacionados primero
    await prisma.psychologistProfile.deleteMany({
      where: { userId: id }
    });

    await prisma.patientProfile.deleteMany({
      where: { userId: id }
    });

    // Eliminar notificaciones
    await prisma.notification.deleteMany({
      where: { userId: id }
    });

    // Eliminar tareas asignadas
    await prisma.taskAssignment.deleteMany({
      where: { patientId: id }
    });

    // Eliminar entradas de estado de ánimo
    await prisma.moodEntry.deleteMany({
      where: { patientId: id }
    });

    // Eliminar tareas fotográficas
    await prisma.photoTask.deleteMany({
      where: { patientId: id }
    });

    // Eliminar reportes de progreso
    await prisma.progressReport.deleteMany({
      where: { patientId: id }
    });

    // Finalmente eliminar el usuario
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * @function GET
 * @description Obtiene información detallada de un usuario específico.
 * @param {Request} request - Solicitud de información.
 * @param {{ params: { id: string } }} context - Parámetros de la ruta.
 * @returns {Promise<NextResponse>} Información del usuario o error.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        psychologistProfile: true,
        patientProfile: true,
        taskAssignments: {
          include: {
            task: true
          },
          orderBy: {
            assignedAt: 'desc'
          }
        },
        moodEntries: {
          orderBy: {
            date: 'desc'
          },
          take: 10
        },
        photoTasks: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        notifications: {
          where: {
            isRead: false
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Remover la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}