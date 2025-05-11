// app/page.tsx
import HeroSection from '@/app/components/server/layout/HeroSection';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';
import Link from 'next/link';

export default function HomePage() {
  // Datos de ejemplo (normalmente vendrían de la base de datos)
  const sorteos = [
    {
      id: '1',
      title: 'Auto BMW Serie 3 2025',
      price: 25,
      endDate: '15 junio, 2025',
      totalTickets: 5000,
      soldTickets: 2500
    },
    {
      id: '2',
      title: 'Apartamento en Miraflores',
      price: 50,
      endDate: '30 julio, 2025',
      totalTickets: 10000,
      soldTickets: 4000
    },
    {
      id: '3',
      title: 'iPhone 16 Pro Max',
      price: 10,
      endDate: '10 junio, 2025',
      totalTickets: 3000,
      soldTickets: 2200
    }
  ];

  return (
    <>
      <HeroSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Sorteos Activos</h2>
          <p className="text-gray-600 text-center mb-8">Encuentra tu próximo premio y compra tus tickets ahora</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorteos.map((sorteo) => (
              <SorteoCard 
                key={sorteo.id}
                id={sorteo.id}
                title={sorteo.title}
                price={sorteo.price}
                endDate={sorteo.endDate}
                totalTickets={sorteo.totalTickets}
                soldTickets={sorteo.soldTickets}
              />
            ))}
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