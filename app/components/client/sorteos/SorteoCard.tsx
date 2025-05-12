/* app/components/client/sorteos/SorteoCard.tsx */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/utils/formatters";

interface SorteoCardProps {
  id: string;
  titulo: string;
  precio: number;
  fechaSorteo: string;
  ticketsDisponibles: number;
  ticketsVendidos: number;
  imagenUrl?: string | null;
}

export default function SorteoCard(props: SorteoCardProps) {
  const {
    id, titulo, precio,
    fechaSorteo, ticketsDisponibles, ticketsVendidos, imagenUrl,
  } = props;

  const total      = ticketsDisponibles + ticketsVendidos;
  const porcentaje = Math.round((ticketsVendidos / total) * 100);
  const fecha      = new Date(fechaSorteo).toLocaleDateString("es-ES", {
    day: "numeric", month: "long", year: "numeric",
  });

  const [imgSrc, setImgSrc] = useState(
    imagenUrl?.trim() ? imagenUrl : "/images/default-sorteo.jpg"
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* ── Imagen ─────────────────────────────── */}
      <div className="h-48 bg-gray-200 relative">
        <Image
          src={imgSrc}
          alt={`Imagen del sorteo ${titulo}`}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
          priority
          onError={() => setImgSrc("/images/fallback-image.jpg")}
        />
        <div className="absolute top-4 right-4 bg-blue-900 text-white py-1 px-3 rounded-full text-sm font-medium">
          {formatCurrency(precio)}
        </div>
      </div>

      {/* ── Contenido ─────────────────────────── */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{titulo}</h3>

        {/* progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tickets: {ticketsVendidos}/{total}</span>
            <span>{porcentaje}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>

        {/* fecha + botones */}
        <div className="text-gray-700 mb-4">
          <p>Fecha del sorteo: {fecha}</p>
          <p>Quedan {ticketsDisponibles} tickets disponibles</p>
        </div>

        <div className="flex space-x-2">
          <Link
            href={`/sorteos/${id}`}
            className="flex-1 text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded font-medium"
          >
            Ver Detalles
          </Link>

          {/* 👇  navegación con ID */}
          <Link
            href={`/participar/${id}`}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium flex-1 text-center"
          >
            ¡Quiero Participar!
          </Link>
        </div>
      </div>
    </div>
  );
}
