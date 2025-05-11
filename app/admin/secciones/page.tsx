// app/admin/secciones/page.tsx
export default function SeccionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Secciones Informativas</h1>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Nueva Sección
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Cómo Funciona</h2>
          <p className="text-gray-500 mb-4">Explicación del funcionamiento de los sorteos para los usuarios.</p>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">Ver</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Preguntas Frecuentes</h2>
          <p className="text-gray-500 mb-4">Respuestas a las preguntas más comunes de los usuarios.</p>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">Ver</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Términos y Condiciones</h2>
          <p className="text-gray-500 mb-4">Términos legales y condiciones de uso del servicio.</p>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">Ver</button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-2">Contacto</h2>
          <p className="text-gray-500 mb-4">Información de contacto y formulario para usuarios.</p>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Editar</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
}