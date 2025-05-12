import { prisma } from '@/app/lib/prisma';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';
import HeroSection from '@/app/components/server/layout/HeroSection';
import Link from 'next/link';

export default async function HomePage() {
  // Obtener sorteos destacados o activos
  const sorteos = await prisma.sorteo.findMany({
    where: {
      estado: 'ACTIVO',
      OR: [
        { destacado: true },
        { fechaSorteo: { gte: new Date() } }
      ]
    },
    orderBy: [
      { destacado: 'desc' },
      { fechaSorteo: 'asc' }
    ],
    take: 3 // Mostrar solo 3 sorteos en la página principal
  });

  return (
    <>
      <HeroSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Sorteos Activos</h2>
          <p className="text-gray-600 text-center mb-8">Encuentra tu próximo premio y participa ahora</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorteos.length > 0 ? (
              sorteos.map((sorteo) => (
                <SorteoCard 
                  key={sorteo.id}
                  id={sorteo.id.toString()}
                  titulo={sorteo.titulo}
                  precio={sorteo.precio}
                  fechaSorteo={sorteo.fechaSorteo.toISOString()}
                  ticketsDisponibles={sorteo.ticketsDisponibles}
                  ticketsVendidos={sorteo.ticketsVendidos}
                  imagenUrl={sorteo.imagenUrl}
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