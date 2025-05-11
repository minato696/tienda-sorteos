// app/components/server/layout/HeroSection.tsx
import { ArrowRight, Award, Shield, Clock } from 'lucide-react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ 
  title = "Gana uno de nuestros 3 Autos de Lujo con solo un ticket",
  subtitle = "Por solo $25.00 puedes participar en nuestro sorteo mensual y llevarte un increíble auto 0KM. ¡Tus sueños están a un ticket de distancia!"
}: HeroSectionProps) {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white">
      {/* Main hero content */}
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        {/* Left text content */}
        <div className="w-full md:w-1/2 space-y-6 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span>Gana uno de nuestros</span>
            <span className="block text-yellow-400">3 Autos de Lujo</span>
            <span>con solo un ticket</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold text-lg flex items-center justify-center">
              Comprar Tickets
              <ArrowRight size={20} className="ml-2" />
            </button>
            <button className="bg-transparent hover:bg-white/10 border-2 border-white px-6 py-3 rounded-md font-semibold text-lg">
              Ver próximo sorteo
            </button>
          </div>
          
          <div className="text-sm text-gray-300 pt-2">
            Próximo sorteo: 15 de junio de 2025 · Quedan 12,543 tickets disponibles
          </div>
        </div>
        
        {/* Right image content */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full absolute top-0 right-0 blur-3xl opacity-20"></div>
            <img 
              src="/api/placeholder/600/400" 
              alt="Auto de lujo sorteo" 
              className="relative z-10 rounded-lg shadow-xl max-w-full"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 px-6 py-2 rounded-full font-bold text-sm md:text-base z-20">
              GRAN PREMIO · VALOR $75,000
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust indicators */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Shield size={24} className="text-blue-900" />
            </div>
            <div>
              <h3 className="font-semibold text-white">100% Seguro</h3>
              <p className="text-sm text-gray-300">Sorteo certificado y regulado</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Award size={24} className="text-blue-900" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Premios Garantizados</h3>
              <p className="text-sm text-gray-300">Entrega inmediata al ganador</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Clock size={24} className="text-blue-900" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Sorteos Mensuales</h3>
              <p className="text-sm text-gray-300">Nuevas oportunidades cada mes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}