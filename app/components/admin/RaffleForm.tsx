// app/components/admin/RaffleForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Calendar, Upload } from 'lucide-react';

type RaffleFormProps = {
  raffle?: any; // Tipado completo aquí
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
};

export default function RaffleForm({ 
  raffle, 
  onSubmit, 
  isSubmitting 
}: RaffleFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    raffle?.imageUrl || null
  );
  
  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convertir fechas a formato ISO
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
    const drawDate = new Date(formData.get('drawDate') as string);
    
    formData.set('startDate', startDate.toISOString());
    formData.set('endDate', endDate.toISOString());
    formData.set('drawDate', drawDate.toISOString());
    
    // Si estamos editando, incluir el ID
    if (raffle?.id) {
      formData.set('id', raffle.id);
    }
    
    onSubmit(formData);
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título y estado */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título del sorteo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={raffle?.title || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={raffle?.status || 'UPCOMING'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="UPCOMING">Próximo</option>
            <option value="ACTIVE">Activo</option>
            <option value="FINISHED">Finalizado</option>
            <option value="CANCELLED">Cancelado</option>
          </select>
        </div>
      </div>
      
      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={raffle?.description || ''}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Imagen del sorteo
        </label>
        <div className="mt-1 flex items-center">
          <div className="flex-shrink-0 h-32 w-32 bg-gray-100 rounded-md overflow-hidden relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Vista previa"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Calendar className="h-10 w-10 text-gray-300" />
              </div>
            )}
          </div>
          <div className="ml-5">
            <label
              htmlFor="image"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir imagen
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF hasta 5MB
            </p>
          </div>
        </div>
      </div>
      
      {/* Premio y valor */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="prize" className="block text-sm font-medium text-gray-700">
            Premio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="prize"
            name="prize"
            required
            defaultValue={raffle?.prize || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="prizeValue" className="block text-sm font-medium text-gray-700">
            Valor del premio (S/)
          </label>
          <input
            type="number"
            id="prizeValue"
            name="prizeValue"
            min="0"
            step="0.01"
            defaultValue={raffle?.prizeValue || ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Tickets y precio */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700">
            Cantidad de tickets <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="totalTickets"
            name="totalTickets"
            required
            min="1"
            defaultValue={raffle?.totalTickets || '100'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
            Precio por ticket (S/) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            required
            min="0"
            step="0.01"
            defaultValue={raffle?.ticketPrice || '10'}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Fechas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Fecha de inicio <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            required
            defaultValue={raffle?.startDate ? new Date(raffle.startDate).toISOString().slice(0, 16) : ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Fecha de finalización <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            required
            defaultValue={raffle?.endDate ? new Date(raffle.endDate).toISOString().slice(0, 16) : ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="drawDate" className="block text-sm font-medium text-gray-700">
            Fecha del sorteo <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="drawDate"
            name="drawDate"
            required
            defaultValue={raffle?.drawDate ? new Date(raffle.drawDate).toISOString().slice(0, 16) : ''}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Botones */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : raffle ? 'Actualizar sorteo' : 'Crear sorteo'}
        </button>
      </div>
    </form>
  );
}