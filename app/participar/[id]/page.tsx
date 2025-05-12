// app/participar/[id]/page.tsx
import { prisma } from '@/app/lib/prisma';
import ParticiparForm from '@/app/components/client/participar/ParticiparForm';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function ParticiparPage({ params }: Props) {
  const id = Number(params.id);

  const sorteo = await prisma.sorteo.findUnique({
    where: { id },
    select: { id: true, titulo: true, precio: true, imagenUrl: true },
  });

  if (!sorteo) notFound();

  return <ParticiparForm sorteo={sorteo} />;
}
