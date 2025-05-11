// app/components/admin/RaffleStatusBadge.tsx (versión simplificada)
export default function RaffleStatusBadge({ status }: { status?: string }) {
  // Como tu modelo probablemente no tiene un campo status,
  // usamos una badge genérica por ahora
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      Activo
    </span>
  );
}