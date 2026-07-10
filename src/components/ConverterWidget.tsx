'use client';

import { useState } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';
import { CURRENCIES } from '@/lib/currencies';
import CurrencyFlag from './CurrencyFlag';

interface Props {
  initialFrom: string;
  initialTo: string;
  initialRate: number;
  onPairChange?: (from: string, to: string) => void;
}

export default function ConverterWidget({ initialFrom, initialTo, initialRate, onPairChange }: Props) {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [rate, setRate] = useState(initialRate);
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    const newFrom = to;
    const newTo = from;
    setFrom(newFrom);
    setTo(newTo);
    setRate(1 / rate);
    if (onPairChange) onPairChange(newFrom, newTo);
  };

  const result = (amount * rate).toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        
        {/* From Input */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 transition-all focus-within:border-emerald-500 focus-within:bg-white">
          <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Amount</label>
          <div className="flex items-center justify-between gap-2">
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-2xl font-bold text-slate-900 outline-none placeholder:text-slate-300"
              placeholder="0.00"
            />
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg pl-2 pr-1">
              <CurrencyFlag code={from} />
              <select 
                value={from} 
                onChange={(e) => {
                  setFrom(e.target.value);
                  if (onPairChange) onPairChange(e.target.value, to);
                }}
                className="bg-white text-sm font-semibold text-slate-700 py-2 pr-6 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button 
            onClick={handleSwap} 
            className="bg-white p-2.5 border-2 border-slate-200 rounded-full hover:border-emerald-500 hover:bg-emerald-50 transition-all hover:rotate-180 duration-300 shadow-sm"
            aria-label="Swap currencies"
          >
            <ArrowUpDown className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* To Result */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 transition-all focus-within:border-emerald-500">
          <label className="block text-xs font-medium text-emerald-700 mb-2 uppercase tracking-wide">Converted</label>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 w-full">
              <span className="text-2xl font-bold text-slate-900 w-full">{result}</span>
              <button onClick={handleCopy} className="text-slate-400 hover:text-emerald-600 transition-colors p-1" aria-label="Copy result">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg pl-2 pr-1">
              <CurrencyFlag code={to} />
              <select 
                value={to} 
                onChange={(e) => {
                  setTo(e.target.value);
                  if (onPairChange) onPairChange(from, e.target.value);
                }}
                className="bg-white text-sm font-semibold text-slate-700 py-2 pr-6 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Swap Button */}
        <div className="flex justify-center md:hidden -my-2">
          <button 
            onClick={handleSwap} 
            className="bg-white p-2 border-2 border-slate-200 rounded-full hover:border-emerald-500 hover:bg-emerald-50 transition-all rotate-90 shadow-sm"
            aria-label="Swap currencies"
          >
            <ArrowUpDown className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          1 {from} = {rate.toFixed(4)} {to}
        </span>
      </div>
    </div>
  );
}