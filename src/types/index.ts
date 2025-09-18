/**
 * @file index.ts
 * @route src/types/index.ts
 * @description Define todos los tipos y enumeraciones globales para la aplicación de salud mental.
 * @author kevin mariano
 * @version 2.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

/**
 * @enum {string}
 * @description Define los roles de usuario en el sistema.
 */
export enum UserRole {
  Admin = 'admin',
  Psychologist = 'psychologist',
  Patient = 'patient',
}

/**
 * @enum {string}
 * @description Define los tipos de tareas disponibles.
 */
export enum TaskType {
  MEDITATION = 'MEDITATION',
  EXERCISE = 'EXERCISE',
  JOURNALING = 'JOURNALING',
  PHOTO = 'PHOTO',
  BREATHING = 'BREATHING',
  MINDFULNESS = 'MINDFULNESS',
  COGNITIVE = 'COGNITIVE',
  BEHAVIORAL = 'BEHAVIORAL',
  SOCIAL = 'SOCIAL',
  CREATIVE = 'CREATIVE',
}

/**
 * @enum {string}
 * @description Define los estados de las tareas.
 */
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

/**
 * @enum {string}
 * @description Define los niveles de dificultad.
 */
export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

/**
 * @enum {string}
 * @description Define los tipos de notificaciones.
 */
export enum NotificationType {
  TASK_REMINDER = 'TASK_REMINDER',
  APPOINTMENT = 'APPOINTMENT',
  PROGRESS_UPDATE = 'PROGRESS_UPDATE',
  SYSTEM = 'SYSTEM',
  EMERGENCY = 'EMERGENCY',
}

/**
 * @interface User
 * @description Representa la estructura de un usuario del sistema.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  role: UserRole;
  isActive: boolean;
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface PsychologistProfile
 * @description Define el perfil específico de un psicólogo.
 */
export interface PsychologistProfile {
  id: string;
  userId: string;
  specialization: string;
  license: string;
  experience?: number;
  bio?: string;
  user?: User;
}

/**
 * @interface PatientProfile
 * @description Define el perfil específico de un paciente.
 */
export interface PatientProfile {
  id: string;
  userId: string;
  symptoms?: any;
  diagnosis?: string;
  medicationNotes?: string;
  allergies?: string;
  emergencyNotes?: string;
  user?: User;
}

/**
 * @interface Task
 * @description Representa una tarea terapéutica.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  category?: string;
  difficulty: Difficulty;
  estimatedTime?: number;
  instructions?: any;
  resources?: any;
  isTemplate: boolean;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
}

/**
 * @interface TaskAssignment
 * @description Representa la asignación de una tarea a un paciente.
 */
export interface TaskAssignment {
  id: string;
  taskId: string;
  patientId: string;
  assignedAt: Date;
  dueDate?: Date;
  status: TaskStatus;
  progress: number;
  notes?: string;
  completedAt?: Date;
  feedback?: string;
  rating?: number;
  task?: Task;
  patient?: User;
}

/**
 * @interface MoodEntry
 * @description Representa una entrada de estado de ánimo del paciente.
 */
export interface MoodEntry {
  id: string;
  patientId: string;
  mood: number;
  anxiety?: number;
  stress?: number;
  energy?: number;
  sleep?: number;
  notes?: string;
  date: Date;
  patient?: User;
}

/**
 * @interface PhotoTask
 * @description Representa una tarea de fotografía terapéutica.
 */
export interface PhotoTask {
  id: string;
  patientId: string;
  title: string;
  description?: string;
  photoUrl?: string;
  location?: string;
  tags?: any;
  mood?: number;
  reflection?: string;
  isCompleted: boolean;
  createdAt: Date;
  completedAt?: Date;
  patient?: User;
}

/**
 * @interface ProgressReport
 * @description Representa un reporte de progreso del paciente.
 */
export interface ProgressReport {
  id: string;
  patientId: string;
  reportDate: Date;
  overallMood?: number;
  tasksCompleted: number;
  tasksAssigned: number;
  improvements?: any;
  concerns?: any;
  goals?: any;
  notes?: string;
  generatedBy?: string;
  patient?: User;
}

/**
 * @interface Notification
 * @description Representa una notificación del sistema.
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
  user?: User;
}

/**
 * @interface CreateUserRequest
 * @description Datos necesarios para crear un nuevo usuario.
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  age?: number;
  role: UserRole;
  phone?: string;
  address?: string;
}

/**
 * @interface UpdateProfileRequest
 * @description Datos para actualizar el perfil de usuario.
 */
export interface UpdateProfileRequest {
  name?: string;
  age?: number;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

/**
 * @interface CreateTaskRequest
 * @description Datos necesarios para crear una nueva tarea.
 */
export interface CreateTaskRequest {
  title: string;
  description: string;
  type: TaskType;
  category?: string;
  difficulty: Difficulty;
  estimatedTime?: number;
  instructions?: any;
  resources?: any;
}

/**
 * @interface AssignTaskRequest
 * @description Datos para asignar una tarea a un paciente.
 */
export interface AssignTaskRequest {
  taskId: string;
  patientId: string;
  dueDate?: Date;
  notes?: string;
}

/**
 * @interface MoodEntryRequest
 * @description Datos para crear una entrada de estado de ánimo.
 */
export interface MoodEntryRequest {
  mood: number;
  anxiety?: number;
  stress?: number;
  energy?: number;
  sleep?: number;
  notes?: string;
}