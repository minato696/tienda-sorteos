// app/admin/sorteos/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import RaffleTable from '@/app/components/admin/RaffleTable';
import TableSkeleton from '@/app/components/admin/TableSkeleton';

export const metadata = {
  title: 'Gestión de Sorteos - Panel de Administración',
};

export default function SorteosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Sorteos</h1>
        
        <Link 
          href="/admin/sorteos/nuevo" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Sorteo
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Suspense fallback={<TableSkeleton columns={7} rows={5} />}>
          <RaffleTable />
        </Suspense>
      </div>
    </div>
  );
}