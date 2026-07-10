import { CURRENCIES } from '@/lib/currencies';
import Link from 'next/link';

export default function CurrenciesIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-8">All Supported Currencies</h1>
      <p className="text-slate-600 mb-12">Browse information and live exchange rates for {CURRENCIES.length} major global currencies.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRENCIES.map(currency => (
          <Link key={currency.code} href={`/currencies/${currency.code.toLowerCase()}`} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-2">
              <CurrencyFlag code={currency.code} className="!w-12 !h-8" />
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">{currency.code}</h2>
                <p className="text-sm text-slate-500">{currency.name}</p>
              </div>
            </div>
            <p className="text-emerald-600 text-sm font-medium mt-4">View Exchange Rates →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}