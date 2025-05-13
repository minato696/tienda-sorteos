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

export default function CountdownBannerHorizontal({ 
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

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-3">
      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-md flex items-center justify-center shadow-md">
        <span className="text-xl md:text-3xl font-bold text-sp-indigo">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-white font-medium mt-1 uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative w-full bg-gradient-to-r from-sp-indigo via-sp-blue to-sp-cyan py-3 overflow-hidden">
      {/* Confetti floating effect - absolute positioned */}
      <div className="confetti-container absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
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
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              opacity: 0.6 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
      
      {/* Main content with z-index to appear above the confetti - centered */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10">
        {/* Title and subtitle */}
        <div className="flex items-center mb-2 justify-center">
          <img 
            src="/icon-star.png" 
            alt="logo" 
            className="w-6 h-6 mr-2 hidden md:block"
          />
          <div className="text-center">
            <h3 className="text-white font-bold text-lg md:text-xl">{title}</h3>
            <p className="text-white text-xs md:text-sm opacity-90 font-medium">
              {subtitle}
            </p>
          </div>
        </div>
        
        {/* Countdown centered */}
        <div className="flex items-center justify-center">
          <CountdownBox value={days} label="Días" />
          <CountdownBox value={hrs} label="Horas" />
          <CountdownBox value={min} label="Min" />
          <CountdownBox value={sec} label="Seg" />
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