import { CURRENCIES } from '@/lib/currencies';
import Link from 'next/link';
import CurrencyFlag from '@/components/CurrencyFlag';

export const metadata = {
  title: 'Cryptocurrency Exchange Rates | Live Crypto Prices',
  description: 'Convert Bitcoin, Ethereum, Solana and other major cryptocurrencies to fiat currencies like USD, EUR, and GBP.',
};

export default function CryptoHub() {
  const cryptos = CURRENCIES.filter(c => c.isCrypto);
  const majorFiats = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Cryptocurrency Exchange Rates</h1>
        <p className="text-slate-600 max-w-2xl">Check live cryptocurrency prices and convert major digital assets like Bitcoin and Ethereum into fiat currencies.</p>
      </div>

      <div className="space-y-8">
        {cryptos.map(crypto => (
          <div key={crypto.code} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CurrencyFlag code={crypto.code} className="!w-10 !h-10" />
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">{crypto.name} ({crypto.code})</h2>
                <p className="text-sm text-slate-500">Live conversion rates</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {majorFiats.map(fiat => (
                <Link 
                  key={fiat} 
                  href={`/convert/${crypto.code}-to-${fiat}`}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-500 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-2">
                    <CurrencyFlag code={fiat} className="!w-6 !h-4" />
                    <span className="font-semibold text-slate-900 text-sm">{fiat}</span>
                  </div>
                  <span className="text-slate-400 group-hover:text-emerald-500">→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}