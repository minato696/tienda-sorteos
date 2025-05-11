"use client"
import SorteoCard from '../components/sorteos/SorteoCard';

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
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">Gana autos de lujo</h1>
        <p className="mb-6">Participa en nuestros sorteos y gana increíbles premios</p>
        <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md font-bold">
          Comprar Tickets
        </button>
      </div>
      
      {/* Sorteos Destacados */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Sorteos Destacados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSorteos.map((sorteo) => (
            <SorteoCard key={sorteo.id} {...sorteo} />
          ))}
        </div>
      </section>
    </div>
  );
}