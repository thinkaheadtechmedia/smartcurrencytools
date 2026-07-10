import { CURRENCIES, getCurrency } from '@/lib/currencies';
import CurrencyFlag from '@/components/CurrencyFlag';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return CURRENCIES.map(c => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: { code: string } }) {
  const currency = getCurrency(params.code);
  if (!currency) return {};
  return {
    title: `${currency.name} (${currency.code}) Exchange Rates & Info`,
    description: `Learn about the ${currency.name} (${currency.code}) and check live exchange rates against major global currencies.`,
  };
}

export default function CurrencyPage({ params }: { params: { code: string } }) {
  const currency = getCurrency(params.code);
  if (!currency) return notFound();

  const otherCurrencies = CURRENCIES.filter(c => c.code !== currency.code).slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; <Link href="/currencies" className="hover:text-emerald-600">Currencies</Link> &gt; {currency.code}
      </nav>
      
      <div className="flex items-center gap-4 mb-8">
        <CurrencyFlag code={currency.code} className="!w-16 !h-12" />
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900">{currency.name} ({currency.code})</h1>
          <p className="text-slate-500">Currency Symbol: {currency.symbol}</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none mb-12">
        <p>The {currency.name} ({currency.code}) is the official currency of its respective nation. Use the tools below to check live conversion rates against other major global currencies.</p>
      </div>

      <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Popular {currency.code} Exchange Rates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherCurrencies.map(c => (
          <Link key={c.code} href={`/convert/${currency.code}-to-${c.code}`} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currency.flag}</span>
              <span className="text-slate-300">→</span>
              <span className="text-2xl">{c.flag}</span>
            </div>
            <span className="font-semibold text-slate-900">{currency.code} to {c.code}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}