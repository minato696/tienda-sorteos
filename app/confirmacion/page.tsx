// app/confirmacion/page.tsx
import Link from 'next/link';

export default function ConfirmacionPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">¡Participación Exitosa!</h1>
        
        <p className="text-gray-600 mb-6">
          Tu participación ha sido registrada correctamente. Hemos enviado un correo electrónico con los detalles de tu ticket.
        </p>
        
        <div className="mb-6 bg-blue-50 p-4 rounded-md text-left">
          <h2 className="font-medium text-blue-700 mb-2">Detalles de tu participación:</h2>
          <p><span className="font-medium">Código de Ticket:</span> ABC12345</p>
          <p><span className="font-medium">Sorteo:</span> Gran Sorteo de Auto</p>
          <p><span className="font-medium">Fecha del Sorteo:</span> 30/05/2025</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Volver al Inicio
          </Link>
          
          <Link 
            href="/sorteos"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Ver Más Sorteos
          </Link>
        </div>
      </div>
    </div>
  );
}