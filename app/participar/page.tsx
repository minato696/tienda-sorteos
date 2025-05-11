// app/participar/page.tsx
import { db } from '@/app/lib/prisma';
import HeroSection from '@/app/components/server/layout/HeroSection';
import ParticiparForm from '@/app/components/client/participar/ParticiparForm';

export default async function ParticiparPage() {
  // Obtener sorteos activos
  const sorteos = await db.sorteo.findMany({
    where: { cerrado: false },
    orderBy: { fechaSorteo: 'asc' },
  });
  
  return (
    <>
      <HeroSection 
        title="Participa en Nuestros Sorteos" 
        subtitle="Completa el formulario y empieza a soñar con tu premio"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-md">
          <ParticiparForm sorteos={sorteos} />
        </div>
      </section>
    </>
  );
}