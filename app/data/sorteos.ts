// app/data/sorteos.ts
export interface Sorteo {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;
  fechaSorteo: string;
  ticketsDisponibles: number;
  ticketsVendidos: number;
  premio: string;
}

export const sorteos: Sorteo[] = [
  {
    id: "1",
    titulo: "Auto BMW Serie 3 2025",
    descripcion: "Participa en nuestro sorteo mensual y llévate un increíble auto 0KM.",
    imagenUrl: "/images/bmw.jpg",
    precio: 25,
    fechaSorteo: "2025-06-15",
    ticketsDisponibles: 2500,
    ticketsVendidos: 2500,
    premio: "BMW Serie 3 2025"
  },
  {
    id: "2",
    titulo: "Apartamento en Miraflores",
    descripcion: "Un increíble apartamento con vista al mar en el mejor distrito de Lima.",
    imagenUrl: "/images/apartamento.jpg",
    precio: 50,
    fechaSorteo: "2025-07-30",
    ticketsDisponibles: 6000,
    ticketsVendidos: 4000,
    premio: "Apartamento de 120m²"
  },
  {
    id: "3",
    titulo: "iPhone 16 Pro Max",
    descripcion: "El último modelo de iPhone con todas sus funcionalidades.",
    imagenUrl: "/images/iphone.jpg",
    precio: 10,
    fechaSorteo: "2025-06-10",
    ticketsDisponibles: 800,
    ticketsVendidos: 2200,
    premio: "iPhone 16 Pro Max 1TB"
  }
];