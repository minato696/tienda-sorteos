// app/admin/contenido/page.tsx
export default function ContenidoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestión de Contenido</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Banner Principal</h2>
        <p className="text-gray-500 mb-4">Edita las imágenes y textos del banner principal de la página.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Editar Banner
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Sección de Destacados</h2>
        <p className="text-gray-500 mb-4">Configura los sorteos destacados que aparecerán en la página principal.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Configurar Destacados
        </button>
      </div>
    </div>
  );
}