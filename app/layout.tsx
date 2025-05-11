// app/layout.tsx
import Navbar from './components/client/layout/Navbar';
import Footer from './components/server/layout/Footer';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sorteos Premium - Gana premios increíbles',
  description: 'Participa en nuestros sorteos y gana autos, departamentos, celulares y más.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}