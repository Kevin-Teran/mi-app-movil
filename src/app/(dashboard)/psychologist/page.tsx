/**
 * @file page.tsx
 * @route app/(dashboard)/psychologist/page.tsx
 * @description Dashboard principal para el rol de Psicólogo.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

/**
 * @function PsychologistDashboard
 * @description Renderiza el panel de control del psicólogo.
 * @returns {JSX.Element}
 */
export default function PsychologistDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard del Psicólogo</h1>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="font-semibold">Mis Pacientes</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Aquí verás la lista de tus pacientes.</p>
      </div>
    </div>
  );
}