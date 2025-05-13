import { prisma } from '@/app/lib/prisma';
import ThumbnailGallery from '@/app/components/server/layout/ThumbnailGallery';
import HeroSection from '@/app/components/server/layout/HeroSection';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  /* Activos + Próximamente */
  const sorteos = await prisma.sorteo.findMany({
    where: { estado: { in: ['ACTIVO', 'PROXIMAMENTE'] } },
    orderBy: [
      { estado: 'asc' },
      { destacado: 'desc' },
      { fechaSorteo: 'asc' },
    ],
    select: {
      id: true,
      titulo: true,
      precio: true,
      fechaSorteo: true,
      imagenUrl: true,
      estado: true,
    },
  });

  return (
    <>
      {/* ─────────── Galería de miniaturas desplazada 80 px ─────────── */}
      <div className="pt-20">
        <ThumbnailGallery />
      </div>

      {/* ─────────── Hero con slider grande ─────────── */}
      <HeroSection />

      {/* ─────────── Sección de sorteos ─────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            Nuestros Sorteos
          </h2>
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
                  imagenUrl={s.imagenUrl ?? undefined}
                  proximamente={s.estado === 'PROXIMAMENTE'}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-16">
                No hay sorteos disponibles por el momento.
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/sorteos"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold"
            >
              Ver Todos los Sorteos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
