// app/admin/page.tsx
export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p className="mb-6">Bienvenido al panel de administración de sorteos.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Gestión de Sorteos</h3>
          <p className="text-gray-600">Administra los sorteos activos, crea nuevos y gestiona los ganadores.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Participantes</h3>
          <p className="text-gray-600">Visualiza y gestiona la información de los participantes.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Contenido del Sitio</h3>
          <p className="text-gray-600">Edita banners, textos y otras secciones del sitio principal.</p>
        </div>
      </div>
    </div>
  );
}