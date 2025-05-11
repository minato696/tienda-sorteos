// app/lib/actions/sorteoActions.ts
'use server';

import { db } from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

// Acción para participar en un sorteo
export async function participarEnSorteo(formData: FormData) {
  try {
    const nombre = formData.get('nombre') as string;
    const correo = formData.get('correo') as string;
    const telefono = formData.get('telefono') as string;
    const sorteoId = formData.get('sorteoId') as string;
    const cantidadStr = formData.get('cantidad') as string;
    const cantidad = parseInt(cantidadStr, 10);
    
    // Validaciones
    if (!nombre || !correo || !telefono || !sorteoId || !cantidad) {
      return { success: false, error: 'Todos los campos son requeridos' };
    }
    
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 10) {
      return { success: false, error: 'Cantidad de tickets inválida' };
    }
    
    // Verificar sorteo
    const sorteo = await db.sorteo.findUnique({
      where: { id: sorteoId },
    });
    
    if (!sorteo || sorteo.cerrado) {
      return { success: false, error: 'El sorteo no está disponible' };
    }
    
    if (sorteo.ticketsDisponibles < cantidad) {
      return { success: false, error: 'No hay suficientes tickets disponibles' };
    }
    
    // Crear participante
    await db.participante.create({
      data: {
        nombre,
        correo,
        telefono,
        sorteoId,
        cantidad,
        fechaRegistro: new Date(),
      },
    });
    
    // Actualizar disponibilidad de tickets
    await db.sorteo.update({
      where: { id: sorteoId },
      data: {
        ticketsDisponibles: { decrement: cantidad },
        ticketsVendidos: { increment: cantidad },
      },
    });
    
    // Revalidar rutas
    revalidatePath('/participar');
    revalidatePath('/sorteos');
    revalidatePath(`/sorteos/${sorteoId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error al registrar participante:', error);
    return { success: false, error: 'Error al procesar su participación' };
  }
}

// Acción para agregar al carrito
export async function agregarAlCarrito({ 
  sorteoId, 
  cantidad, 
  precio 
}: { 
  sorteoId: string; 
  cantidad: number; 
  precio: number;
}) {
  try {
    // Validaciones
    if (!sorteoId || cantidad <= 0) {
      return { success: false, error: 'Datos inválidos' };
    }
    
    // Verificar sorteo
    const sorteo = await db.sorteo.findUnique({
      where: { id: sorteoId },
    });
    
    if (!sorteo || sorteo.cerrado) {
      return { success: false, error: 'El sorteo no está disponible' };
    }
    
    if (sorteo.ticketsDisponibles < cantidad) {
      return { success: false, error: 'No hay suficientes tickets disponibles' };
    }
    
    // Aquí implementarías la lógica para agregar al carrito
    // Esto puede ser guardando en la sesión, en una tabla de carrito, etc.
    // Por simplicidad, asumiremos que se implementa correctamente
    
    // Si estás usando una base de datos, puedes hacer algo como:
    /*
    await db.carritoItem.create({
      data: {
        sorteoId,
        cantidad,
        precio,
        usuarioId: 'id-del-usuario', // Obtener de la sesión
      },
    });
    */
    
    // Revalidar rutas
    revalidatePath('/carrito');
    
    return { success: true };
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    return { success: false, error: 'Error al procesar su solicitud' };
  }
}