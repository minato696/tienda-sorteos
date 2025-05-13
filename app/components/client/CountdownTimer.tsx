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
      <span className="text-xl md:text-2xl font-bold text-sp-indigo bg-white rounded-md px-3 py-1 shadow-inner relative overflow-hidden">
        {/* Sparkle effect */}
        <span className="absolute w-10 h-10 -top-5 -left-5 bg-white opacity-0 rounded-full sparkle-animation"></span>
        {String(v).padStart(2, '0')}
      </span>
      <small className="text-[10px] md:text-xs text-white font-bold tracking-widest mt-1">
        {label}
      </small>
    </div>
  );

  return (
    <div className="relative isolate flex justify-center w-full bg-gradient-primary py-2 overflow-visible">
      {/* Confetti background animation */}
      <div className="absolute inset-0 bg-[url('/confetti.svg')] opacity-70 mix-blend-overlay animate-confetti"></div>
      
      {/* Left-side confetti explosion */}
      <div className="absolute left-0 top-0 h-full w-24 overflow-hidden">
        <div className="confetti-explosion-left"></div>
      </div>
      
      {/* Right-side confetti explosion */}
      <div className="absolute right-0 top-0 h-full w-24 overflow-hidden">
        <div className="confetti-explosion-right"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 md:gap-4">
        {/* Prize icon with pulse effect */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex h-8 w-8 rounded-full bg-sp-pink items-center justify-center pulse-animation">
            <img
              src="/icon-star.png"
              alt="estrella"
              className="h-6 w-6 spin-slow"
            />
          </div>
          <div className="rounded-full bg-white/90 px-3 py-0.5 text-sm font-semibold text-sp-indigo shadow-md bounce-subtle">
            ¡Próximo sorteo en vivo!
          </div>
        </div>

        {/* Countdown cells */}
        <div className="flex gap-2 md:gap-3">
          <Cell v={days} label="DÍAS" />
          <Cell v={hrs} label="HORAS" />
          <Cell v={min} label="MIN" />
          <Cell v={sec} label="SEG" />
        </div>
      </div>
    </div>
  );
}

/* Animations for celebration effects */
const style = `
/* Confetti background animation */
@keyframes confetti {
  0% { background-position: 0 0 }
  100% { background-position: 400px 200px }
}
.animate-confetti { 
  animation: confetti 15s linear infinite;
}

/* Subtle bounce effect */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

/* Sparkle animation inside number cells */
@keyframes sparkle {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
}
.sparkle-animation {
  animation: sparkle 4s ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * 1s);
}

/* Slow spin for the star icon */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spin-slow {
  animation: spin-slow 10s linear infinite;
}

/* Pulse effect for the icon background */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(247, 37, 133, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(247, 37, 133, 0); }
  100% { box-shadow: 0 0 0 0 rgba(247, 37, 133, 0); }
}
.pulse-animation {
  animation: pulse 2s infinite;
}

/* Confetti explosion animations */
@keyframes confetti-explosion {
  0% { height: 0; width: 0; opacity: 0; }
  50% { height: 30vh; width: 30vh; opacity: 0.6; }
  100% { height: 35vh; width: 35vh; opacity: 0; }
}
.confetti-explosion-left {
  position: absolute;
  left: 10%;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(247, 37, 133, 0.8) 10%, 
    rgba(114, 9, 183, 0.7) 25%, 
    rgba(67, 97, 238, 0.5) 50%,
    rgba(76, 201, 240, 0.3) 75%);
  animation: confetti-explosion 5s ease-out infinite;
  animation-delay: 1s;
}
.confetti-explosion-right {
  position: absolute;
  right: 10%;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(247, 37, 133, 0.8) 10%, 
    rgba(114, 9, 183, 0.7) 25%, 
    rgba(67, 97, 238, 0.5) 50%,
    rgba(76, 201, 240, 0.3) 75%);
  animation: confetti-explosion 5s ease-out infinite;
  animation-delay: 3s;
}
`;

if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.innerHTML = style;
  document.head.appendChild(s);
}