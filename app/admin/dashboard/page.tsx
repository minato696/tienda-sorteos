// app/admin/dashboard/page.tsx
import { Suspense } from 'react';
import { 
  ShoppingCart, 
  Users, 
  Calendar, 
  TrendingUp, 
  CreditCard 
} from 'lucide-react';
import DashboardStatCard from '@/app/components/admin/DashboardStatCard';
import DashboardRecentUsers from '@/app/components/admin/DashboardRecentUsers';
import DashboardTopRaffles from '@/app/components/admin/DashboardTopRaffles';
import DashboardSalesChart from '@/app/components/admin/DashboardSalesChart';
import DashboardChartSkeleton from '@/app/components/admin/DashboardChartSkeleton';
import { prisma } from '@/app/lib/prisma';

export const metadata = {
  title: 'Dashboard - Panel de Administración',
};

export default async function DashboardPage() {
  // Obtenemos las estadísticas principales 
  const activeRafflesCount = await prisma.raffle.count({
    where: { status: 'ACTIVE' },
  });
  
  // Obtenemos tickets vendidos hoy
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const ticketsSoldToday = await prisma.ticket.count({
    where: {
      status: 'SOLD',
      purchasedAt: {
        gte: today,
      },
    },
  });
  
  // Obtenemos tickets vendidos este mes
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const ticketsSoldThisMonth = await prisma.ticket.count({
    where: {
      status: 'SOLD',
      purchasedAt: {
        gte: firstDayOfMonth,
      },
    },
  });
  
  // Obtenemos ingresos totales
  const totalRevenue = await prisma.purchaseHistory.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: 'COMPLETED',
    },
  });
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard 
          title="Sorteos Activos"
          value={activeRafflesCount}
          icon={Calendar}
          trend={{ value: 0, label: 'desde el último mes' }}
          className="bg-blue-50"
          iconClassName="text-blue-600"
        />
        
        <DashboardStatCard 
          title="Tickets Vendidos Hoy"
          value={ticketsSoldToday}
          icon={ShoppingCart}
          trend={{ value: 12, label: 'comparado a ayer', positive: true }}
          className="bg-green-50"
          iconClassName="text-green-600"
        />
        
        <DashboardStatCard 
          title="Tickets Vendidos (Mes)"
          value={ticketsSoldThisMonth}
          icon={TrendingUp}
          trend={{ value: 8, label: 'comparado al mes pasado', positive: true }}
          className="bg-purple-50"
          iconClassName="text-purple-600"
        />
        
        <DashboardStatCard 
          title="Ingresos Totales"
          value={`S/ ${totalRevenue._sum.amount || 0}`}
          icon={CreditCard}
          trend={{ value: 5, label: 'desde el mes pasado', positive: true }}
          className="bg-yellow-50"
          iconClassName="text-yellow-600"
        />
      </div>
      
      {/* Gráfico de ventas */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">Ventas de tickets</h2>
        </div>
        <div className="p-4 h-80">
          <Suspense fallback={<DashboardChartSkeleton />}>
            <DashboardSalesChart />
          </Suspense>
        </div>
      </div>
      
      {/* Sección de dos columnas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Últimos participantes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-gray-800">Últimos participantes</h2>
          </div>
          <div className="p-4">
            <Suspense fallback={<p>Cargando participantes...</p>}>
              <DashboardRecentUsers />
            </Suspense>
          </div>
        </div>
        
        {/* Sorteos más vendidos */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-gray-800">Sorteos más vendidos</h2>
          </div>
          <div className="p-4">
            <Suspense fallback={<p>Cargando sorteos...</p>}>
              <DashboardTopRaffles />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}