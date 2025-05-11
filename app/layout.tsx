import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sorteos Premium',
  description: 'Plataforma de sorteos premium',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="bg-blue-900 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Sorteos Premium</h1>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-900 text-white p-4 mt-8">
          <div className="container mx-auto">
            <p>© 2025 Sorteos Premium</p>
          </div>
        </footer>
      </body>
    </html>
  );
}