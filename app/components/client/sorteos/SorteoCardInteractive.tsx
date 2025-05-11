// app/components/client/sorteos/SorteoCardInteractive.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import SorteoInfo from '@/app/components/server/sorteos/SorteoInfo';
import ParticiparButton from '@/app/components/client/sorteos/ParticiparButton';

interface SorteoCardInteractiveProps {
  sorteo: {
    id: string;
    titulo: string;
    imagen: string;
    fechaSorteo: Date;
    precio: number;
    productName: string;
    descripcion: string;
    ticketsDisponibles: number;
    ticketsVendidos: number;
  };
}

export default function SorteoCardInteractive({ sorteo }: SorteoCardInteractiveProps) {
  const [cantidad, setCantidad] = useState(1);
  
  const incrementar = () => {
    if (cantidad < 10) setCantidad(prev => prev + 1);
  };
  
  const decrementar = () => {
    if (cantidad > 1) setCantidad(prev => prev - 1);
  };
  
  return (
    <div className="flex flex-col h-full">
      <SorteoInfo sorteo={sorteo} />
      
      <div className="p-4 bg-gray-50 mt-auto">
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={decrementar}
            className="bg-gray-200 hover:bg-gray-300 rounded-l-md px-3 py-1"
            disabled={cantidad <= 1}
          >
            -
          </button>
          <span className="bg-white px-4 py-1 border-t border-b">
            {cantidad}
          </span>
          <button
            onClick={incrementar}
            className="bg-gray-200 hover:bg-gray-300 rounded-r-md px-3 py-1"
            disabled={cantidad >= 10}
          >
            +
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Total:</span>
          <span className="font-bold">${sorteo.precio * cantidad}</span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href={`/sorteos/${sorteo.id}`}
            className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-center flex-1"
          >
            Ver detalles
          </Link>
          <ParticiparButton 
            sorteoId={sorteo.id} 
            cantidad={cantidad}
            precio={sorteo.precio}
          />
        </div>
      </div>
    </div>
  );
}