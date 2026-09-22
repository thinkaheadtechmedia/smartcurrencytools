import { CURRENCIES, getCurrency } from '@/lib/currencies';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CurrencyFlag from '@/components/CurrencyFlag';
import { Building2, Globe, Coins, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

export async function generateStaticParams() {
  return CURRENCIES.map(c => ({ code: c.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const currency = getCurrency(code);
  if (!currency) return {};
  return {
    title: `${currency.name} (${currency.code}) Exchange Rates, Profile & Converter | SmartCurrencyTools`,
    description: `Complete guide to ${currency.name} (${currency.code}). Central bank policies, subunit details, live cross rates, and conversion analysis against major world currencies.`,
  };
}

export default async function CurrencyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const currency = getCurrency(code);
  if (!currency) return notFound();

  const majorPartners = CURRENCIES.filter(c => c.code !== currency.code && !c.isCrypto).slice(0, 12);
  const conversionUnits = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

  const faqs = [
    {
      q: `What is the official currency code and symbol for ${currency.name}?`,
      a: `The official ISO 4217 currency code for the ${currency.name} is ${currency.code}, and its conventional currency symbol is ${currency.symbol}.`
    },
    {
      q: `Which authority or central bank issues the ${currency.code}?`,
      a: `The ${currency.name} is regulated and issued by ${currency.centralBank || 'its respective sovereign monetary authority'}.`
    },
    {
      q: `What is the subunit of ${currency.name}?`,
      a: `The standard fractional denomination or subunit of the ${currency.name} is ${currency.subUnit || 'standard decimal subunits'}.`
    },
    {
      q: `How do I convert ${currency.code} to other global currencies without hidden fees?`,
      a: `To get the true value of your ${currency.code}, always benchmark transactions against the mid-market rate. You can use our live currency converter tools to check real-time exchange rates before initiating a bank transfer.`
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://smartcurrencytools.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Currencies',
        item: 'https://smartcurrencytools.com/currencies'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${currency.name} (${currency.code})`,
        item: `https://smartcurrencytools.com/currencies/${currency.code.toLowerCase()}`
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
        <span>&gt;</span>
        <Link href="/currencies" className="hover:text-emerald-600 transition-colors">Currencies</Link>
        <span>&gt;</span>
        <span className="text-slate-900 font-medium">{currency.code}</span>
      </nav>
      
      {/* Header Profile Card */}
      <header className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <CurrencyFlag code={currency.code} className="!w-20 !h-14 shadow-sm rounded" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                  {currency.name}
                </h1>
                <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg text-sm border border-emerald-200">
                  {currency.code}
                </span>
              </div>
              <p className="text-slate-500 mt-1">
                Official Currency of {currency.country || 'International Commerce'}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-xl w-full sm:w-auto">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Currency Symbol</span>
            <span className="font-display text-3xl font-bold text-slate-900">{currency.symbol}</span>
          </div>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Issuing Authority</span>
              <span className="text-sm font-medium text-slate-800">{currency.centralBank || 'Monetary Authority'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Jurisdiction</span>
              <span className="text-sm font-medium text-slate-800">{currency.country || 'Global'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Coins className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Subunit / Fractions</span>
              <span className="text-sm font-medium text-slate-800">{currency.subUnit || 'Decimals'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* In-Depth Overview & Economic Analysis */}
      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-12 space-y-6 text-slate-700">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Economic Profile &amp; Role of {currency.name}
        </h2>
        <p className="text-base leading-relaxed">
          {currency.profile || `The ${currency.name} (${currency.code}) plays a crucial role in domestic finance and regional international commerce. Sourced directly from central monetary institutions, exchange rates for ${currency.code} reflect the real-time purchasing power and macroeconomic health of its domestic economy.`}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Exchange rates for the {currency.name} are influenced by key macroeconomic factors including central bank interest rate policy, national gross domestic product (GDP) performance, balance of trade, sovereign debt levels, and foreign direct investment (FDI). When transferring or exchanging {currency.code}, understanding these underlying fundamentals allows consumers and businesses to anticipate volatility and secure favorable timing.
        </p>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-slate-800">
              Need to convert {currency.code}? Always compare with the live mid-market rate.
            </span>
          </div>
          <Link href={`/convert/${currency.code}-to-USD`} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Convert to USD <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Currency Denominations Reference Table */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
          Quick {currency.code} Conversion Benchmark Units
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Common transaction multiples for {currency.name} ({currency.code}) used for budgeting, international remittances, and travel expenses.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {conversionUnits.map(unit => (
            <div key={unit} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs text-slate-400 block">{currency.code}</span>
              <span className="font-bold text-slate-900">{currency.symbol}{unit.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Trading & Exchange Pairs */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
          Popular {currency.code} Currency Exchange Pairs
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          Click any pair below to inspect real-time mid-market rates, historical trend charts, and transfer fee breakdowns.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {majorPartners.map(c => (
            <Link 
              key={c.code} 
              href={`/convert/${currency.code}-to-${c.code}`} 
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <CurrencyFlag code={currency.code} className="!w-8 !h-6" />
                <span className="text-slate-300 group-hover:text-emerald-500 transition-colors">→</span>
                <CurrencyFlag code={c.code} className="!w-8 !h-6" />
                <div className="text-left ml-1">
                  <div className="font-bold text-slate-900 text-sm">{currency.code} to {c.code}</div>
                  <div className="text-xs text-slate-400 truncate max-w-[120px]">{c.name}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Frequently Asked Questions about {currency.name}
          </h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
              <h3 className="font-semibold text-slate-900 mb-2 text-base">
                {faq.q}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}