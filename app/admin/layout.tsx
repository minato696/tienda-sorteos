'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from '../lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    getSession().then((sess) => {
      if (!sess?.user?.isAdmin) {
        router.push('/login');
      } else {
        setSession(sess);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-user');
    router.push('/login');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Sorteos Premium</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block hover:underline">Dashboard</a>
          <a href="/admin/sorteos" className="block hover:underline">Sorteos</a>
          <a href="/admin/participantes" className="block hover:underline">Participantes</a>
          <a href="/admin/configuracion" className="block hover:underline">Configuración</a>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 px-4 py-2 w-full text-white rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
