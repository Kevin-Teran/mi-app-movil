/**
 * @file page.tsx
 * @route app/(dashboard)/patient/page.tsx
 * @description Dashboard principal para el rol de Paciente.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

/**
 * @function PatientDashboard
 * @description Renderiza el panel de control del paciente.
 * @returns {JSX.Element}
 */
export default function PatientDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard del Paciente</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold">Mi Progreso</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Aquí verás tu progreso.</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold">Tareas Pendientes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Aquí verás tus tareas.</p>
        </div>
      </div>
    </div>
  );
}