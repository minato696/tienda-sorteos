'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ThumbSlider({ images }: { images: string[] }) {
  return (
    <div className="flex justify-center">       {/* centra todo el carrusel */}
      <Swiper
        modules={[Navigation, FreeMode]}
        navigation
        freeMode
        slidesPerView="auto"
        spaceBetween={20}
        className="!overflow-visible w-fit"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="!w-24 md:!w-28">
            <img
              src={src}
              alt={`Miniatura ${i + 1}`}
              className="h-24 md:h-28 w-full rounded-lg border-4 border-[#1A2C66] hover:border-yellow-400 transition-colors"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
