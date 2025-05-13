/**
 * POST /api/participar
 * Registra participante + tickets y actualiza contador.
 * Devuelve exactamente la estructura que lee /confirmacion.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const {
      sorteoId,
      dni,
      nombres,
      apellidos,
      telefono,
      email,
      departamento,
      cantidad,
    } = await req.json();

    /* ─── Validación rápida ───────────────────── */
    if (
      !sorteoId ||
      !dni ||
      !nombres ||
      !apellidos ||
      !telefono ||
      !email ||
      !cantidad
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 },
      );
    }

    /* ─── Verificar stock ─────────────────────── */
    const sorteo = await prisma.sorteo.findUniqueOrThrow({
      where: { id: sorteoId },
      select: {
        titulo: true,
        ticketsDisponibles: true,
        ticketsVendidos: true,
      },
    });

    if (cantidad > sorteo.ticketsDisponibles) {
      return NextResponse.json(
        { error: 'No hay suficientes tickets disponibles' },
        { status: 409 },
      );
    }

    /* ─── Transacción principal ───────────────── */
    const { participante, tickets } = await prisma.$transaction(
      async (tx) => {
        // 1) Participante
        const participante = await tx.participante.create({
          data: {
            dni,
            nombres,
            apellidos,
            telefono,
            email,
            departamento,
            cantidad,
            sorteoId,
          },
        });

        // 2) Tickets
        const ticketsData = Array.from({ length: cantidad }).map(() => ({
          codigo: nanoid(8).toUpperCase(),
          participanteId: participante.id,
          sorteoId,
        }));
        const created = await tx.ticket.createMany({
          data: ticketsData,
          skipDuplicates: false,
        });

        // 3) Contador
        await tx.sorteo.update({
          where: { id: sorteoId },
          data: { ticketsVendidos: { increment: cantidad } },
        });

        return { participante, tickets: ticketsData };
      },
    );

    /* ─── Respuesta que /confirmacion espera ──── */
    const payload = {
      sorteoTitulo: sorteo.titulo,
      id: participante.id,
      nombres: participante.nombres,
      apellidos: participante.apellidos,
      dni: participante.dni,
      cantidad: participante.cantidad,
      tickets: tickets.map((t) => ({ codigo: t.codigo })),
    };

    return NextResponse.json(payload, { status: 201 });
  } catch (err) {
    console.error('POST /api/participar', err);
    return NextResponse.json(
      { error: 'Error interno al registrar participante' },
      { status: 500 },
    );
  }
}
