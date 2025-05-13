// app/layout.tsx
import CountdownBanner from './components/server/layout/CountdownBanner';
import Navbar from './components/client/layout/Navbar';
import Footer from './components/server/layout/Footer';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sorteos Premium - Gana premios increíbles',
  description:
    'Participa en nuestros sorteos y gana autos, departamentos, celulares y más.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Banner con contador (fixed, z-60) */}
        <CountdownBanner />

        {/* Navbar desplazado 48 px hacia abajo (clase top-12 añadida en Navbar.tsx) */}
        <Navbar />

        {/* Contenido principal; pt-12 evita que quede tapado */}
        <main className="pt-12">{children}</main>

        <Footer />
      </body>
      
    </html>
  );
}
