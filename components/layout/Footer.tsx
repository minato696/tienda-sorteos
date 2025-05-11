import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">Sorteos</span>
              <span className="text-2xl font-bold text-yellow-500">Premium</span>
            </div>
            <p className="text-gray-400 mb-4">
              La mejor plataforma de sorteos en línea con premios exclusivos y las 
              mejores probabilidades de ganar.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Inicio</a></li>
              <li><a href="/sorteos" className="text-gray-400 hover:text-white">Sorteos Activos</a></li>
              <li><a href="/ganadores" className="text-gray-400 hover:text-white">Ganadores</a></li>
              <li><a href="/como-funciona" className="text-gray-400 hover:text-white">Cómo Funciona</a></li>
              <li><a href="/preguntas-frecuentes" className="text-gray-400 hover:text-white">Preguntas Frecuentes</a></li>
            </ul>
          </div>
          
          {/* Legal info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terminos" className="text-gray-400 hover:text-white">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
              <li><a href="/reembolsos" className="text-gray-400 hover:text-white">Política de Reembolsos</a></li>
              <li><a href="/legal" className="text-gray-400 hover:text-white">Información Legal</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-white">Política de Cookies</a></li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 mt-1" />
                <span className="text-gray-400">Av. Principal 123, Lima, Perú</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-400" />
                <span className="text-gray-400">+51 987 654 321</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-400" />
                <span className="text-gray-400">contacto@sorteospremium.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="border-t border-blue-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SorteosPremium. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <img src="/api/placeholder/50/30" alt="Visa" className="h-8" />
              <img src="/api/placeholder/50/30" alt="Mastercard" className="h-8" />
              <img src="/api/placeholder/50/30" alt="PayPal" className="h-8" />
              <img src="/api/placeholder/50/30" alt="Yape" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;