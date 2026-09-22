import Link from 'next/link';
import { AlertTriangle, ShieldCheck, Scale, FileText } from 'lucide-react';

export const metadata = {
  title: 'Financial Disclaimer & Risk Notice | SmartCurrencyTools',
  description: 'Understand the non-advisory, informational nature of exchange rate data, currency tools, and financial articles on SmartCurrencyTools.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; Financial Disclaimer
      </nav>

      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          Consumer Notice
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Financial &amp; Legal Disclaimer
        </h1>
        <p className="text-lg text-slate-600">
          Clear, transparent disclosures regarding exchange rate data, calculations, third-party services, and investment risks.
        </p>
      </header>

      <div className="space-y-10 text-slate-700 leading-relaxed">
        {/* Core Non-Advisory Notice */}
        <section className="bg-amber-50 border border-amber-200 p-6 sm:p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <Scale className="w-8 h-8 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl font-bold text-amber-900 mb-2">
                Not Financial, Investment, or Tax Advice
              </h2>
              <p className="text-sm text-amber-900/90 leading-relaxed mb-3">
                SmartCurrencyTools is an independent online foreign exchange information publisher and software utility. We are <strong>not a registered investment advisor, broker-dealer, money service business (MSB), or licensed financial planner</strong>.
              </p>
              <p className="text-sm text-amber-900/90 leading-relaxed">
                Nothing published on this website—including live currency conversion figures, historical trend charts, volatility indicators, rate alerts, educational articles, or blog tutorials—should be interpreted as a recommendation, endorsement, solicitation, or offer to buy, sell, or hold any foreign currency, digital asset, or financial derivative.
              </p>
            </div>
          </div>
        </section>

        {/* Nature of Exchange Rate Data */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            1. Nature of Displayed Exchange Rates (Mid-Market Spot Rates)
          </h2>
          <p className="mb-3">
            All fiat currency rates presented on SmartCurrencyTools reflect the <strong>mid-market interbank spot exchange rate</strong>. The mid-market rate is the mathematical midpoint between the wholesale &quot;buy&quot; (bid) and &quot;sell&quot; (ask) prices traded between major international banks in multi-million-dollar volumes.
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-4 text-sm text-slate-600 space-y-2">
            <p><strong>Please note:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Retail consumers and small businesses almost never receive the mid-market rate from retail banks, credit card processors, or airport money kiosks.</li>
              <li>Banks and money transfer companies typically apply an exchange rate markup (spread) ranging from 0.5% to 5.0% above or below the mid-market rate, in addition to fixed transfer fees.</li>
              <li>Rates displayed on our site are indicative and intended for comparison and estimation purposes only.</li>
            </ul>
          </div>
        </section>

        {/* Market Risk and Volatility */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            2. Foreign Exchange and Cryptocurrency Market Risk
          </h2>
          <p className="mb-3">
            Foreign currency exchange rates and digital cryptocurrency assets are subject to rapid, unpredictable fluctuations caused by macroeconomic reports, central bank monetary policy adjustments, political events, trade tensions, and speculative market flows.
          </p>
          <p>
            Past performance and historical exchange rate data displayed on our charts do not guarantee, forecast, or predict future rate movements. You bear sole responsibility for any currency conversion, money transfer, or financial transaction you enter into with third-party providers.
          </p>
        </section>

        {/* Third-Party Service Providers */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            3. Third-Party Links &amp; Advertisements
          </h2>
          <p className="mb-3">
            SmartCurrencyTools displays third-party advertisements via Google AdSense and may feature links to independent financial institutions, money transfer services, or educational resources.
          </p>
          <p className="text-sm text-slate-600">
            We do not endorse, guarantee, or assume liability for the products, fee structures, transfer speeds, or security of any third-party service provider linked from our pages. Always review the terms, fee schedule, and privacy policy of third-party platforms before initiating transactions.
          </p>
        </section>

        {/* User Responsibility */}
        <section className="pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Questions Regarding Disclosures?</h2>
          <p className="text-sm text-slate-600 mb-4">
            If you have questions regarding our regulatory disclosures, please contact our compliance desk directly:
          </p>
          <p className="text-sm">
            Email: <a href="mailto:compliance@smartcurrencytools.com" className="text-emerald-600 font-medium hover:underline">compliance@smartcurrencytools.com</a>
          </p>
          <p className="text-sm mt-1">
            Read our <Link href="/methodology" className="text-emerald-600 font-medium hover:underline">Data Methodology</Link> and <Link href="/terms" className="text-emerald-600 font-medium hover:underline">Terms of Service</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
