"use client"
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-4 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-1">Sorteos</span>
          <span className="text-2xl font-bold text-yellow-500">Premium</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-yellow-400 font-medium">Inicio</a>
          <a href="/sorteos" className="hover:text-yellow-400 font-medium">Sorteos Activos</a>
          <a href="/como-funciona" className="hover:text-yellow-400 font-medium">Cómo Funciona</a>
          <a href="/ganadores" className="hover:text-yellow-400 font-medium">Ganadores</a>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/mi-cuenta" className="flex items-center hover:text-yellow-400">
            <User size={20} className="mr-1" />
            <span>Mi Cuenta</span>
          </a>
          <a href="/carrito" className="relative flex items-center">
            <ShoppingCart size={20} className="text-white" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </a>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium">
            Comprar Tickets
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-950 px-4 py-2">
          <div className="flex flex-col space-y-3 pb-3">
            <a href="/" className="hover:text-yellow-400 py-2">Inicio</a>
            <a href="/sorteos" className="hover:text-yellow-400 py-2">Sorteos Activos</a>
            <a href="/como-funciona" className="hover:text-yellow-400 py-2">Cómo Funciona</a>
            <a href="/ganadores" className="hover:text-yellow-400 py-2">Ganadores</a>
            <a href="/mi-cuenta" className="hover:text-yellow-400 py-2 flex items-center">
              <User size={18} className="mr-2" />
              <span>Mi Cuenta</span>
            </a>
            <a href="/carrito" className="py-2 flex items-center">
              <ShoppingCart size={18} className="mr-2" />
              <span>Carrito (2)</span>
            </a>
            <button className="bg-red-600 hover:bg-red-700 py-2 rounded font-medium mt-2">
              Comprar Tickets
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;