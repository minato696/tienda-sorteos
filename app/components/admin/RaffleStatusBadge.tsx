// app/components/admin/RaffleStatusBadge.tsx
import { RaffleStatus } from '@prisma/client';

const statusConfig = {
  UPCOMING: {
    label: 'Próximo',
    className: 'bg-yellow-100 text-yellow-800',
  },
  ACTIVE: {
    label: 'Activo',
    className: 'bg-green-100 text-green-800',
  },
  FINISHED: {
    label: 'Finalizado',
    className: 'bg-blue-100 text-blue-800',
  },
  CANCELLED: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-800',
  },
};

export default function RaffleStatusBadge({ status }: { status: RaffleStatus }) {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}