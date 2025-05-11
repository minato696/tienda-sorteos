// app/components/admin/RaffleTable.tsx (actualizado)
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/app/lib/prisma';
import { formatCurrency } from '@/app/utils/formatters';
import { Eye, Edit, Trash, Calendar } from 'lucide-react';
import RaffleStatusBadge from './RaffleStatusBadge';

export default async function RaffleTable() {
  const sorteos = await prisma.sorteo.findMany({
    orderBy: [
      {
        creadoEn: 'desc',
      },
    ],
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sorteo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tickets
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Sorteo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Creado
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sorteos.length > 0 ? (
            sorteos.map((sorteo) => (
              <tr key={sorteo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md relative">
                      {sorteo.imagenUrl ? (
                        <Image
                          src={sorteo.imagenUrl}
                          alt={sorteo.titulo}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {sorteo.titulo}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {sorteo.descripcion}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatCurrency(Number(sorteo.precio))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {sorteo.stockVendido} / {sorteo.stockTotal}
                  </div>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-1.5 bg-blue-600 rounded-full"
                      style={{
                        width: `${(sorteo.stockVendido / sorteo.stockTotal) * 100}%`,
                      }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(sorteo.fechaSorteo).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(sorteo.fechaSorteo).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(sorteo.creadoEn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/admin/sorteos/${sorteo.id}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/admin/sorteos/${sorteo.id}/editar`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        // Implementar lógica de eliminación
                      }}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                No hay sorteos disponibles. ¡Crea tu primer sorteo!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}