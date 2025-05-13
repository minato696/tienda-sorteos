'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash, Eye, Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/utils/formatters';

/* ─── tipos ─── */
interface Sorteo {
  id: number;
  titulo: string;
  imagenUrl: string | null;
  precio: number;
  fechaSorteo: string;
  ticketsDisponibles: number;
  ticketsVendidos: number;
  estado: 'ACTIVO' | 'FINALIZADO' | 'CANCELADO';
  premio: string;
  destacado: boolean;
  proximamente: boolean;      // 👈 nuevo
  createdAt: string;
}

export default function SorteosAdmin() {
  const [sorteos, setSorteos] = useState<Sorteo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ─── fetch inicial ─── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/sorteos', { cache: 'no-store' });
        if (!res.ok) throw new Error();
        const data: Sorteo[] = await res.json();
        setSorteos(data);
      } catch {
        setError('Error al cargar sorteos. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─── eliminar ─── */
  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este sorteo?')) return;
    try {
      const res = await fetch(`/api/admin/sorteos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setSorteos((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert('No se pudo eliminar');
    }
  }

  const badge = (estado: string) =>
    ({
      ACTIVO: 'bg-green-100 text-green-800',
      FINALIZADO: 'bg-blue-100 text-blue-800',
      CANCELADO: 'bg-red-100 text-red-800',
    }[estado] ?? 'bg-gray-100 text-gray-800');

  /* ─── render ─── */
  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Sorteos</h1>
        <Link
          href="/admin/sorteos/nuevo"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Sorteo
        </Link>
      </header>

      {error && (
        <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center h-64 items-center">
          <span className="animate-spin h-12 w-12 border-4 rounded-full border-blue-500 border-t-transparent" />
        </div>
      ) : sorteos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">No hay sorteos disponibles.</p>
          <Link
            href="/admin/sorteos/nuevo"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear Primer Sorteo
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium text-gray-500 uppercase">
                <th className="px-6 py-3 text-left">Sorteo</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Tickets</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Próx.</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sorteos.map((s) => {
                const total = s.ticketsDisponibles + s.ticketsVendidos;
                const pct = total
                  ? Math.round((s.ticketsVendidos / total) * 100)
                  : 0;
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    {/* sorteo + imagen */}
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      {s.imagenUrl && (
                        <img
                          src={s.imagenUrl}
                          alt={s.titulo}
                          className="h-10 w-10 rounded-md object-cover bg-gray-200 mr-4"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {s.titulo}
                        </div>
                        <div className="text-gray-500 text-xs">
                          Premio: {s.premio}
                        </div>
                      </div>
                    </td>

                    {/* precio */}
                    <td className="px-6 py-4">
                      {formatCurrency(s.precio)}
                    </td>

                    {/* progreso */}
                    <td className="px-6 py-4">
                      <div>
                        {s.ticketsVendidos} / {total}
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-1.5 bg-blue-600 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>

                    {/* fecha */}
                    <td className="px-6 py-4">
                      {formatDate(new Date(s.fechaSorteo))}
                    </td>

                    {/* estado */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${badge(
                          s.estado,
                        )}`}
                      >
                        {s.estado}
                      </span>
                    </td>

                    {/* proximamente */}
                    <td className="px-6 py-4">
                      {s.proximamente ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Sí
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>

                    {/* acciones */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/sorteos/${s.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Ver"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/admin/sorteos/${s.id}/editar`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
