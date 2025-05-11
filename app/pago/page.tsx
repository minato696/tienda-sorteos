// app/pago/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PagoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const participanteId = searchParams.get('participanteId');
  const ticketId = searchParams.get('ticketId');
  
  const [participante, setParticipante] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [sorteo, setSorteo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!participanteId || !ticketId) {
      setError('Información de pago incompleta');
      setLoading(false);
      return;
    }

    // Aquí harías una petición a tu API para obtener los detalles del participante, ticket y sorteo
    // Por ahora usaremos datos de ejemplo
    setParticipante({
      id: participanteId,
      nombres: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@example.com'
    });
    
    setTicket({
      id: ticketId,
      codigo: 'ABC12345',
    });
    
    setSorteo({
      titulo: 'Gran Sorteo de Auto',
      precio: 10.00,
    });
    
    setLoading(false);
  }, [participanteId, ticketId]);

  const handlePagoExitoso = () => {
    // Aquí implementarías la lógica de pago real
    // Después de un pago exitoso, redirige a la página de confirmación
    router.push('/confirmacion');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información de pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
          <Link href="/participar" className="mt-4 inline-block text-blue-600 hover:underline">
            Volver a participar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Finalizar tu Compra</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Resumen de tu Participación</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="font-medium">Sorteo:</span> {sorteo?.titulo}</p>
            <p><span className="font-medium">Código de Ticket:</span> {ticket?.codigo}</p>
            <p><span className="font-medium">Precio:</span> S/ {sorteo?.precio.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Datos del Participante</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="font-medium">Nombre:</span> {participante?.nombres} {participante?.apellidos}</p>
            <p><span className="font-medium">Email:</span> {participante?.email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Métodos de Pago</h2>
          <div className="space-y-2">
            <div className="border border-gray-300 rounded-md p-4 flex items-center">
              <input
                type="radio"
                id="yape"
                name="metodoPago"
                className="h-4 w-4"
                defaultChecked
              />
              <label htmlFor="yape" className="ml-2 block">
                Yape
              </label>
            </div>
            
            <div className="border border-gray-300 rounded-md p-4 flex items-center">
              <input
                type="radio"
                id="transferencia"
                name="metodoPago"
                className="h-4 w-4"
              />
              <label htmlFor="transferencia" className="ml-2 block">
                Transferencia Bancaria
              </label>
            </div>
          </div>
        </div>
        
        <button
          onClick={handlePagoExitoso}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Realizar Pago
        </button>
      </div>
    </div>
  );
}