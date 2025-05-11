// app/components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  LayoutList, 
  FileText, 
  Mail, 
  CreditCard,
  UserCog
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Sorteos', href: '/admin/sorteos', icon: Ticket },
  { title: 'Participantes', href: '/admin/participantes', icon: Users },
  { title: 'Contenido', href: '/admin/contenido', icon: LayoutList },
  { title: 'Secciones', href: '/admin/secciones', icon: FileText },
  { title: 'Correo', href: '/admin/correo', icon: Mail },
  { title: 'Transacciones', href: '/admin/transacciones', icon: CreditCard },
  { title: 'Usuarios', href: '/admin/usuarios', icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Panel Admin</h2>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href} className="px-2 py-1">
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}