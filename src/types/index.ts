/**
 * @file index.ts
 * @route types/index.ts
 * @description Define los tipos y enumeraciones globales para la aplicación.
 * @author kevin mariano
 * @version 1.0.0
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
 * @interface User
 * @description Representa la estructura de un usuario autenticado.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  age?: number;
}

/**
 * @interface PatientProfile
 * @description Define el perfil específico de un paciente.
 * @extends User
 */
export interface PatientProfile extends User {
  role: UserRole.Patient;
  symptoms: string[];
  diagnosis?: string;
  progress: number;
}

/**
 * @interface PsychologistProfile
 * @description Define el perfil específico de un psicólogo.
 * @extends User
 */
export interface PsychologistProfile extends User {
  role: UserRole.Psychologist;
  specialization: string;
  patients: string[]; 
}

/**
 * @interface AdminProfile
 * @description Define el perfil específico de un administrador.
 * @extends User
 */
export interface AdminProfile extends User {
  role: UserRole.Admin;
  permissions: string[];
}