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
    <div className="relative w-full h-full flex items-center bg-gradient-to-r from-sp-indigo via-sp-blue to-sp-cyan py-3">
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
                '#F72585', '#7209B7', '#3A0CA3', '#4361EE', '#4CC9F0'
              ][Math.floor(Math.random() * 5)],
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              opacity: 0.6 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
      
      {/* Todo en una sola línea - con más altura */}
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex items-center">
          {/* Título y subtítulo */}
          <div className="flex items-center mr-6">
            <span className="text-white font-bold text-lg">{title}</span>
            <span className="text-white text-sm opacity-90 font-medium ml-2 hidden md:inline">{subtitle}</span>
          </div>
          
          {/* Contador con más espacio vertical */}
          <div className="flex items-end space-x-4">
            {/* Días */}
            <div className="text-center">
              <div className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-sm">
                <span className="text-sp-indigo font-bold text-lg">{String(days).padStart(2, '0')}</span>
              </div>
              <span className="text-white text-[9px] font-medium block mt-1">Días</span>
            </div>
            
            {/* Horas */}
            <div className="text-center">
              <div className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-sm">
                <span className="text-sp-indigo font-bold text-lg">{String(hrs).padStart(2, '0')}</span>
              </div>
              <span className="text-white text-[9px] font-medium block mt-1">Horas</span>
            </div>
            
            {/* Minutos */}
            <div className="text-center">
              <div className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-sm">
                <span className="text-sp-indigo font-bold text-lg">{String(min).padStart(2, '0')}</span>
              </div>
              <span className="text-white text-[9px] font-medium block mt-1">Min</span>
            </div>
            
            {/* Segundos */}
            <div className="text-center">
              <div className="bg-white w-10 h-10 rounded flex items-center justify-center shadow-sm">
                <span className="text-sp-indigo font-bold text-lg">{String(sec).padStart(2, '0')}</span>
              </div>
              <span className="text-white text-[9px] font-medium block mt-1">Seg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CSS para los efectos de confeti flotando */
const style = `
@keyframes confettiFall {
  0% { transform: translateY(-100%) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}

.confetti-container {
  pointer-events: none;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  border-radius: 2px;
  animation: confettiFall 10s linear infinite;
}

/* Reducimos la animación en dispositivos que prefieren menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .confetti-piece {
    animation: none;
  }
}
`;

if (typeof document !== 'undefined') {
  // Solo agregamos el estilo si no existe previamente
  if (!document.getElementById('confetti-style')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'confetti-style';
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
  }
}