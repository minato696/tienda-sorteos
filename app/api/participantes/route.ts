// app/api/participantes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generarCodigoUnico() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  const body = await req.json();
  const { dni, nombres, apellidos, telefono, email, departamento, cantidad } = body;

  if (!dni || !nombres || !apellidos || !telefono || !email || !departamento || !cantidad) {
    return NextResponse.json({ success: false, error: 'Faltan datos' }, { status: 400 });
  }

  try {
    const participante = await prisma.participante.create({
      data: {
        dni,
        nombres,
        apellidos,
        telefono,
        email,
        departamento,
        tickets: {
          create: Array.from({ length: cantidad }, () => ({
            codigo: generarCodigoUnico(),
          })),
        },
      },
      include: {
        tickets: true,
      },
    });

    return NextResponse.json({ success: true, participante });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
