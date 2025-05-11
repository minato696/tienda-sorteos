// app/admin/layout.tsx
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import AdminHeader from '@/app/components/admin/AdminHeader';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Verificar autenticación en el servidor
  const session = await getServerSession(authOptions);
  
  // Verificar si el usuario es administrador
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader user={session.user} />
        
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}