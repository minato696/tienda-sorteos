'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* imágenes del hero */
const slides = [
  {
    src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&w=1600&q=80',
    filter: 'bg-blue-600/20', // tono azulado
    motion: { scale: 1.15, rotate: -2 },
  },
  {
    src: 'https://images.unsplash.com/photo-1561134266-22b120e75ae1?auto=format&w=1600&q=80',
    filter: 'bg-pink-600/20',
    motion: { scale: 1.1, x: '-6%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&w=1600&q=80',
    filter: 'bg-yellow-500/20',
    motion: { scale: 1.2, rotate: 2 },
  },
  {
    src: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&w=1600&q=80',
    filter: 'bg-teal-500/20',
    motion: { scale: 1.12, x: '5%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&w=1600&q=80',
    filter: 'bg-purple-600/20',
    motion: { scale: 1.18, rotate: -3 },
  },
];

export default function HeroSection() {
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh]">
      {/* Flechas navegación */}
      <button
        aria-label="Anterior"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-blue-900 p-3 rounded-full backdrop-blur shadow"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white text-blue-900 p-3 rounded-full backdrop-blur shadow"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        className="w-full h-full"
      >
        {slides.map(({ src, filter, motion: anim }, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Imagen animada Ken-Burns con parámetro distinto */}
              <motion.img
                src={src}
                alt={`Hero ${idx + 1}`}
                initial={anim}
                animate={{ scale: 1, x: 0, rotate: 0 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="h-full w-full object-cover"
              />

              {/* Overlay degradado + filtro de color único */}
              <div
                className={`absolute inset-0 ${filter} mix-blend-multiply`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

              {/* Texto central */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-md">
                  ¡Participa y gana!
                </h2>
                <p className="mt-4 text-lg md:text-2xl text-white max-w-2xl drop-shadow-md">
                  Compra tu ticket y entra en el sorteo de increíbles premios
                </p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
