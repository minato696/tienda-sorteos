// app/admin/sorteos/nuevo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RaffleForm from '@/app/components/admin/RaffleForm';

export default function NuevoSorteoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleCreateRaffle(formData: FormData) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/raffles', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el sorteo');
      }
      
      const data = await response.json();
      router.push(`/admin/sorteos/${data.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al crear el sorteo. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Nuevo Sorteo</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <RaffleForm 
          onSubmit={handleCreateRaffle} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
}