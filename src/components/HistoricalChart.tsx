'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Props {
  data: any;
}

export default function HistoricalChart({ data }: Props) {
  if (!data || !data.rates) return <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">No data available</div>;

  const chartData = Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
    date,
    rate: Object.values(rates)[0] as number
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12, fill: '#94a3b8' }} 
          tickLine={false}
          axisLine={false}
          minTickGap={50}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          hide 
        />
        <Tooltip 
          contentStyle={{ 
            background: 'white', 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.75rem', 
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
          labelStyle={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}
          formatter={(value: number) => [value.toFixed(4), 'Rate']}
        />
        <Area 
          type="monotone" 
          dataKey="rate" 
          stroke="#10b981" 
          strokeWidth={2.5} 
          fill="url(#colorRate)"
          animationDuration={300}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}