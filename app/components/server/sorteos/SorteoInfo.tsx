// app/components/server/sorteos/SorteoInfo.tsx
import Image from 'next/image';

// Implementar las funciones directamente en el archivo
function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('es-ES');
}

function formatCurrency(amount: number): string {
  return `S/ ${amount}`;
}

interface SorteoInfoProps {
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

export default function SorteoInfo({ sorteo }: SorteoInfoProps) {
  const porcentajeVendido = Math.round(
    (sorteo.ticketsVendidos / (sorteo.ticketsDisponibles + sorteo.ticketsVendidos)) * 100
  );
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 sm:h-64">
        <Image
          src={sorteo.imagen}
          alt={sorteo.titulo}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 bg-red-600 text-white font-bold py-1 px-3">
          Sorteo el {formatDate(sorteo.fechaSorteo)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{sorteo.titulo}</h3>
        <p className="text-gray-600 mb-3">{sorteo.productName}</p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg text-gray-800">
            {formatCurrency(sorteo.precio)}
          </span>
          <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">
            {sorteo.ticketsDisponibles} tickets disponibles
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${porcentajeVendido}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          {sorteo.ticketsVendidos} de {sorteo.ticketsDisponibles + sorteo.ticketsVendidos} tickets vendidos
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {sorteo.descripcion}
        </p>
      </div>
    </div>
  );
}