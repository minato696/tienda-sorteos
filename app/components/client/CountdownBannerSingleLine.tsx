'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** ISO string de la fecha del sorteo */
  targetDate: string;
  /** Texto principal del sorteo */
  title?: string;
  /** Texto secundario (nombre del sorteo) */
  subtitle?: string;
}

export default function CountdownBannerSingleLine({ 
  targetDate,
  title = "¡Próximo sorteo en vivo!",
  subtitle = "SORTEO DE CARRO 1"
}: Props) {
  const target = new Date(targetDate).getTime();
  const [diff, setDiff] = useState<number>(target - Date.now());

  /* actualiza cada segundo */
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  /* si ya pasó la fecha */
  if (diff <= 0) return null;

  const sec = Math.floor(diff / 1000) % 60;
  const min = Math.floor(diff / 1000 / 60) % 60;
  const hrs = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return (
    <div className="relative w-full h-full flex items-center bg-gradient-theme py-4 theme-transition">
      {/* Confetti floating effect - absolute positioned */}
      <div className="confetti-container absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: [
                'var(--color-primary)',
                'var(--color-secondary)',
                'var(--color-accent)',
                'var(--color-highlight)',
                '#FFFFFF'
              ][Math.floor(Math.random() * 5)],
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              opacity: 0.6 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
      
      {/* Todo en una sola línea - con más altura y elegancia */}
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex flex-col md:flex-row items-center">
          {/* Título y subtítulo con mejor espaciado */}
          <div className="flex flex-col md:flex-row md:items-center mb-3 md:mb-0 md:mr-8">
            <span className="text-theme-text-inverted font-bold text-xl md:text-2xl tracking-tight">{title}</span>
            <span className="text-theme-text-inverted text-sm opacity-90 font-medium md:ml-3">{subtitle}</span>
          </div>
          
          {/* Contador con más espacio vertical y cuidado estético */}
          <div className="flex items-end space-x-4 md:space-x-5">
            {/* Días */}
            <div className="text-center">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-theme-primary font-bold text-2xl">{String(days).padStart(2, '0')}</span>
              </div>
              <span className="text-theme-text-inverted text-xs font-medium block mt-1">Días</span>
            </div>
            
            {/* Horas */}
            <div className="text-center">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-theme-primary font-bold text-2xl">{String(hrs).padStart(2, '0')}</span>
              </div>
              <span className="text-theme-text-inverted text-xs font-medium block mt-1">Horas</span>
            </div>
            
            {/* Minutos */}
            <div className="text-center">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-theme-primary font-bold text-2xl">{String(min).padStart(2, '0')}</span>
              </div>
              <span className="text-theme-text-inverted text-xs font-medium block mt-1">Min</span>
            </div>
            
            {/* Segundos */}
            <div className="text-center">
              <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
                <span className="text-theme-primary font-bold text-2xl">{String(sec).padStart(2, '0')}</span>
              </div>
              <span className="text-theme-text-inverted text-xs font-medium block mt-1">Seg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}