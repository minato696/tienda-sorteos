import { prisma } from '@/app/lib/prisma';
import CountdownBannerSingleLine from '@/app/components/client/CountdownBannerSingleLine';

export default async function CountdownBanner() {
  const next = await prisma.sorteo.findFirst({
    where: { fechaSorteo: { gt: new Date() } },
    orderBy: { fechaSorteo: 'asc' },
    select: { fechaSorteo: true, titulo: true },
  });

  if (!next) return null;

  return (
    <div className="w-full h-full flex items-center">
      <CountdownBannerSingleLine 
        targetDate={next.fechaSorteo.toISOString()} 
        title="¡Próximo sorteo en vivo!" 
        subtitle={next.titulo || "SORTEO DE CARRO 1"}
      />
    </div>
  );
}