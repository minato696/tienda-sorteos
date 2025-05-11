// app/participar/page.tsx
import { prisma } from '@/app/lib/prisma';
import ParticiparForm from '@/app/components/client/participar/ParticiparForm';

export default async function ParticiparPage() {
  // Intenta con Sorteo (con S mayúscula) si sorteo no funciona
  try {
    // Intenta primero con "Sorteo" (primera letra mayúscula)
    const sorteos = await prisma.Sorteo.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { fechaSorteo: 'asc' },
    });
    
    return <ParticiparForm sorteos={sorteos} />;
  } catch (error) {
    // Si falla, usa datos estáticos para pruebas
    console.error("Error al cargar sorteos:", error);
    
    const sorteosDummy = [
      {
        id: 1,
        titulo: "Gran Sorteo de Auto",
        descripcion: "Participa y gana un auto 0km. Un premio que cambiará tu vida con solo S/50 por ticket.",
        imagenUrl: "/images/auto.jpg",
        precio: 50.00,
        fechaSorteo: new Date("2025-06-15"),
        stockTotal: 1000,
        stockVendido: 250
      },
      {
        id: 2,
        titulo: "Sorteo de Smartphone",
        descripcion: "Gana el último iPhone. Tecnología de punta por solo S/50 por ticket.",
        imagenUrl: "/images/smartphone.jpg",
        precio: 50.00,
        fechaSorteo: new Date("2025-05-30"),
        stockTotal: 500,
        stockVendido: 120
      }
    ];
    
    return <ParticiparForm sorteos={sorteosDummy} />;
  }
}