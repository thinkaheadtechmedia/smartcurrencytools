'use client';

import { useState, useEffect } from 'react';
import ConverterWidget from './ConverterWidget';
import HistoricalChart from './HistoricalChart';
import { fetchHistoricalRates } from '@/lib/api';

interface DashboardProps {
  initialFrom: string;
  initialTo: string;
  initialRate: number;
  initialHistorical: any;
}

export default function CurrencyDashboard({ 
  initialFrom, 
  initialTo, 
  initialRate, 
  initialHistorical 
}: DashboardProps) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [period, setPeriod] = useState(7);
  const [historicalData, setHistoricalData] = useState(initialHistorical);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateChart = async () => {
      setLoading(true);
      try {
        const newData = await fetchHistoricalRates(from, to, period);
        setHistoricalData(newData);
      } catch (error) {
        console.error("Failed to update chart", error);
      }
      setLoading(false);
    };
    
    if (from !== initialFrom || to !== initialTo || period !== 7) {
        updateChart();
    }
  }, [from, to, period, initialFrom, initialTo]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100">
        <ConverterWidget 
          initialFrom={from} 
          initialTo={to} 
          initialRate={initialRate}
          onPairChange={(newFrom: string, newTo: string) => {
            setFrom(newFrom);
            setTo(newTo);
          }}
        />
      </div>
      
      <div className="p-6 sm:p-8 bg-slate-50/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-lg font-semibold text-slate-900">Exchange Rate History</h3>
          <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold shadow-sm">
            {[7, 30, 365].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  period === p ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {p === 7 ? '7D' : p === 30 ? '1M' : '1Y'}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[250px] w-full">
          {loading ? (
            <div className="h-full w-full bg-white animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-sm">
              Loading chart...
            </div>
          ) : (
            <HistoricalChart data={historicalData} />
          )}
        </div>
      </div>
    </div>
  );
}