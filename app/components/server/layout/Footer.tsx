// app/components/server/layout/Footer.tsx
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sp-purple to-sp-indigo text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company info */}
        <div>
          <div className="mb-4 flex items-center space-x-1">
            <span className="text-2xl font-bold">Sorteos</span>
            <span className="text-2xl font-bold text-sp-purple">Premium</span>
          </div>
          <p className="text-gray-200 mb-6">
            La mejor plataforma de sorteos en línea, con premios exclusivos y excelentes oportunidades de ganar.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-sp-purple transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sp-purple transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-sp-purple transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-sp-purple transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sp-purple">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Inicio</a></li>
            <li><a href="/sorteos" className="hover:text-white transition">Sorteos Activos</a></li>
            <li><a href="/ganadores" className="hover:text-white transition">Ganadores</a></li>
            <li><a href="/como-funciona" className="hover:text-white transition">Cómo Funciona</a></li>
            <li><a href="/preguntas-frecuentes" className="hover:text-white transition">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Legal info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sp-purple">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/terminos" className="hover:text-white transition">Términos y Condiciones</a></li>
            <li><a href="/privacidad" className="hover:text-white transition">Política de Privacidad</a></li>
            <li><a href="/reembolsos" className="hover:text-white transition">Política de Reembolsos</a></li>
            <li><a href="/legal" className="hover:text-white transition">Información Legal</a></li>
            <li><a href="/cookies" className="hover:text-white transition">Política de Cookies</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-sp-purple">Contacto</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin size={20} className="mr-2 text-sp-indigo mt-1" />
              <span>Av. Principal 123, Lima, Perú</span>
            </li>
            <li className="flex items-center">
              <Phone size={20} className="mr-2 text-sp-indigo" />
              <span>+51 987 654 321</span>
            </li>
            <li className="flex items-center">
              <Mail size={20} className="mr-2 text-sp-indigo" />
              <span>contacto@sorteospremium.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-sp-indigo">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SorteosPremium. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <img src="/api/placeholder/50/30" alt="Visa" className="h-8" />
            <img src="/api/placeholder/50/30" alt="Mastercard" className="h-8" />
            <img src="/api/placeholder/50/30" alt="PayPal" className="h-8" />
            <img src="/api/placeholder/50/30" alt="Yape" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
