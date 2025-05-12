'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/app/utils/formatters';
import { Edit, Trash, Eye, Plus } from 'lucide-react';

interface Sorteo {
  id: number;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;
  fechaSorteo: string;
  ticketsDisponibles: number;
  ticketsVendidos: number;
  estado: string;
  premio: string;
  destacado: boolean;
  createdAt: string;
}

export default function SorteosPage() {
  const [sorteos, setSorteos] = useState<Sorteo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSorteos = async () => {
      try {
        const response = await fetch('/api/admin/sorteos');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar sorteos');
        }
        
        setSorteos(data.sorteos);
      } catch (error) {
        console.error('Error fetching sorteos:', error);
        setError('Error al cargar sorteos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSorteos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este sorteo?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/sorteos/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al eliminar sorteo');
      }
      
      // Actualizar la lista de sorteos
      setSorteos(sorteos.filter(sorteo => sorteo.id !== id));
    } catch (error: any) {
      console.error('Error deleting sorteo:', error);
      alert(error.message || 'Error al eliminar sorteo');
    }
  };

  const getBadgeClass = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return 'bg-green-100 text-green-800';
      case 'FINALIZADO':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELADO':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Sorteos</h1>
        <Link 
          href="/admin/sorteos/nuevo"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Sorteo
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : sorteos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">No hay sorteos disponibles.</p>
          <Link 
            href="/admin/sorteos/nuevo"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear Primer Sorteo
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sorteo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sorteos.map((sorteo) => (
                <tr key={sorteo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md">
                        {sorteo.imagenUrl && (
                          <img 
                            src={sorteo.imagenUrl} 
                            alt={sorteo.titulo} 
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{sorteo.titulo}</div>
                        <div className="text-sm text-gray-500">Premio: {sorteo.premio}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(sorteo.precio)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sorteo.ticketsVendidos} / {sorteo.ticketsDisponibles + sorteo.ticketsVendidos}
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                      <div 
                        className="h-1.5 bg-blue-600 rounded-full" 
                        style={{ 
                          width: `${Math.round((sorteo.ticketsVendidos / (sorteo.ticketsDisponibles + sorteo.ticketsVendidos)) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(new Date(sorteo.fechaSorteo))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(sorteo.estado)}`}>
                      {sorteo.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/sorteos/${sorteo.id}`}
                        className="text-gray-600 hover:text-gray-900"
                        title="Ver detalles"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link 
                        href={`/admin/sorteos/${sorteo.id}/editar`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(sorteo.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}