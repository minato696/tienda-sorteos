// app/components/admin/AdminHeader.tsx
'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Bell, User, Search, LogOut } from 'lucide-react';

type AdminHeaderProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
};

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Búsqueda */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute w-4 h-4 text-gray-400 left-3 top-2.5" />
        </div>
        
        {/* Lado derecho - notificaciones y perfil */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="relative p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </button>
          
          {/* Perfil de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.image ? (
                  <img src={user.image} alt={user.name || ""} className="w-8 h-8 rounded-full" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user.name || user.email}
              </span>
            </button>
            
            {/* Menú desplegable */}
            {showUserMenu && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded-lg shadow-lg">
                <div className="py-2 px-4 border-b">
                  <p className="text-sm font-medium text-gray-900">{user.name || "Administrador"}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}