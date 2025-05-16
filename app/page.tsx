// app/page.tsx – Home
import { prisma } from '@/app/lib/prisma';

import HeroSection from '@/app/components/server/layout/HeroSection';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';
import SocialBanner from '@/app/components/client/sections/SocialBanner';

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  /* Sorteos activos + próximos */
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
    <div className="theme-transition">
      {/* Hero principal - Mantenemos tu componente original */}
      <HeroSection />

      {/* Lista de sorteos - Aplicamos los estilos mejorados */}
      <section className="py-16 bg-theme-bg-alt">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-text-primary mb-2">
              Nuestros Sorteos
            </h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">
              Encuentra tu próximo premio y participa ahora
            </p>
          </div>

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
              <div className="col-span-3 text-center text-theme-text-secondary py-16 bg-theme-card rounded-xl shadow-theme-sm">
                No hay sorteos disponibles por el momento.
              </div>
            )}
          </div>

          {/* Botón Ver más sorteos - Añadido como mejora visual */}
          {sorteos.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/sorteos"
                className="btn-primary inline-block"
              >
                Ver todos los sorteos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Sección cómo funciona - Añadida como mejora visual */}
      <section className="py-16 bg-theme-bg-main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-text-primary mb-2">¿Cómo Funciona?</h2>
            <p className="text-theme-text-secondary max-w-2xl mx-auto">
              Participar en nuestros sorteos es muy sencillo. Sigue estos pasos y prepárate para ganar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="p-6 rounded-xl bg-theme-card shadow-theme-sm hover:shadow-theme-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-theme-primary text-theme-text-inverted flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="ml-4 text-xl font-semibold text-theme-text-primary">
                  Elige tu sorteo
                </h3>
              </div>
              <p className="text-theme-text-secondary">
                Navega entre nuestros sorteos activos y elige el premio que más te guste. Tenemos autos, departamentos, electrónicos y mucho más.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="p-6 rounded-xl bg-theme-card shadow-theme-sm hover:shadow-theme-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-theme-secondary text-theme-text-inverted flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="ml-4 text-xl font-semibold text-theme-text-primary">
                  Compra tu ticket
                </h3>
              </div>
              <p className="text-theme-text-secondary">
                Selecciona la cantidad de tickets que deseas y realiza el pago de forma segura. Aceptamos múltiples métodos de pago.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="p-6 rounded-xl bg-theme-card shadow-theme-sm hover:shadow-theme-md transition-all">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-theme-accent text-theme-text-primary flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="ml-4 text-xl font-semibold text-theme-text-primary">
                  ¡Sorteo en vivo!
                </h3>
              </div>
              <p className="text-theme-text-secondary">
                En la fecha indicada, realizamos el sorteo en vivo a través de nuestras redes sociales. Si ganas, te contactamos inmediatamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de redes sociales - Mantenemos tu componente original con estilo mejorado */}
      <div className="container mx-auto px-4 my-16">
        <SocialBanner />
      </div>

      {/* CTA - Añadido como mejora visual */}
      <section className="bg-gradient-theme py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text-inverted mb-4">
            ¿Listo para ganar?
          </h2>
          <p className="text-theme-text-inverted opacity-90 text-lg mb-8 max-w-2xl mx-auto">
            No esperes más para participar en nuestros sorteos. Con solo un ticket, podrías llevarte el premio de tus sueños.
          </p>
          <Link 
            href="/sorteos" 
            className="btn-accent text-lg font-bold px-8 py-3"
          >
            ¡Participar ahora!
          </Link>
        </div>
      </section>
    </div>
  );
}