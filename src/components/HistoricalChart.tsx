'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: any; // Raw Frankfurter historical data
}

export default function HistoricalChart({ data }: Props) {
  // Transform API data for Recharts
  const chartData = Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
    date,
    rate: Object.values(rates)[0] as number
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="date" tick={false} />
        <YAxis domain={['auto', 'auto']} hide />
        <Tooltip 
          formatter={(value: any) => {
            if (value == null) return ['', 'Rate'];
            return [(Number(value)).toFixed(4), 'Rate'];
          }}
          labelStyle={{ color: '#666' }}
        />
        <Line 
          type="monotone" 
          dataKey="rate" 
          stroke="#2563eb" 
          strokeWidth={2} 
          dot={false} 
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}