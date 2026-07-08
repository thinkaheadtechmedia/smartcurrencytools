'use client';

import { useState } from 'react';
import { ArrowLeftRight, Copy } from 'lucide-react';
import { CURRENCIES } from '@/lib/currencies';

interface Props {
  initialFrom: string;
  initialTo: string;
  initialRate: number;
}

export default function ConverterWidget({ initialFrom, initialTo, initialRate }: Props) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [rate, setRate] = useState(initialRate);
  const [copied, setCopied] = useState(false);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setRate(1 / rate);
  };

  const result = (amount * rate).toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border space-y-4">
      <div className="flex items-center gap-2">
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border rounded text-lg font-semibold"
        />
        <select 
          value={from} 
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 border rounded bg-gray-50"
        >
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSwap} className="p-2 rounded-full hover:bg-gray-100 transition-transform hover:rotate-180 duration-300">
          <ArrowLeftRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-full p-3 border rounded bg-gray-50 text-lg font-semibold flex justify-between items-center">
          <span>{result}</span>
          <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <select 
          value={to} 
          onChange={(e) => setTo(e.target.value)}
          className="p-3 border rounded bg-gray-50"
        >
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Live rate • Updated {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}