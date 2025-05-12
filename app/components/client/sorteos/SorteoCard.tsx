"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/app/utils/formatters';

interface SorteoCardProps {
  id: string;
  titulo: string;
  precio: number;
  fechaSorteo: string;
  ticketsDisponibles: number;
  ticketsVendidos: number;
  imagenUrl?: string;
}

export default function SorteoCard({ 
  id, 
  titulo, 
  precio, 
  fechaSorteo, 
  ticketsDisponibles, 
  ticketsVendidos,
  imagenUrl = '/images/default-sorteo.jpg'
}: SorteoCardProps) {
  const router = useRouter();
  const total = ticketsDisponibles + ticketsVendidos;
  const porcentaje = Math.round((ticketsVendidos / total) * 100);
  
  // Formatear fecha
  const fecha = new Date(fechaSorteo);
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const handleParticipate = () => {
    router.push(`/participar/${id}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 relative">
        {/* Imagen del sorteo */}
        <img 
          src={imagenUrl} 
          alt={titulo} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Si la imagen falla, usar la imagen por defecto
            (e.target as HTMLImageElement).src = '/images/default-sorteo.jpg';
          }}
        />
        <div className="absolute top-4 right-4 bg-blue-900 text-white py-1 px-3 rounded-full text-sm font-medium">
          {formatCurrency(precio)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{titulo}</h3>
        
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tickets: {ticketsVendidos}/{total}</span>
            <span>{porcentaje}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" 
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-gray-700 mb-4">
          <p>Fecha del sorteo: {fechaFormateada}</p>
          <p>Quedan {ticketsDisponibles} tickets disponibles</p>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            href={`/sorteos/${id}`} 
            className="flex-1 text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded font-medium"
          >
            Ver Detalles
          </Link>
          <button 
            onClick={handleParticipate}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium"
          >
            ¡Quiero Participar!
          </button>
        </div>
      </div>
    </div>
  );
}