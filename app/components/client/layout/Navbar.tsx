'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavItem = (href: string, label: string) => (
    <Link 
      href={href} 
      className="hover:text-sp-cyan font-medium transition-all hover:translate-y-[1px]"
    >
      {label}
    </Link>
  );

  return (
    // Quitamos la clase shadow-md para evitar cualquier separación visual
    <nav className="w-full bg-gradient-nav text-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-14">
        {/* ─── Logo ─── */}
        <Link href="/" className="flex items-center text-xl font-bold">
          <span className="mr-1">Sorteos</span>
          <span className="text-sp-cyan">Premium</span>
        </Link>

        {/* ─── Navegación escritorio ─── */}
        <div className="hidden md:flex space-x-8">
          {NavItem('/', 'Inicio')}
          {NavItem('/sorteos', 'Sorteos Activos')}
          {NavItem('/como-funciona', 'Cómo Funciona')}
          {NavItem('/ganadores', 'Ganadores')}
        </div>

        {/* ─── Acciones escritorio ─── */}
        <div className="hidden md:flex items-center space-x-5">
          <Link href="/mi-cuenta" className="flex items-center hover:text-sp-cyan transition-all">
            <User size={17} className="mr-1" />
            <span>Mi Cuenta</span>
          </Link>

          <Link href="/carrito" className="relative flex items-center">
            <ShoppingCart size={17} />
            <span className="absolute -top-2 -right-2 bg-sp-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md shadow-sp-pink/30">
              2
            </span>
          </Link>

          <Link
            href="/tickets"
            className="bg-sp-pink hover:bg-opacity-90 px-4 py-1.5 rounded-md font-medium whitespace-nowrap shadow-md shadow-sp-pink/20 hover:shadow-sp-pink/40 transition-all hover:translate-y-[1px]"
          >
            Comprar Tickets
          </Link>
        </div>

        {/* ─── Botón menú móvil ─── */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="md:hidden text-white hover:text-sp-cyan transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ─── Menú móvil ─── */}
      {open && (
        <div className="md:hidden bg-sp-indigo px-4 py-3 space-y-3 shadow-lg">
          {NavItem('/', 'Inicio')}
          {NavItem('/sorteos', 'Sorteos Activos')}
          {NavItem('/como-funciona', 'Cómo Funciona')}
          {NavItem('/ganadores', 'Ganadores')}

          <Link href="/mi-cuenta" className="flex items-center hover:text-sp-cyan">
            <User size={18} className="mr-2" />
            <span>Mi Cuenta</span>
          </Link>

          <Link href="/carrito" className="flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            <span>Carrito (2)</span>
          </Link>

          <Link
            href="/tickets"
            className="block bg-sp-pink hover:bg-opacity-90 py-2 rounded-md font-medium text-center mt-2 shadow-md"
          >
            Comprar Tickets
          </Link>
        </div>
      )}
    </nav>
  );
}