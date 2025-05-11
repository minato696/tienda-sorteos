"use client"
import React from 'react';

interface SorteoCardProps {
  id: string;
  title: string;
  price: number;
  endDate: string;
  totalTickets: number;
  soldTickets: number;
}

const SorteoCard: React.FC<SorteoCardProps> = ({ 
  title, 
  price, 
  endDate, 
  totalTickets, 
  soldTickets,
  id 
}) => {
  // Calcular el porcentaje de tickets vendidos
  const percentageSold = (soldTickets / totalTickets) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Imagen del premio (placeholder) */}
      <div className="h-48 bg-gray-300 relative">
        <div className="absolute top-4 right-4 bg-blue-900 text-white py-1 px-3 rounded-full text-sm font-medium">
          ${price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Tickets: {soldTickets}/{totalTickets}</span>
            <span>{Math.round(percentageSold)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full" 
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-gray-700 mb-4">
          <p>Fecha del sorteo: {endDate}</p>
          <p>Quedan {totalTickets - soldTickets} tickets disponibles</p>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={`/sorteos/${id}`} 
            className="flex-1 text-center bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded font-medium"
          >
            Ver Detalles
          </a>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SorteoCard;