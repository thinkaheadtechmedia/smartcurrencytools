import CurrencyDashboard from '@/components/CurrencyDashboard';
import { CURRENCIES } from '@/lib/currencies';
import { fetchHistoricalRates, fetchLatestRates } from '@/lib/api';
import Link from 'next/link';
import { ShieldCheck, Clock, Globe2, TrendingUp } from 'lucide-react';
import CurrencyFlag from '@/components/CurrencyFlag';

const popularPairs = [
  { from: 'USD', to: 'EUR' },
  { from: 'USD', to: 'GBP' },
  { from: 'EUR', to: 'GBP' },
  { from: 'GBP', to: 'JPY' },
  { from: 'USD', to: 'JPY' },
  { from: 'USD', to: 'CAD' },
  { from: 'AUD', to: 'USD' },
  { from: 'USD', to: 'CNY' }
];

export default async function Home() {
  // Fetch REAL initial data for USD to EUR
  const initialHistorical = await fetchHistoricalRates('USD', 'EUR', 7);
  const initialLatest = await fetchLatestRates('USD', 'EUR');
  const initialRate = initialLatest?.rates?.EUR || 0; // Removed the 0.92 hardcode

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-emerald-100">
              Trusted by 100k+ users worldwide
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              Smart Currency <span className="text-emerald-500">Conversion</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real-time exchange rates for 170+ currencies. Make informed international money transfers with historical data and trend charts.
            </p>
          </div>
          
          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <CurrencyDashboard 
                initialFrom="USD" 
                initialTo="EUR" 
                initialRate={initialRate} 
                initialHistorical={initialHistorical}
              />
            </div>

            {/* Trust & Info Side Panel */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900">Updated Hourly</h3>
                </div>
                <p className="text-sm text-slate-500">Data is synced directly from the European Central Bank every hour.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900">Bank-Grade Accuracy</h3>
                </div>
                <p className="text-sm text-slate-500">No hidden fees or artificial markups. Just the pure mid-market rate.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Globe2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900">170+ Currencies</h3>
                </div>
                <p className="text-sm text-slate-500">From USD to ZAR, we cover every major fiat currency globally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-20">
        
        {/* Popular Pairs */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">Popular Currency Pairs</h2>
              <p className="text-slate-500 mt-2">Check live rates for the most traded global currencies.</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500 hidden sm:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.map((pair) => {
              const fromCur = CURRENCIES.find(c => c.code === pair.from)!;
              const toCur = CURRENCIES.find(c => c.code === pair.to)!;
              return (
                <div key={`${pair.from}-${pair.to}`} className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
                  <Link href={`/convert/${pair.from}-to-${pair.to}`} className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <CurrencyFlag code={pair.from} className="!w-8 !h-6" />
                      <span className="text-slate-300 group-hover:text-emerald-500 transition-colors">→</span>
                      <CurrencyFlag code={pair.to} className="!w-8 !h-6" />
                    </div>
                    <span className="font-bold text-slate-900">{pair.from}/{pair.to}</span>
                  </Link>
                  <Link href={`/convert/${pair.to}-to-${pair.from}`} className="block text-xs text-slate-500 hover:text-emerald-600 transition-colors">
                    View {pair.to} to {pair.from} →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Browse All Currencies */}
        <section>
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">Browse All Currencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CURRENCIES.map(currency => (
              <Link 
                key={currency.code} 
                href={`/currencies/${currency.code.toLowerCase()}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all"
              >
                <CurrencyFlag code={currency.code} className="!w-8 !h-6" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{currency.code}</div>
                  <div className="text-xs text-slate-500 truncate">{currency.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}