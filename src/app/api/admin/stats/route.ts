/**
 * @file route.ts
 * @route src/app/api/admin/stats/route.ts
 * @description API para obtener estadísticas generales del sistema.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserRole, TaskStatus } from '@/types';

/**
 * @function GET
 * @description Obtiene estadísticas generales del sistema para el dashboard del administrador.
 * @returns {Promise<NextResponse>} Estadísticas del sistema o error.
 */
export async function GET() {
  try {
    const totalUsers = await prisma.user.count();

    const activePatients = await prisma.user.count({
      where: {
        role: UserRole.Patient,
        isActive: true
      }
    });

    const psychologists = await prisma.user.count({
      where: {
        role: UserRole.Psychologist,
        isActive: true
      }
    });

    const tasksCompleted = await prisma.taskAssignment.count({
      where: {
        status: TaskStatus.COMPLETED
      }
    });

    const pendingTasks = await prisma.taskAssignment.count({
      where: {
        status: TaskStatus.PENDING
      }
    });

    const overdueTasks = await prisma.taskAssignment.count({
      where: {
        status: TaskStatus.OVERDUE
      }
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const avgMoodData = await prisma.moodEntry.aggregate({
      _avg: {
        mood: true,
        anxiety: true,
        stress: true,
        energy: true
      },
      where: {
        date: {
          gte: thirtyDaysAgo
        }
      }
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await prisma.user.findMany({
      where: {
        role: UserRole.Patient,
        isActive: true,
        OR: [
          {
            moodEntries: {
              some: {
                date: {
                  gte: sevenDaysAgo
                }
              }
            }
          },
          {
            taskAssignments: {
              some: {
                updatedAt: {
                  gte: sevenDaysAgo
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true
      },
      take: 10
    });

    const roleDistribution = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true
      },
      where: {
        isActive: true
      }
    });

    const taskTypeStats = await prisma.task.groupBy({
      by: ['type'],
      _count: {
        type: true
      }
    });

    const stats = {
      totalUsers,
      activePatients,
      psychologists,
      tasksCompleted,
      pendingTasks,
      overdueTasks,
      averageMood: {
        mood: avgMoodData._avg.mood || 0,
        anxiety: avgMoodData._avg.anxiety || 0,
        stress: avgMoodData._avg.stress || 0,
        energy: avgMoodData._avg.energy || 0
      },
      recentActivity,
      roleDistribution: roleDistribution.map(item => ({
        role: item.role,
        count: item._count.role
      })),
      taskTypeDistribution: taskTypeStats.map(item => ({
        type: item.type,
        count: item._count.type
      })),
      systemHealth: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        lastUpdated: new Date().toISOString()
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}