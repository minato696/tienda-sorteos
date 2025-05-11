// app/components/admin/DashboardSalesChart.tsx
'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

// Esta función simula datos para la gráfica
// En un entorno real, estos datos vendrían de la API
function getLastSevenDays() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'dd MMM', { locale: es }),
      ventas: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
}

export default function DashboardSalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // En un entorno real, esto sería una llamada a la API
    // por ejemplo:
    // fetch('/api/stats/sales')
    //   .then(res => res.json())
    //   .then(data => setData(data));
    
    // Por ahora, simulamos datos
    setData(getLastSevenDays());
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} tickets`, 'Ventas']}
          labelFormatter={(label) => `Fecha: ${label}`}
        />
        <Bar dataKey="ventas" fill="#4f46e5" barSize={40} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}