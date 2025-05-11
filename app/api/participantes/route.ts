// app/api/participantes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sorteoId = searchParams.get('sorteoId');
    
    let query = {};
    
    if (sorteoId) {
      query = { where: { sorteoId } };
    }
    
    const participantes = await db.participante.findMany(query);
    
    return NextResponse.json({ participantes });
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    return NextResponse.json(
      { error: 'Error al obtener participantes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, correo, telefono, sorteoId, cantidad } = body;
    
    // Validaciones
    if (!nombre || !correo || !sorteoId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Crear participante
    const participante = await db.participante.create({
      data: {
        nombre,
        correo,
        telefono,
        sorteoId,
        cantidad: cantidad || 1,
        fechaRegistro: new Date(),
      },
    });
    
    return NextResponse.json({ 
      message: 'Participante registrado correctamente',
      participante 
    });
  } catch (error) {
    console.error('Error al registrar participante:', error);
    return NextResponse.json(
      { error: 'Error al registrar participante' },
      { status: 500 }
    );
  }
}