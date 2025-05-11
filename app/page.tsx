import HeroSection from '@/app/components/client/layout/HeroSection';
import SorteoCard from '@/app/components/client/sorteos/SorteoCard';

// Definir la interfaz para los datos de sorteo
interface Sorteo {
  id: string;
  title: string;
  price: number;
  endDate: string;
  totalTickets: number;
  soldTickets: number;
}

export default function Home() {
  // Datos de ejemplo para los sorteos destacados
  const featuredSorteos: Sorteo[] = [
    {
      id: "1",
      title: "Mercedes-Benz GLC 300",
      price: 25,
      endDate: "15 Jun 2025",
      totalTickets: 15000,
      soldTickets: 7850,
    },
    {
      id: "2",
      title: "BMW X5 2025 Executive",
      price: 25,
      endDate: "30 Jul 2025",
      totalTickets: 15000,
      soldTickets: 3420,
    },
    {
      id: "3",
      title: "Audi Q7 Premium Plus",
      price: 25,
      endDate: "15 Ago 2025",
      totalTickets: 15000,
      soldTickets: 1250,
    }
  ];

  return (
    <>
      <HeroSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Sorteos Destacados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSorteos.map((sorteo) => (
              <SorteoCard key={sorteo.id} {...sorteo} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">¿Cómo Funciona?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Compra tus tickets</h3>
              <p className="text-gray-600">Selecciona el sorteo que te interese y compra tantos tickets como desees.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Espera el sorteo</h3>
              <p className="text-gray-600">Cada sorteo tiene una fecha definida. Sigue el sorteo en vivo a través de nuestras redes.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">¡Recibe tu premio!</h3>
              <p className="text-gray-600">Si eres el ganador, te contactaremos de inmediato para coordinar la entrega.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}