// app/components/client/participar/ParticiparForm.tsx
"use client";

import { useState } from 'react';
import { participarEnSorteo } from '@/app/lib/actions/sorteoActions';

interface ParticiparFormProps {
  sorteos: Array<{
    id: string;
    titulo: string;
    imagen: string;
    fechaSorteo: Date;
    precio: number;
  }>;
}

export default function ParticiparForm({ sorteos }: ParticiparFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    sorteoId: sorteos.length > 0 ? sorteos[0].id : '',
    cantidad: 1
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value.toString());
      });
      
      const result = await participarEnSorteo(formDataObj);
      
      if (result.success) {
        setSuccess(true);
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          sorteoId: sorteos.length > 0 ? sorteos[0].id : '',
          cantidad: 1
        });
      } else {
        setError(result.error || 'Ocurrió un error al procesar tu participación');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">¡Gracias por participar!</h3>
        <p className="text-green-700 mb-4">
          Tu participación ha sido registrada correctamente. Te notificaremos por correo electrónico
          si resultas ganador del sorteo.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Participar en otro sorteo
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Participa en nuestros sorteos</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-red-700">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sorteoId" className="block text-gray-700 font-medium mb-2">
            Selecciona un sorteo
          </label>
          <select
            id="sorteoId"
            name="sorteoId"
            value={formData.sorteoId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {sorteos.map(sorteo => (
              <option key={sorteo.id} value={sorteo.id}>
                {sorteo.titulo} - Sorteo el {new Date(sorteo.fechaSorteo).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="cantidad" className="block text-gray-700 font-medium mb-2">
            Cantidad de tickets
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium disabled:opacity-70"
        >
          {isSubmitting ? 'Procesando...' : 'Participar Ahora'}
        </button>
      </form>
    </div>
  );
}