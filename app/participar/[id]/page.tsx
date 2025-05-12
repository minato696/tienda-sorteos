// app/participar/[id]/page.tsx
import { prisma } from '@/app/lib/prisma';
import ParticiparForm from '@/app/components/client/participar/ParticiparForm';
import { notFound } from 'next/navigation';

type Params = { id: string };

export default async function ParticiparPage({
  params,
}: {
  params: Promise<Params>;
}) {
  /* ── 1) Espera params ─────────────────────── */
  const { id } = await params;          // 👈  obligatorio en Next 15
  const sorteoId = Number(id);

  /* ── 2) Carga el sorteo ───────────────────── */
  const sorteo = await prisma.sorteo.findUnique({
    where: { id: sorteoId },
    select: {
      id: true,
      titulo: true,
      precio: true,
      imagenUrl: true,
    },
  });

  if (!sorteo) notFound();              // 404 si no existe

  /* ── 3) Renderiza el formulario ───────────── */
  return <ParticiparForm sorteo={sorteo} />;
}
