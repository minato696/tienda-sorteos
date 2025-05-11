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
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p>Precio: ${price}</p>
      <p>Fecha: {endDate}</p>
      <p>Tickets: {soldTickets}/{totalTickets}</p>
      <div className="mt-4 flex gap-2">
        <a href={`/sorteos/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ver detalles
        </a>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default SorteoCard;