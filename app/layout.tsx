import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sorteos Premium',
  description: 'Plataforma de sorteos para ganar autos de lujo y otros premios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}