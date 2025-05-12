// app/participar/page.tsx
import ParticiparForm from '@/app/components/client/participar/ParticiparForm';

export default function ParticiparPage() {
  // Ya no necesitamos cargar sorteos de la base de datos
  // puesto que hemos eliminado ese modelo
  return <ParticiparForm />;
}