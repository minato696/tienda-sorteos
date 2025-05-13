'use client';

import { useEffect, useState } from 'react';

interface Props {
  /** ISO string de la fecha del sorteo */
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: Props) {
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

  const Cell = ({ v, label }: { v: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold text-blue-900 bg-white rounded-md px-3 py-1">
        {String(v).padStart(2, '0')}
      </span>
      <small className="text-[10px] md:text-xs text-white tracking-widest">
        {label}
      </small>
    </div>
  );

  return (
    <div className="relative isolate flex justify-center w-full bg-gradient-to-r from-[#0b5db4] to-[#4054d4] overflow-hidden py-4">
      {/* confetis de fondo con pseudo-elemento */}
      <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-70 mix-blend-overlay animate-confetti" />
      <div className="relative z-10 flex items-center gap-4">
        {/* texto */}
        <div className="flex items-center gap-2">
          {/* icono opcional */}
          <img
            src="/icon-star.png"
            alt="estrella"
            className="h-10 w-10 hidden md:block"
          />
          <div className="rounded-full bg-white/80 px-4 py-1 font-semibold text-blue-900">
            ¡Próximo sorteo en vivo!
          </div>
        </div>

        {/* contador */}
        <div className="flex gap-3 md:gap-4">
          <Cell v={days} label="DÍAS" />
          <Cell v={hrs} label="HORAS" />
          <Cell v={min} label="MIN" />
          <Cell v={sec} label="SEG" />
        </div>
      </div>
    </div>
  );
}

/* Tailwind animación simple */
const style = `
@keyframes confetti {
  0% { background-position: 0 0 }
  100% { background-position: 400px 200px }
}
.animate-confetti { animation: confetti 20s linear infinite }
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.innerHTML = style;
  document.head.appendChild(s);
}
