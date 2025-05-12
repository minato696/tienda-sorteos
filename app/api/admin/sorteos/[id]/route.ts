import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Obtener un sorteo por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de sorteo inválido' },
        { status: 400 }
      );
    }
    
    const sorteo = await prisma.sorteo.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            participantes: true,
            tickets: true
          }
        }
      }
    });
    
    if (!sorteo) {
      return NextResponse.json(
        { error: 'Sorteo no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ sorteo });
  } catch (error) {
    console.error('Error al obtener sorteo:', error);
    return NextResponse.json(
      { error: 'Error al obtener sorteo' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un sorteo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de sorteo inválido' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.titulo || !body.descripcion || !body.precio || !body.fechaSorteo || !body.ticketsDisponibles || !body.premio) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Actualizar el sorteo
    const sorteo = await prisma.sorteo.update({
      where: { id },
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        imagenUrl: body.imagenUrl,
        precio: parseFloat(body.precio),
        fechaSorteo: new Date(body.fechaSorteo),
        ticketsDisponibles: parseInt(body.ticketsDisponibles),
        ticketsVendidos: parseInt(body.ticketsVendidos || 0),
        estado: body.estado,
        premio: body.premio,
        destacado: body.destacado === true || body.destacado === 'true',
      }
    });
    
    return NextResponse.json({ 
      message: 'Sorteo actualizado correctamente',
      sorteo 
    });
  } catch (error) {
    console.error('Error al actualizar sorteo:', error);
    return NextResponse.json(
      { error: 'Error al actualizar sorteo' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un sorteo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de sorteo inválido' },
        { status: 400 }
      );
    }
    
    // Verificar si hay participantes o tickets asociados
    const sorteo = await prisma.sorteo.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            participantes: true,
            tickets: true
          }
        }
      }
    });
    
    if (!sorteo) {
      return NextResponse.json(
        { error: 'Sorteo no encontrado' },
        { status: 404 }
      );
    }
    
    if (sorteo._count.participantes > 0 || sorteo._count.tickets > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar un sorteo con participantes o tickets asociados' },
        { status: 400 }
      );
    }
    
    // Eliminar el sorteo
    await prisma.sorteo.delete({
      where: { id }
    });
    
    return NextResponse.json({ 
      message: 'Sorteo eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar sorteo:', error);
    return NextResponse.json(
      { error: 'Error al eliminar sorteo' },
      { status: 500 }
    );
  }
}