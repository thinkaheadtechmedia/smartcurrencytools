import { CURRENCIES, getCurrency } from '@/lib/currencies';
import { fetchLatestRates, fetchHistoricalRates } from '@/lib/api';
import ConverterWidget from '@/components/ConverterWidget';
import HistoricalChart from '@/components/HistoricalChart';
import Link from 'next/link';

// Pre-generate the top 900 pairs at build time
export async function generateStaticParams() {
  const pairs = [];
  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from.code !== to.code) {
        pairs.push({ from: from.code, to: to.code, pair: `${from.code}-to-${to.code}` });
      }
    }
  }
  return pairs.map(p => ({ 'from-to': p.pair }));
}

export async function generateMetadata({ params }: { params: { 'from-to': string } }) {
  const [fromCode, , toCode] = params['from-to'].split('-');
  const from = getCurrency(fromCode);
  const to = getCurrency(toCode);
  
  if (!from || !to) return {};

  return {
    title: `${from.code} to ${to.code} Exchange Rate | Convert ${from.name} to ${to.name}`,
    description: `Live exchange rate for ${from.name} (${from.code}) to ${to.name} (${to.code}). Convert USD to EUR with real-time charts, historical data, and rate alerts. 1 ${from.code} = ? ${to.code}.`,
    alternates: {
      canonical: `https://smartcurrencytools.com/convert/${params['from-to']}`
    }
  };
}

export default async function PairPage({ params }: { params: { 'from-to': string } }) {
  const [fromCode, , toCode] = params['from-to'].split('-');
  const from = getCurrency(fromCode);
  const to = getCurrency(toCode);

  if (!from || !to) return <div>Invalid currency pair</div>;

  // Server-side fetch with ISR caching
  const latestData = await fetchLatestRates(from.code, to.code);
  const historicalData = await fetchHistoricalRates(from.code, to.code, 365);
  
  const rate = latestData.rates[to.code];

  // JSON-LD Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `How much is 100 ${from.code} in ${to.code}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `As of today, 100 ${from.code} is equivalent to ${(100 * rate).toFixed(2)} ${to.code}.`
      }
    }]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://smartcurrencytools.com" },
      { "@type": "ListItem", position: 2, name: "Convert", item: "https://smartcurrencytools.com/convert" },
      { "@type": "ListItem", position: 3, name: `${from.code} to ${to.code}`, item: `https://smartcurrencytools.com/convert/${params['from-to']}` }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link> &gt; <Link href="/convert">Convert</Link> &gt; {from.code} to {to.code}
      </nav>

      <h1 className="text-4xl font-bold mb-2">Convert {from.name} ({from.code}) to {to.name} ({to.code})</h1>
      <p className="text-lg text-gray-600 mb-8">Live exchange rate: 1 {from.code} = {rate.toFixed(4)} {to.code}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ConverterWidget 
            initialFrom={from.code} 
            initialTo={to.code} 
            initialRate={rate} 
          />
          
          {/* Common Conversions Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Common Conversions</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">{from.code}</th>
                  <th className="py-2">{to.code}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 5, 10, 50, 100, 500, 1000].map(amt => (
                  <tr key={amt} className="border-b">
                    <td className="py-2">{amt} {from.code}</td>
                    <td className="py-2">{(amt * rate).toFixed(2)} {to.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{from.code} to {to.code} Historical Rates (1 Year)</h2>
          <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow-sm border">
            <HistoricalChart data={historicalData} />
          </div>
        </div>
      </div>

      {/* Internal Linking */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Currency Pairs</h2>
        <div className="flex flex-wrap gap-2">
          {CURRENCIES.filter(c => c.code !== from.code).slice(0, 10).map(c => (
            <Link 
              key={c.code} 
              href={`/convert/${from.code}-to-${c.code}`}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              {from.code} to {c.code}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}