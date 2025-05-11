// app/admin/layout.tsx (versión para desarrollo)
import { ReactNode } from 'react';
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import AdminHeader from '@/app/components/admin/AdminHeader';
// Comentamos estas líneas temporalmente
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Comentamos el código de autenticación
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/login');
  // }
  
  // Usuario simulado para pruebas
  const mockUser = {
    name: 'Admin Temporal',
    email: 'admin@example.com',
    role: 'ADMIN',
    image: null
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader user={mockUser} />
        
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}