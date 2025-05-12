import Link from 'next/link';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Settings,
  BarChart4
} from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/sorteos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ticket className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold ml-3">Gestionar Sorteos</h2>
          </div>
          <p className="text-gray-600">Administra todos los sorteos, crea nuevos y edita los existentes.</p>
        </Link>
        
        <Link href="/admin/participantes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold ml-3">Participantes</h2>
          </div>
          <p className="text-gray-600">Visualiza todos los participantes registrados en los sorteos.</p>
        </Link>
        
        <Link href="/admin/estadisticas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart4 className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold ml-3">Estadísticas</h2>
          </div>
          <p className="text-gray-600">Visualiza métricas y estadísticas de ventas y participación.</p>
        </Link>
        
        <Link href="/admin/configuracion" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold ml-3">Configuración</h2>
          </div>
          <p className="text-gray-600">Configura los parámetros generales del sistema.</p>
        </Link>
      </div>
    </div>
  );
}