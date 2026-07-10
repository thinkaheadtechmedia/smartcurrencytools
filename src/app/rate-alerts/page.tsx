'use client';
import { useState } from 'react';
import { CURRENCIES } from '@/lib/currencies';

export default function RateAlertsPage() {
  const [email, setEmail] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [target, setTarget] = useState(0.9);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, from, to, target })
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Set a Rate Alert</h1>
      <p className="text-slate-600 mb-8">Get notified via email when your desired exchange rate is hit.</p>
      
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-6 rounded-xl">
          Alert saved! We will email you when {from}/{to} hits {target}.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
              <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500">
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
              <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500">
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Rate (e.g., 0.9100)</label>
            <input type="number" step="0.0001" required value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <button type="submit" className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition-colors">Create Alert</button>
        </form>
      )}
    </div>
  );
}