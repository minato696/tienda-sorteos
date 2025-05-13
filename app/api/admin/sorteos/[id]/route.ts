/**
 * GET    /api/admin/sorteos/:id → detalle
 * PUT    /api/admin/sorteos/:id → actualizar
 * DELETE /api/admin/sorteos/:id → eliminar
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

type Params = { id: string };

/* ─────────────────── DETALLE ─────────────────── */
export async function GET(
  _req: NextRequest,
  { params }: { params: Params },
) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

  const sorteo = await prisma.sorteo.findUnique({
    where: { id },
    include: {
      _count: {
        select: { participantes: true, tickets: true },
      },
    },
  });
  if (!sorteo) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });

  return NextResponse.json(sorteo);
}

/* ─────────────────── ACTUALIZAR ─────────────────── */
export async function PUT(
  req: NextRequest,
  { params }: { params: Params },
) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

  const body = await req.json();
  try {
    const actualizado = await prisma.sorteo.update({
      where: { id },
      data: {
        titulo: body.titulo,
        descripcion: body.descripcion,
        imagenUrl: body.imagenUrl ?? null,
        precio: body.precio !== undefined ? Number(body.precio) : undefined,
        fechaSorteo: body.fechaSorteo ? new Date(body.fechaSorteo) : undefined,
        ticketsDisponibles:
          body.ticketsDisponibles !== undefined
            ? Number(body.ticketsDisponibles)
            : undefined,
        estado: body.estado, // 'ACTIVO' | 'FINALIZADO' | 'CANCELADO'
        premio: body.premio,
        valorPremio:
          body.valorPremio !== undefined ? Number(body.valorPremio) : undefined,
        destacado: body.destacado,
      },
    });

    return NextResponse.json(actualizado);
  } catch (err) {
    console.error('PUT /admin/sorteos/:id', err);
    return NextResponse.json({ error: 'No se pudo actualizar' }, { status: 500 });
  }
}

/* ─────────────────── ELIMINAR ─────────────────── */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Params },
) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

  // Verifica que no existan tickets/participantes
  const { _count } = await prisma.sorteo.findUniqueOrThrow({
    where: { id },
    select: { _count: { select: { tickets: true, participantes: true } } },
  });

  if (_count.tickets || _count.participantes) {
    return NextResponse.json(
      { error: 'No se puede eliminar: tiene registros asociados' },
      { status: 400 },
    );
  }

  await prisma.sorteo.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
