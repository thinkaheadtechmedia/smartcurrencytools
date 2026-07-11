'use client';
import { useState } from 'react';
import { CURRENCIES } from '@/lib/currencies';

export default function RateAlertsPage() {
  const [email, setEmail] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [target, setTarget] = useState(0.9);
  const [direction, setDirection] = useState('above');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Honeypot field check (hidden from users)
    const formData = new FormData(e.currentTarget);
    if (formData.get('company_name')) return; 

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, from, to, target, direction })
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to set alert.');
      }
    } catch {
      setError('Network error occurred.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-8 rounded-2xl">
          <h2 className="font-display text-2xl font-bold mb-2">Alert Set Successfully!</h2>
          <p className="mb-4">You&apos;ll be notified when {from} to {to} goes {direction} {target}.</p>
          <button onClick={() => setSubmitted(false)} className="text-sm font-semibold underline hover:text-emerald-800">
            Create another alert
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Set a Rate Alert</h1>
      <p className="text-slate-600 mb-8">Get notified via email when your desired exchange rate is hit. We&apos;ll check the market every hour.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Honeypot field (hidden from humans) */}
        <input type="text" name="company_name" className="hidden" tabIndex={-1} autoComplete="off" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">From Currency</label>
            <select value={from} onChange={e => setFrom(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500">
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">To Currency</label>
            <select value={to} onChange={e => setTo(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500">
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Rate</label>
            <input type="number" step="0.0001" required value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Alert Me When...</label>
            <select value={direction} onChange={e => setDirection(e.target.value)} className="w-full p-3 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="above">Goes Above Target</option>
              <option value="below">Goes Below Target</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition-colors">
          Create Alert
        </button>
      </form>
    </div>
  );
}