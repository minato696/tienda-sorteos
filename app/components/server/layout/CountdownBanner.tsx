import { prisma } from '@/app/lib/prisma';
import CountdownTimer from '@/app/components/client/CountdownTimer';

export default async function CountdownBanner() {
  const next = await prisma.sorteo.findFirst({
    where: { fechaSorteo: { gt: new Date() } },
    orderBy: { fechaSorteo: 'asc' },
    select: { fechaSorteo: true },
  });

  if (!next) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-14 overflow-hidden">
      {/* degradado gaussiano */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_120%,#6da8ff_0%,#0062e0_45%,#003b9e_80%)]" />
      {/* confeti en loop */}
      <div className="absolute inset-0 opacity-70 bg-[url('/confetti.svg')] animate-confetti" />
      {/* contador */}
      <CountdownTimer targetDate={next.fechaSorteo.toISOString()} />
    </div>
  );
}
