'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SorteoCardProps {
  id: string;
  titulo: string;
  precio: number;
  fechaSorteo: string;      // ISO
  imagenUrl?: string | null;
  proximamente?: boolean;
}

export default function SorteoCard({
  id,
  titulo,
  precio,
  fechaSorteo,
  imagenUrl,
  proximamente = false,
}: SorteoCardProps) {
  /* formatea fecha */
  const fechaObj = new Date(fechaSorteo);
  const fechaLegible = fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  /* no mostrar si es 9999-12-31 o proximamente */
  const mostrarFecha =
    !proximamente && fechaObj.getFullYear() !== 9999;

  const [imgSrc, setImgSrc] = useState(
    imagenUrl?.trim() ? imagenUrl : '/images/default-sorteo.jpg',
  );

  return (
    <div className="group bg-white rounded-xl shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200">
      {/* imagen */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imgSrc}
          alt={titulo}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgSrc('/images/fallback-image.jpg')}
          priority
        />

        {/* precio */}
        <span className="absolute top-3 right-3 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          S/ {precio}
        </span>

        {/* cinta Próximamente */}
        {proximamente && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            Próximamente
          </span>
        )}
      </div>

      {/* cuerpo */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {titulo}
        </h3>

        {mostrarFecha && (
          <p className="text-sm text-gray-600">
            Fecha del sorteo: {fechaLegible}
          </p>
        )}

        <div className="flex space-x-2 pt-2">
          <Link
            href={`/sorteos/${id}`}
            className="flex-1 text-center bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-md text-sm font-medium"
          >
            Ver Detalles
          </Link>

          <button
            disabled={proximamente}
            onClick={() =>
              !proximamente && window.open(`/participar/${id}`, '_self')
            }
            className={`flex-1 text-center py-2 rounded-md text-sm font-medium ${
              proximamente
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            ¡Quiero Participar!
          </button>
        </div>
      </div>
    </div>
  );
}
