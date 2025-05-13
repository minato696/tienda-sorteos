'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavItem = (href: string, label: string) => (
    <Link href={href} className="hover:text-yellow-400 font-medium">
      {label}
    </Link>
  );

  return (
    /* sticky: se queda pegado debajo del banner (56 px) */
    <nav className="sticky top-14 z-[999] w-full bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-md py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center text-2xl font-bold">
          <span className="mr-1">Sorteos</span>
          <span className="text-yellow-500">Premium</span>
        </Link>

        {/* ─── Navegación escritorio ─── */}
        <div className="hidden md:flex space-x-8">
          {NavItem('/', 'Inicio')}
          {NavItem('/sorteos', 'Sorteos Activos')}
          {NavItem('/como-funciona', 'Cómo Funciona')}
          {NavItem('/ganadores', 'Ganadores')}
        </div>

        {/* ─── Acciones escritorio ─── */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/mi-cuenta" className="flex items-center hover:text-yellow-400">
            <User size={20} className="mr-1" />
            <span>Mi Cuenta</span>
          </Link>

          <Link href="/carrito" className="relative flex items-center">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Link>

          <Link
            href="/tickets"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium whitespace-nowrap"
          >
            Comprar Tickets
          </Link>
        </div>

        {/* ─── Botón menú móvil ─── */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ─── Menú móvil ─── */}
      {open && (
        <div className="md:hidden bg-blue-950 px-4 py-3 space-y-3">
          {NavItem('/', 'Inicio')}
          {NavItem('/sorteos', 'Sorteos Activos')}
          {NavItem('/como-funciona', 'Cómo Funciona')}
          {NavItem('/ganadores', 'Ganadores')}

          <Link href="/mi-cuenta" className="flex items-center hover:text-yellow-400">
            <User size={18} className="mr-2" />
            <span>Mi Cuenta</span>
          </Link>

          <Link href="/carrito" className="flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            <span>Carrito (2)</span>
          </Link>

          <Link
            href="/tickets"
            className="block bg-red-600 hover:bg-red-700 py-2 rounded font-medium text-center mt-2"
          >
            Comprar Tickets
          </Link>
        </div>
      )}
    </nav>
  );
}
