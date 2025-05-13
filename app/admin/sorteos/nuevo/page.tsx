'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft, Upload, Image } from 'lucide-react';

export default function NuevoSorteoPage() {
  const router = useRouter();
  /* ---------- STATE ---------- */
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    premio: '',
    precio: '50',                // valor por defecto
    fechaSorteo: '',
    ticketsDisponibles: '',
    ticketsVendidos: '0',
    estado: 'ACTIVO',            // ACTIVO | FINALIZADO | CANCELADO | PROXIMAMENTE
    destacado: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/images/default-sorteo.jpg');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verificar si el estado es "PROXIMAMENTE" para deshabilitar campos
  const isComingSoon = formData.estado === "PROXIMAMENTE";
  
 /* ---------- HANDLERS ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tipo de archivo
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      setError('Solo se permiten archivos JPG y PNG');
      return;
    }
    
    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    // Guardar archivo para subir
    setImage(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Primero, subir la imagen si existe
      let imagenUrl = '/images/default-sorteo.jpg';
      
      if (image) {
        setUploadingImage(true);
        // Crear FormData para la imagen
        const imageFormData = new FormData();
        imageFormData.append('file', image);
        
        // Subir la imagen
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Error al subir la imagen');
        }
        
        const uploadResult = await uploadResponse.json();
        imagenUrl = uploadResult.url;
        setUploadingImage(false);
      }
      
      // Luego, crear el sorteo
      const response = await fetch('/api/admin/sorteos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imagenUrl,
          precio: parseFloat(formData.precio),
          ticketsDisponibles: parseInt(formData.ticketsDisponibles),
          ticketsVendidos: parseInt(formData.ticketsVendidos),
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear sorteo');
      }
      
      // Redirigir a la lista de sorteos
      router.push('/admin/sorteos');
    } catch (error: any) {
      console.error('Error creating sorteo:', error);
      setError(error.message || 'Error al crear sorteo. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Crear Nuevo Sorteo</h1>
        <Link 
          href="/admin/sorteos"
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Información del Sorteo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título del Sorteo *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="premio" className="block text-sm font-medium text-gray-700 mb-1">
                Premio *
              </label>
              <input
                type="text"
                id="premio"
                name="premio"
                value={formData.premio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen del Sorteo
            </label>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-32 w-32 border rounded-md overflow-hidden bg-gray-100">
                <img 
                  src={imagePreview} 
                  alt="Vista previa" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Imagen
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">Formatos permitidos: JPG, PNG (se convertirá a WebP)</p>
                <p className="text-xs text-gray-500">Tamaño recomendado: 800x600 píxeles</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="fechaSorteo" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha del Sorteo *
            </label>
            <input
              type="datetime-local"
              id="fechaSorteo"
              name="fechaSorteo"
              value={formData.fechaSorteo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isComingSoon ? 'opacity-50 bg-gray-100' : ''}`}
              required={!isComingSoon}
              disabled={isComingSoon}
            />
            {isComingSoon && (
              <p className="mt-1 text-xs text-gray-500 italic">
                Este campo se configurará más adelante
              </p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Detalles y Precios (Soles Peruanos)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio por Ticket (S/) *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isComingSoon ? 'opacity-50 bg-gray-100' : ''}`}
                required={!isComingSoon}
                disabled={isComingSoon}
              />
              {isComingSoon && (
                <p className="mt-1 text-xs text-gray-500 italic">
                  Este campo se configurará más adelante
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                Estado *
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="ACTIVO">Activo</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="CANCELADO">Cancelado</option>
                <option value="PROXIMAMENTE">Próximamente</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="ticketsDisponibles" className="block text-sm font-medium text-gray-700 mb-1">
                Tickets Disponibles *
              </label>
              <input
                type="number"
                id="ticketsDisponibles"
                name="ticketsDisponibles"
                value={formData.ticketsDisponibles}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isComingSoon ? 'opacity-50 bg-gray-100' : ''}`}
                required={!isComingSoon}
                disabled={isComingSoon}
              />
              <p className="mt-1 text-xs text-gray-500">
                {isComingSoon 
                  ? "Este campo se configurará más adelante" 
                  : "Número total de tickets que pueden venderse para este sorteo"}
              </p>
            </div>
            
            <div>
              <label htmlFor="ticketsVendidos" className="block text-sm font-medium text-gray-700 mb-1">
                Tickets Vendidos Iniciales
              </label>
              <input
                type="number"
                id="ticketsVendidos"
                name="ticketsVendidos"
                value={formData.ticketsVendidos}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Solo si ya hay ventas previas o fuera de la plataforma
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="destacado"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="destacado" className="ml-2 block text-sm text-gray-700">
                Destacar este sorteo en la página principal
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Link 
            href="/admin/sorteos"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading || uploadingImage ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {uploadingImage ? 'Subiendo imagen...' : 'Guardando...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Sorteo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}