import { CURRENCIES, getCurrency } from '@/lib/currencies';
import { fetchLatestRates, fetchHistoricalRates } from '@/lib/api';
import CurrencyDashboard from '@/components/CurrencyDashboard';
import HistoricalChart from '@/components/HistoricalChart';
import CurrencyFlag from '@/components/CurrencyFlag';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const pairs = [];
  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from.code !== to.code) {
        pairs.push({ pair: `${from.code}-to-${to.code}` });
      }
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const parts = pair.split('-to-');
  if (parts.length !== 2) return {};
  const from = getCurrency(parts[0]);
  const to = getCurrency(parts[1]);
  if (!from || !to) return {};

  return {
    title: `${from.code} to ${to.code} Exchange Rate | Convert ${from.name} to ${to.name}`,
    description: `Live exchange rate for ${from.name} (${from.code}) to ${to.name} (${to.code}). Convert ${from.code} to ${to.code} with real-time charts and historical data.`,
    alternates: { canonical: `https://smartcurrencytools.com/convert/${pair}` }
  };
}

export default async function PairPage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const parts = pair.split('-to-');
  if (parts.length !== 2) return notFound();
  
  const from = getCurrency(parts[0]);
  const to = getCurrency(parts[1]);

  if (!from || !to) return notFound();

  // Fetch data server-side
  const latestData = await fetchLatestRates(from.code, to.code);
  const historicalData = await fetchHistoricalRates(from.code, to.code, 365);
  
  const rate = latestData?.rates?.[to.code] || 0;

  // Calculate Highest Rate this year for FAQ
  let highestRate = 0;
  if (historicalData?.rates) {
    Object.values(historicalData.rates).forEach((r: any) => {
      const val = Object.values(r)[0] as number;
      if (val > highestRate) highestRate = val;
    });
  }

  const faqs = [
    { q: `How much is 100 ${from.code} in ${to.code} today?`, a: `As of today, 100 ${from.code} is equivalent to ${(100 * rate).toFixed(2)} ${to.code}.` },
    { q: `What is the ${from.code} to ${to.code} exchange rate?`, a: `The current live exchange rate is 1 ${from.code} = ${rate.toFixed(4)} ${to.code}.` },
    { q: `Is the ${from.code} to ${to.code} rate updated in real time?`, a: `Our rates are synced directly from the European Central Bank and updated hourly to ensure accuracy.` },
    { q: `What was the highest ${from.code} to ${to.code} rate this year?`, a: `The highest recorded rate for ${from.code} to ${to.code} in the last 365 days was ${highestRate.toFixed(4)}.` }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://smartcurrencytools.com" },
      { "@type": "ListItem", position: 2, name: "Currencies", item: "https://smartcurrencytools.com/currencies" },
      { "@type": "ListItem", position: 3, name: `${from.code} to ${to.code}`, item: `https://smartcurrencytools.com/convert/${pair}` }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; <Link href="/currencies" className="hover:text-emerald-600">Currencies</Link> &gt; {from.code} to {to.code}
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center gap-3 mb-2">
            <CurrencyFlag code={from.code} className="!w-12 !h-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
              {from.name} ({from.code}) to {to.name} ({to.code})
            </h1>
            <CurrencyFlag code={to.code} className="!w-12 !h-8" />
          </div>
          <p className="text-lg text-slate-600 mb-8">
            Live exchange rate: 1 {from.code} = <span className="font-bold text-emerald-600">{rate.toFixed(4)} {to.code}</span>
          </p>
          
          {/* Use CurrencyDashboard here to handle live state */}
          <CurrencyDashboard 
            initialFrom={from.code} 
            initialTo={to.code} 
            initialRate={rate} 
            initialHistorical={historicalData}
          />

<div className="flex items-center gap-3 mb-2">
  <CurrencyFlag code={from.code} className="!w-12 !h-8" />
  <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
    {from.name} ({from.code}) to {to.name} ({to.code})
  </h1>
  <CurrencyFlag code={to.code} className="!w-12 !h-8" />
</div>

{/* Add this badge block right here */}
{(from.isCrypto || to.isCrypto) && (
  <div className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full mb-4 border border-orange-200">
    Cryptocurrency Pair
  </div>
)}
{/* ... rest of the code (the <p> tag with the live rate) */}

          <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100">
            <h2 className="font-display text-xl font-semibold mb-4 text-slate-900">Common Conversions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 10, 50, 100, 500, 1000].map(amt => (
                <div key={amt} className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">{amt} {from.code}</span>
                  <span className="font-semibold">{(amt * rate).toFixed(2)} {to.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold mb-4 text-slate-900">Historical Rates (1 Year)</h2>
          <div className="h-[400px] w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {historicalData ? <HistoricalChart data={historicalData} /> : <div className="h-full flex items-center justify-center text-slate-400">Chart data temporarily unavailable.</div>}
          </div>
        </div>
      </div>

      {/* Visible FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-2 text-slate-900">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold mb-6 text-slate-900">Related Currency Pairs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CURRENCIES.filter(c => c.code !== from.code && c.code !== to.code).slice(0, 8).map(c => (
            <Link key={c.code} href={`/convert/${from.code}-to-${c.code}`} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-all">
              <CurrencyFlag code={from.code} className="!w-6 !h-4" />
              <span className="text-slate-300">→</span>
              <CurrencyFlag code={c.code} className="!w-6 !h-4" />
              <span className="ml-auto font-semibold text-slate-900 text-sm">{from.code}/{c.code}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}