import CurrencyDashboard from '@/components/CurrencyDashboard';
import { CURRENCIES } from '@/lib/currencies';
import { fetchHistoricalRates } from '@/lib/api';
import Link from 'next/link';
import { ShieldCheck, Clock, Globe2 } from 'lucide-react';

// Curated mix of popular pairs
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
  // Fetch initial chart data for the default pair (USD/EUR) on the server
  const initialHistorical = await fetchHistoricalRates('USD', 'EUR', 7);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often are exchange rates updated?",
        "acceptedAnswer": { "@type": "Answer", "text": "Our exchange rates are sourced directly from the European Central Bank via Frankfurter.app and are updated every hour to ensure accuracy." }
      },
      {
        "@type": "Question",
        "name": "Is this currency converter free to use?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, SmartCurrencyTools is 100% free for personal and commercial use. There are no hidden fees or limits on conversions." }
      }
    ]
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4 rounded-b-[2rem] mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Smart Currency <span className="text-emerald-400">Conversion</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Real-time exchange rates for 170+ currencies. Make informed international money transfers with historical data and trend charts.
          </p>
          
          {/* Converter + Chart Dashboard */}
          <div className="text-left max-w-2xl mx-auto">
            <CurrencyDashboard 
              initialFrom="USD" 
              initialTo="EUR" 
              initialRate={0.92} 
              initialHistorical={initialHistorical}
            />
          </div>

          {/* Trust Badge Strip */}
          <div className="flex justify-center flex-wrap gap-6 mt-8 text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Rates
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Clock className="w-4 h-4 text-emerald-400" />
              Updated Hourly
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              170+ Currencies
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-20">
        
        {/* Popular Pairs */}
        <section>
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-slate-900">Popular Currency Pairs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularPairs.map((pair) => {
              const fromCur = CURRENCIES.find(c => c.code === pair.from)!;
              const toCur = CURRENCIES.find(c => c.code === pair.to)!;
              return (
                <div key={`${pair.from}-${pair.to}`} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
                  <Link href={`/convert/${pair.from}-to-${pair.to}`} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fromCur.flag}</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-2xl">{toCur.flag}</span>
                    </div>
                    <span className="font-bold text-slate-900">{pair.from}/{pair.to}</span>
                  </Link>
                  <Link href={`/convert/${pair.to}-to-${pair.from}`} className="block mt-3 text-xs text-slate-500 hover:text-emerald-600">
                    View {pair.to} to {pair.from} →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="bg-white p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-emerald-50 p-4 rounded-xl">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold mb-3 text-slate-900">Why trust our exchange rates?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                SmartCurrencyTools aggregates data from leading financial institutions. Our primary data source is the European Central Bank (ECB) via the Frankfurter API, ensuring that the rates you see are accurate, reliable, and free from hidden markups.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We cache rates hourly using Incremental Static Regeneration (ISR) to maintain lightning-fast page loads without sacrificing data freshness. This means you get institutional-grade data delivered in milliseconds.
              </p>
            </div>
          </div>
        </section>

        {/* Browse Currencies */}
        <section>
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-slate-900">Browse All Currencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CURRENCIES.map(currency => (
              <Link 
                key={currency.code} 
                href={`/currencies/${currency.code.toLowerCase()}`}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition-colors"
              >
                <span className="text-xl">{currency.flag}</span>
                <div>
                  <div className="font-semibold text-sm">{currency.code}</div>
                  <div className="text-xs text-slate-500 truncate">{currency.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto pb-12">
          <h2 className="font-display text-3xl font-bold text-center mb-8 text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-lg mb-2 text-slate-900">How often are rates updated?</h3>
              <p className="text-slate-600">Our exchange rates are sourced from the European Central Bank and are updated every hour on our platform.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-lg mb-2 text-slate-900">Is this currency converter free?</h3>
              <p className="text-slate-600">Yes, SmartCurrencyTools is 100% free for personal and commercial use. There are no hidden fees or limits.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}