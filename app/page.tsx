import { prisma } from '@/app/lib/prisma';
import HeroSection from '@/app/components/server/layout/HeroSection';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';
import Link from 'next/link';

export default async function HomePage() {
  /* Incluimos imagenUrl en el SELECT para enviarlo al componente */
  const sorteos = await prisma.sorteo.findMany({
    where: {
      estado: 'ACTIVO',
      OR: [
        { destacado: true },
        { fechaSorteo: { gte: new Date() } },
      ],
    },
    orderBy: [{ destacado: 'desc' }, { fechaSorteo: 'asc' }],
    take: 3,
    select: {
      id: true,
      titulo: true,
      precio: true,
      fechaSorteo: true,
      ticketsDisponibles: true,
      ticketsVendidos: true,
      imagenUrl: true,           // <— ¡ahora la traemos!
    },
  });

  return (
    <>
      <HeroSection />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Sorteos Activos</h2>
          <p className="text-gray-600 text-center mb-8">
            Encuentra tu próximo premio y participa ahora
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorteos.length ? (
              sorteos.map((s) => (
                <SorteoCard
                  key={s.id}
                  id={s.id.toString()}
                  titulo={s.titulo}
                  precio={s.precio}
                  fechaSorteo={s.fechaSorteo.toISOString()}
                  ticketsDisponibles={s.ticketsDisponibles}
                  ticketsVendidos={s.ticketsVendidos}
                  imagenUrl={s.imagenUrl ?? undefined}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-16">
                <p>No hay sorteos activos en este momento.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/sorteos"
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold inline-block"
            >
              Ver Todos los Sorteos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
