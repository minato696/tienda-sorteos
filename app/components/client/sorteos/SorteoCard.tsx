'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SorteoCardProps {
  id: string;
  titulo: string;
  precio: number;
  fechaSorteo: string;
  imagenUrl?: string | null;
  proximamente?: boolean;
}

// Función para determinar el color de fondo según el ID
const getGradientClass = (id: string) => {
  const idNumber = parseInt(id, 10) || 0;
  const options = [
    'bg-orange-500',  // Naranja (primera tarjeta)
    'bg-indigo-700',  // Azul oscuro (segunda tarjeta)
    'bg-teal-500',    // Verde azulado (tercera tarjeta)
    'bg-purple-600',  // Morado
  ];
  return options[idNumber % options.length];
};

// Función para determinar el color del fondo azul
const getBlueClass = (id: string) => {
  const idNumber = parseInt(id, 10) || 0;
  const options = [
    'bg-blue-500',    // Azul estándar
    'bg-blue-500',    // Mismo azul para consistencia
    'bg-blue-500',    // Mismo azul para consistencia
    'bg-blue-500',    // Mismo azul para consistencia
  ];
  return options[idNumber % options.length];
};

export default function SorteoCard({
  id,
  titulo,
  precio,
  fechaSorteo,
  imagenUrl,
  proximamente = false,
}: SorteoCardProps) {
  // Formatear fecha al estilo "30 May"
  const fechaObj = new Date(fechaSorteo);
  const dia = fechaObj.getDate();
  const mes = fechaObj.toLocaleDateString('es-ES', { month: 'short' }).split('.')[0];
  const fechaFormateada = `${dia} ${mes.charAt(0).toUpperCase() + mes.slice(1)}`;
  
  // Calcular días faltantes
  const hoy = new Date();
  const diferenciaTiempo = fechaObj.getTime() - hoy.getTime();
  const diasFaltantes = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
  
  // Formatear el precio para mostrar como "S/ 50"
  const precioFormateado = `S/ ${precio}`;
  
  // Estado para la imagen
  const [imgSrc, setImgSrc] = useState('/images/logo-efectivo.png');

  // Imágenes de respaldo por si no hay imagenUrl
  const fallbackImages = [
    '/images/premios/auto.jpg',
    '/images/premios/departamento.jpg',
    '/images/premios/iphone.jpg',
  ];
  
  // Seleccionar una imagen de respaldo basada en el ID
  const fallbackImage = fallbackImages[parseInt(id, 10) % fallbackImages.length];

  return (
    <div className="group relative transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-xl">
      {/* Efecto de sombra en hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>
      
      {/* Tarjeta con recortes laterales */}
      <div className="relative bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {/* Encabezado con título y fecha */}
        <div className={`${getGradientClass(id)} text-white px-4 py-3 flex justify-between items-center relative`}>
          {/* Título del sorteo - cambiado como se solicitó */}
          <div className="flex items-center">
            <span className="text-sm font-medium">{titulo}</span>
          </div>
          
          {/* Fecha del sorteo */}
          <div className="flex items-center space-x-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{fechaFormateada}</span>
          </div>
          
 
          {/* Recortes de borde tipo rompecabezas */}
          <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white rounded-full"></div>
        </div>

        {/* Línea punteada */}
        <div className="border-b border-dashed border-gray-300"></div>
        
        {/* Imagen principal del sorteo */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={imagenUrl || fallbackImage}
            alt={titulo}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              // Si falla la carga, intentar con una imagen de respaldo
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackImage) {
                target.src = fallbackImage;
              }
            }}
            priority
          />         
     
        </div>

        
        {/* Pie de tarjeta con costo y botón */}
        <div className="p-3 flex justify-between items-center bg-white">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-pink-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <div>
              <span className="text-xs text-gray-500">Costo Ticket:</span>
              <div className="text-pink-600 font-medium text-base">{precioFormateado}</div>
            </div>
          </div>
          
          <button
            disabled={proximamente}
            onClick={() => !proximamente && window.open(`/participar/${id}`, '_self')}
            className={`px-5 py-2 rounded-full text-sm ${
              proximamente
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            } font-medium transition-colors`}
          >
            Participa
          </button>
        </div>
        
        {/* Recortes laterales tipo rompecabezas */}
        <div className="absolute left-0 top-1/3 w-2 h-4 bg-gray-100 rounded-r-full"></div>
        <div className="absolute right-0 top-1/3 w-2 h-4 bg-gray-100 rounded-l-full"></div>
      </div>
    </div>
  );
}