// app/components/admin/DashboardTopRaffles.tsx
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/app/lib/prisma';
import { Calendar, Ticket } from 'lucide-react';

export default async function DashboardTopRaffles() {
  const topRaffles = await prisma.raffle.findMany({
    orderBy: [
      {
        soldTickets: 'desc',
      },
    ],
    take: 5,
  });

  return (
    <div className="space-y-4">
      {topRaffles.length > 0 ? (
        topRaffles.map((raffle) => {
          const percentageSold = (raffle.soldTickets / raffle.totalTickets) * 100;
          
          return (
            <div key={raffle.id} className="border rounded-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Imagen */}
                <div className="sm:w-24 h-24 relative bg-gray-200">
                  {raffle.imageUrl ? (
                    <Image
                      src={raffle.imageUrl}
                      alt={raffle.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Contenido */}
                <div className="p-3 flex-1">
                  <div className="flex justify-between items-start">
                    <Link href={`/admin/sorteos/${raffle.id}`} className="hover:underline">
                      <h3 className="font-medium text-gray-900 truncate">{raffle.title}</h3>
                    </Link>
                    <div className="text-sm text-gray-600 ml-2 flex items-center">
                      <Ticket className="w-4 h-4 mr-1" />
                      <span>
                        {raffle.soldTickets}/{raffle.totalTickets}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    Premio: {raffle.prize}
                  </p>
                  
                  {/* Barra de progreso */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentageSold}%` }}
                    ></div>
                  </div>
                  
                  {/* Fecha del sorteo */}
                  <div className="mt-2 text-xs text-gray-500">
                    Fecha del sorteo: {new Date(raffle.drawDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 py-4">
          No hay sorteos disponibles
        </p>
      )}
    </div>
  );
}