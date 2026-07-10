'use client';

import { useState } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';
import { CURRENCIES } from '@/lib/currencies';

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
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-500 mb-1">Amount</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 border border-slate-200 rounded-xl text-2xl font-bold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>
        <select 
          value={from} 
          onChange={(e) => {
            setFrom(e.target.value);
            if (onPairChange) onPairChange(e.target.value, to);
          }}
          className="p-4 border border-slate-200 rounded-xl bg-slate-50 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
      </div>

      <div className="flex justify-center -my-2 relative z-10">
        <button 
          onClick={handleSwap} 
          className="p-3 bg-white border border-slate-200 rounded-full hover:bg-emerald-50 hover:border-emerald-500 transition-all hover:rotate-180 duration-300 shadow-sm"
          aria-label="Swap currencies"
        >
          <ArrowUpDown className="w-5 h-5 text-emerald-600" />
        </button>
      </div>

      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <label className="block text-xs font-medium text-slate-500 mb-1">Converted Amount</label>
          <div className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
            <span className="text-2xl font-bold text-slate-900">{result}</span>
            <button onClick={handleCopy} className="text-slate-400 hover:text-emerald-600 transition-colors p-1">
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <select 
          value={to} 
          onChange={(e) => {
            setTo(e.target.value);
            if (onPairChange) onPairChange(from, e.target.value);
          }}
          className="p-4 border border-slate-200 rounded-xl bg-slate-50 font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
      </div>
    </div>
  );
}