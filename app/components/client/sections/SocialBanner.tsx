'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

// SocialBanner: fondo gradiente tipo wavy
export default function SocialBanner() {
  const redes = [
    { name: 'Facebook',  href: '#', Icon: FaFacebookF  },
    { name: 'TikTok',    href: '#', Icon: FaTiktok    },
    { name: 'YouTube',   href: '#', Icon: FaYoutube   },
    { name: 'Instagram', href: '#', Icon: FaInstagram },
  ];

  return (
    <section className="relative isolate overflow-hidden rounded-3xl p-8 lg:p-12 bg-gradient-to-r from-sp-purple via-sp-indigo to-sp-cyan shadow-lg ring-1 ring-brand-light/50">
      {/* Diagonal decorativa */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10 -skew-x-12 origin-bottom-right"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        {/* Texto */}
        <div className="max-w-xl text-white">
          <h2 className="font-extrabold text-3xl lg:text-4xl">
            Síguenos en redes sociales
          </h2>
          <p className="mt-4 text-base leading-relaxed">
            ¿Ya formas parte de nuestra comunidad? <br className="hidden lg:block" />
            ¡Únete y no te pierdas ninguna novedad!
          </p>
        </div>

        {/* Íconos con círculo fijo 104×104 px y hover */}
        <ul className="flex items-center gap-10">
          {redes.map(({ name, href, Icon }) => (
            <li key={name}>
              <Link
                href={href}
                aria-label={name}
                className="inline-flex items-center justify-center w-[104px] h-[104px] rounded-full bg-[#4D23AC] text-white border-2 border-transparent transition-all duration-200 hover:bg-[#4D23AC]/80 hover:border-4 hover:border-[#4046D6] focus:outline-none focus:ring-4 focus:ring-[#4D23AC]/50"
              >
                <Icon size={50} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
