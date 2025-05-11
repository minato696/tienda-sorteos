// app/components/admin/DashboardStatCard.tsx
'use client';

import { LucideIcon } from 'lucide-react';

type DashboardStatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
  iconClassName?: string;
};

export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  trend,
  className = '',
  iconClassName = ''
}: DashboardStatCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className={trend.positive ? 'text-green-600' : 'text-red-600'}>
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-1 text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${iconClassName}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}