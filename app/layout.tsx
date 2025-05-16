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
      <body className={`${inter.className} bg-gray-50 m-0 p-0`}>
        {/* Header contenedor sin espacios entre elementos */}
        <header className="sticky-header">
          {/* Banner de cuenta regresiva con mayor altura - 80px */}
          <div className="countdown-wrapper" style={{ height: '90px' }}>
            <CountdownBanner />
          </div>

          {/* Navbar sin separación del banner */}
          <Navbar />
        </header>

        {/* Contenido principal */}
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}