// app/admin/correo/page.tsx
export default function CorreoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Configuración de Correos</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Configuración SMTP</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Servidor SMTP</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="smtp.ejemplo.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puerto</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="587" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder="usuario@ejemplo.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" className="w-full border border-gray-300 rounded-md p-2" placeholder="••••••••" />
          </div>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Guardar Configuración
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Plantillas de Correo</h2>
        
        <div className="divide-y divide-gray-200">
          <div className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Confirmación de Compra</h3>
              <p className="text-sm text-gray-500">Correo enviado cuando un usuario compra tickets.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
          </div>
          
          <div className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Anuncio de Ganador</h3>
              <p className="text-sm text-gray-500">Correo enviado al ganador de un sorteo.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
          </div>
          
          <div className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Recordatorio de Sorteo</h3>
              <p className="text-sm text-gray-500">Correo enviado como recordatorio antes de un sorteo.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
          </div>
          
          <div className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">Recuperación de Contraseña</h3>
              <p className="text-sm text-gray-500">Correo enviado para recuperar contraseña.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
          </div>
        </div>
        
        <button className="mt-4 text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Crear Nueva Plantilla
        </button>
      </div>
    </div>
  );
}