// app/api/participar/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

function generarReferencia() {
  return 'REF-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

export async function POST(request) {
  try {
    const datos = await request.json();
    const { dni, nombres, apellidos, telefono, email, departamento, sorteoId, cantidad, total } = datos;
    
    // Validaciones básicas
    if (!dni || !nombres || !apellidos || !telefono || !email || !departamento || !sorteoId || !cantidad) {
      return NextResponse.json({ 
        mensaje: 'Todos los campos son obligatorios' 
      }, { status: 400 });
    }
    
    // Buscar el sorteo
    const sorteo = await prisma.Sorteo.findUnique({
      where: { id: sorteoId }
    });
    
    if (!sorteo) {
      return NextResponse.json({ 
        mensaje: 'El sorteo seleccionado no existe' 
      }, { status: 404 });
    }
    
    // Verificar si hay suficientes tickets disponibles
    if (sorteo.stockVendido + cantidad > sorteo.stockTotal) {
      return NextResponse.json({ 
        mensaje: 'No hay suficientes tickets disponibles' 
      }, { status: 400 });
    }
    
    // Buscar si el participante ya existe por DNI
    let participante = await prisma.Participante.findFirst({
      where: { dni }
    });
    
    // Si no existe, crear uno nuevo
    if (!participante) {
      participante = await prisma.Participante.create({
        data: {
          dni,
          nombres,
          apellidos,
          telefono,
          email,
          departamento
        }
      });
    } else {
      // Si existe, actualizar sus datos
      participante = await prisma.Participante.update({
        where: { id: participante.id },
        data: {
          nombres,
          apellidos,
          telefono,
          email,
          departamento
        }
      });
    }
    
    // Generar código de referencia para el pago
    const referencia = generarReferencia();
    
    // Crear tickets (uno por cada cantidad)
    const ticketsCreados = [];
    
    for (let i = 0; i < cantidad; i++) {
      // Generar un código único para el ticket
      const codigo = 'TICKET-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      
      const ticket = await prisma.Ticket.create({
        data: {
          codigo,
          sorteoId,
          participanteId: participante.id
        }
      });
      
      ticketsCreados.push(ticket);
    }
    
    // Actualizar el stock vendido del sorteo
    await prisma.Sorteo.update({
      where: { id: sorteoId },
      data: {
        stockVendido: sorteo.stockVendido + cantidad
      }
    });
    
    // Crear un registro en la tabla de transacciones o pagos pendientes
    // (Si tienes una tabla para esto)
    /*
    await prisma.Transaccion.create({
      data: {
        referencia,
        participanteId: participante.id,
        monto: total,
        estado: 'PENDIENTE'
      }
    });
    */
    
    return NextResponse.json({
      mensaje: 'Participación registrada correctamente',
      referencia,
      participanteId: participante.id,
      tickets: ticketsCreados.map(t => t.codigo)
    }, { status: 201 });
  } catch (error) {
    console.error('Error al procesar la participación:', error);
    
    return NextResponse.json({ 
      mensaje: 'Error en el servidor al procesar la solicitud' 
    }, { status: 500 });
  }
}