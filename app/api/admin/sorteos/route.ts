/**
 * GET  /api/admin/sorteos   → lista todos los sorteos
 * POST /api/admin/sorteos   → crea un sorteo
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

/* ───────────── LISTAR ───────────── */
export async function GET() {
  const sorteos = await prisma.sorteo.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });
  return NextResponse.json(sorteos);
}

/* ───────────── CREAR ───────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    /* 1️⃣  validación mínima */
    const baseRequired = ['titulo', 'premio', 'estado'];
    const extraRequired =
      body.estado === 'PROXIMAMENTE'
        ? [] // no pedimos precio / fecha / tickets
        : ['precio', 'fechaSorteo', 'ticketsDisponibles'];

    const missing = [...baseRequired, ...extraRequired].filter(
      (k) => body[k] === undefined || body[k] === '',
    );

    if (missing.length) {
      return NextResponse.json(
        { error: `Faltan campos: ${missing.join(', ')}` },
        { status: 400 },
      );
    }

    /* 2️⃣  fecha válida (placeholder si es Próximamente) */
    let fecha: Date;
    if (body.estado === 'PROXIMAMENTE' || !body.fechaSorteo) {
      fecha = new Date('9999-12-31T23:59:59.999Z'); // muy lejos en el futuro
    } else {
      const d = new Date(body.fechaSorteo);
      if (isNaN(d.getTime())) {
        return NextResponse.json(
          { error: 'Fecha de sorteo inválida' },
          { status: 400 },
        );
      }
      fecha = d;
    }

    /* 3️⃣  crear sorteo */
    const nuevo = await prisma.sorteo.create({
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion ?? '',
        imagenUrl: body.imagenUrl ?? null,
        precio: Number(body.precio ?? 0),
        fechaSorteo: fecha,
        ticketsDisponibles: Number(body.ticketsDisponibles ?? 0),
        premio: body.premio,
        valorPremio: body.valorPremio ? Number(body.valorPremio) : null,
        destacado: Boolean(body.destacado),
        estado: body.estado, // ACTIVO | FINALIZADO | CANCELADO | PROXIMAMENTE
        proximamente: body.estado === 'PROXIMAMENTE',
      },
    });

    return NextResponse.json(nuevo, { status: 201 });
  } catch (err) {
    console.error('POST /api/admin/sorteos', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
