'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ThumbSlider({ images }: { images: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex justify-center">
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        slidesPerView="auto"
        spaceBetween={20}
        className="!overflow-visible w-fit py-2"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="!w-24 md:!w-28">
            <div 
              className="relative group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Efecto de brillo detrás de la imagen al hacer hover */}
              <div className={`absolute inset-0 rounded-lg bg-sp-pink/70 blur-md transform scale-105 transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-60' : 'opacity-0'}`}></div>
              
              {/* Imagen con borde atractivo y efecto al hacer hover */}
              <div className={`relative overflow-hidden rounded-lg ${hoveredIndex === i ? 'shadow-lg shadow-sp-pink/30' : 'shadow-md'} transition-all duration-300`}>
                <img
                  src={src}
                  alt={`Miniatura ${i + 1}`}
                  className={`h-24 md:h-28 w-full object-cover border-4 transition-all duration-300 
                    ${hoveredIndex === i 
                      ? 'border-sp-pink scale-110 brightness-110' 
                      : 'border-sp-indigo'
                    }`}
                />
                
                {/* Overlay con gradiente solo visible en hover */}
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Texto que aparece en hover */}
                <div className={`absolute bottom-0 left-0 right-0 text-center text-white text-xs font-bold py-1 transform transition-transform duration-300 ${hoveredIndex === i ? 'translate-y-0' : 'translate-y-full'}`}>
                  Ver Sorteo
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}