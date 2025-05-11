// app/components/admin/DashboardRecentUsers.tsx
import Image from 'next/image';
import { prisma } from '@/app/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { User } from 'lucide-react';

export default async function DashboardRecentUsers() {
  const recentUsers = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      tickets: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="space-y-4">
      {recentUsers.length > 0 ? (
        recentUsers.map((user) => (
          <div key={user.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mr-3">
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || ""} 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || 'Usuario sin nombre'}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
            
            <div className="ml-4 flex-shrink-0 text-right">
              <p className="text-sm text-gray-700">
                {user.tickets.length} tickets
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(user.createdAt), { 
                  addSuffix: true,
                  locale: es
                })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">
          No hay usuarios registrados recientemente
        </p>
      )}
    </div>
  );
}