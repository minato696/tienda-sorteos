// app/layout.tsx
import { ThemeProvider } from './components/client/ThemeContext';
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
      <body className={`${inter.className} bg-theme-bg-main m-0 p-0 transition-colors duration-300`}>
        <ThemeProvider>
          {/* Header contenedor sin espacios entre elementos */}
          <header className="sticky-header sticky top-0 z-50">
            {/* Banner de cuenta regresiva con mayor altura */}
            <div 
              className="countdown-wrapper transition-all duration-300" 
              style={{ 
                height: '85px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <CountdownBanner />
            </div>

            {/* Navbar sin separación del banner */}
            <Navbar />
          </header>

          {/* Contenido principal */}
          <main className="min-h-screen transition-colors duration-300">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}