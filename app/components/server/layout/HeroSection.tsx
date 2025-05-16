import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-festive text-theme-text-inverted py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gana premios increíbles con solo un ticket
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Sorteos 100% legales y transparentes. Transmitidos en vivo para garantizar la legitimidad de cada ganador.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/sorteos" 
                className="btn-primary bg-white text-theme-primary hover:bg-opacity-90"
              >
                Ver sorteos activos
              </Link>
              <Link 
                href="/como-funciona" 
                className="btn-secondary"
              >
                ¿Cómo funciona?
              </Link>
            </div>
            
            {/* Estadísticas */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">+50</div>
                <div className="text-sm opacity-80">Premios entregados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">12K+</div>
                <div className="text-sm opacity-80">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">100%</div>
                <div className="text-sm opacity-80">Transparencia</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-80 w-80 md:h-96 md:w-96 animate-float">
              <div className="absolute -top-6 -right-6 bg-theme-accent rounded-full h-20 w-20 flex items-center justify-center text-theme-text-primary font-bold transform rotate-12 shadow-lg">
                <div className="text-center">
                  <div className="text-xs">DESDE</div>
                  <div className="text-xl">S/30</div>
                </div>
              </div>
              <div className="h-full w-full bg-theme-bg-main rounded-3xl shadow-2xl overflow-hidden p-4">
                <div className="h-3/4 bg-gray-200 rounded-xl mb-4 relative overflow-hidden">
                  <Image 
                    src="/images/premios/auto.jpg" 
                    alt="Premio principal" 
                    fill 
                    sizes="(max-width: 768px) 320px, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="text-theme-text-primary font-bold text-lg">Toyota Hilux 2023</div>
                <div className="flex justify-between items-center">
                  <span className="text-theme-primary font-bold">S/ 100.00</span>
                  <span className="bg-theme-highlight text-theme-text-primary text-xs px-2 py-1 rounded-full">
                    ¡Sorteo pronto!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}