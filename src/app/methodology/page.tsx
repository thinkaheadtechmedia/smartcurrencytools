import Link from 'next/link';
import { Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Exchange Rate Methodology & Data Sourcing | SmartCurrencyTools',
  description: 'Understand how SmartCurrencyTools sources, validates, and calculates live foreign exchange rates, mid-market spot rates, and historical data.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; Data Methodology
      </nav>

      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-block bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-100">
          Algorithmic Rigor &amp; Precision
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Data Methodology &amp; Sourcing
        </h1>
        <p className="text-lg text-slate-600">
          A transparent look at where our exchange rates come from, how they are mathematically validated, and how we compute real-time conversions across 170+ global currencies.
        </p>
      </header>

      <div className="space-y-12 text-slate-700 leading-relaxed">
        {/* Step by Step Architecture */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            The Three-Tier Data Pipeline
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-display flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Institutional Sourcing &amp; Central Bank Benchmarks
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our primary fiat currency reference data is sourced directly from the European Central Bank (ECB) and synchronized international banking feeds. The ECB publishes daily reference rates based on regular daily concertation procedures between central banks across Europe, normally taking place around 14:15 CET.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-display flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Hourly Synchronization &amp; Validation Checks
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Currency quotes are polled hourly through robust edge endpoints. Before any rate is served to our calculation engine, our system executes algorithmic anomaly detection checks to prevent corrupted or anomalous spreads from entering the index.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-display flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  Mid-Market Rate Computation &amp; Cross-Rate Calculations
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For cross pairs where a direct market quote is illiquid or unavailable, exchange rates are computed via triangular arbitrage cross-rate formula: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-emerald-800">Rate(A → B) = Rate(EUR → B) / Rate(EUR → A)</code>. This ensures mathematically consistent rates without synthetic slippage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Market Definition */}
        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-600" />
            Understanding the Mid-Market Rate Formula
          </h2>
          <p className="mb-4">
            In global foreign exchange trading, two quotes exist at any given moment:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 mb-4">
            <li><strong>Bid Price:</strong> The highest price a buyer is currently willing to pay for a currency.</li>
            <li><strong>Ask Price:</strong> The lowest price a seller is currently willing to accept for that currency.</li>
          </ul>
          <p className="mb-4">
            The <strong>Mid-Market Rate</strong> is calculated as:
          </p>
          <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 text-center font-semibold mb-4">
            Mid-Market Rate = (Bid Price + Ask Price) / 2
          </div>
          <p className="text-sm text-slate-600">
            Because this rate has zero retail spread built into it, it represents the purest reflection of real market value. When you use SmartCurrencyTools to convert currencies, you are viewing this exact benchmark, giving you the power to see exactly how much mark-up retail banks are adding to your transfers.
          </p>
        </section>

        {/* Rounding and Precision */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            Rounding, Precision, &amp; Significant Digits
          </h2>
          <p className="mb-3">
            In retail banking, figures are often rounded prematurely to two decimal places, which can distort conversion calculations on large sums. At SmartCurrencyTools:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Internal Math:</strong> Calculations maintain full IEEE-754 64-bit floating point precision throughout the pipeline.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Display Convention:</strong> Major currency rates are rendered to 4 or 5 decimal places (e.g., 1 EUR = 1.0842 USD) to accurately capture interbank pips.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>High-Denomination Currencies:</strong> Currencies with high unit counts (e.g., JPY, KRW, VND, IDR) are formatted to 2 decimal places to match standard economic display conventions.</span>
            </li>
          </ul>
        </section>

        {/* Contact Desk */}
        <section className="pt-8 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Questions or Inquiries?</h2>
          <p className="text-sm text-slate-600 mb-4">
            If you represent a financial institution, academic research group, or developer team seeking additional details regarding our data models, reach out:
          </p>
          <p className="text-sm font-medium">
            Email: <a href="mailto:data@smartcurrencytools.com" className="text-emerald-600 hover:underline">data@smartcurrencytools.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
