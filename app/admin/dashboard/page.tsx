// app/admin/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-700">Sorteos Activos</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-700">Tickets Vendidos</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-700">Participantes</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-700">Ingresos</h3>
          <p className="text-2xl font-bold mt-2">S/0.00</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Actividad Reciente</h2>
        <p className="text-gray-500">No hay actividad reciente para mostrar.</p>
      </div>
    </div>
  );
}