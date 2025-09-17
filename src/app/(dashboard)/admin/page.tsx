/**
 * @file page.tsx
 * @route app/(dashboard)/admin/page.tsx
 * @description Dashboard principal para el rol de Administrador.
 * @author kevin mariano
 * @version 1.0.0
 * @since 1.0.0
 * @copyright SENA 2025
 */

/**
 * @function AdminDashboard
 * @description Renderiza el panel de control del administrador.
 * @returns {JSX.Element}
 */
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="font-semibold">Gestión de Usuarios</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Aquí podrás gestionar psicólogos y pacientes.</p>
      </div>
    </div>
  );
}