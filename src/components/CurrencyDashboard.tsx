'use client';

import { useState, useEffect } from 'react';
import ConverterWidget from './ConverterWidget';
import HistoricalChart from './HistoricalChart';
import { fetchHistoricalRates } from '@/lib/api';

// Added explicit type definitions for the props
interface CurrencyDashboardProps {
  initialFrom: string;
  initialTo: string;
  initialRate: number;
  initialHistorical: any; // Using 'any' here matches the raw API response type
}

export default function CurrencyDashboard({ 
  initialFrom, 
  initialTo, 
  initialRate, 
  initialHistorical 
}: CurrencyDashboardProps) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [rate, setRate] = useState(initialRate);
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
    updateChart();
  }, [from, to, period]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
      <ConverterWidget 
        initialFrom={from} 
        initialTo={to} 
        initialRate={rate}
        onPairChange={(newFrom: string, newTo: string) => {
          setFrom(newFrom);
          setTo(newTo);
        }}
      />
      
      <div className="mt-8 pt-8 border-t border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-lg font-semibold text-slate-900">Exchange Rate History</h3>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {[7, 30, 365].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  period === p ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {p === 7 ? '7D' : p === 30 ? '1M' : '1Y'}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[250px] w-full">
          {loading ? (
            <div className="h-full w-full bg-slate-50 animate-pulse rounded-lg flex items-center justify-center text-slate-400 text-sm">
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