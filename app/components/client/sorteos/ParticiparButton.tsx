// app/components/client/sorteos/ParticiparButton.tsx
"use client";

import { useState } from 'react';
import { agregarAlCarrito } from '@/app/lib/actions/sorteoActions';

interface ParticiparButtonProps {
  sorteoId: string;
  cantidad: number;
  precio: number;
}

export default function ParticiparButton({ 
  sorteoId, 
  cantidad, 
  precio 
}: ParticiparButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleComprar = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await agregarAlCarrito({
        sorteoId,
        cantidad,
        precio
      });
      
      if (result.success) {
        // Opcional: redirigir al carrito o mostrar notificación
        window.location.href = '/carrito';
      } else {
        setError(result.error || 'Error al agregar al carrito');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <button
        onClick={handleComprar}
        disabled={isLoading}
        className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded text-center flex-1 disabled:opacity-70"
      >
        {isLoading ? 'Agregando...' : 'Comprar'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
    </>
  );
}