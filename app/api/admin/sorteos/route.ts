import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Obtener todos los sorteos
export async function GET(request: NextRequest) {
  try {
    const sorteos = await prisma.sorteo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ sorteos });
  } catch (error) {
    console.error('Error al obtener sorteos:', error);
    return NextResponse.json(
      { error: 'Error al obtener sorteos' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo sorteo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.titulo || !body.descripcion || !body.precio || !body.fechaSorteo || !body.ticketsDisponibles || !body.premio) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Crear el sorteo
    const sorteo = await prisma.sorteo.create({
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        imagenUrl: body.imagenUrl || '/images/default-sorteo.jpg',
        precio: parseFloat(body.precio),
        fechaSorteo: new Date(body.fechaSorteo),
        ticketsDisponibles: parseInt(body.ticketsDisponibles),
        ticketsVendidos: parseInt(body.ticketsVendidos || 0),
        estado: body.estado || 'ACTIVO',
        premio: body.premio,
        destacado: body.destacado === true || body.destacado === 'true',
      }
    });
    
    return NextResponse.json({ 
      message: 'Sorteo creado correctamente',
      sorteo 
    });
  } catch (error) {
    console.error('Error al crear sorteo:', error);
    return NextResponse.json(
      { error: 'Error al crear sorteo' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}