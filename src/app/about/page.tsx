import Link from 'next/link';
import { ShieldCheck, Database, Award, Users, CheckCircle, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'About SmartCurrencyTools | Mission, Editorial Standards & Data Integrity',
  description: 'Learn about SmartCurrencyTools, our mission to bring transparency to global currency exchange, our editorial standards, and our reliable data sources.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; About Us
      </nav>

      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-block bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-100">
          Transparency in Foreign Exchange
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          About SmartCurrencyTools
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Empowering global travelers, expatriates, international freelancers, and cross-border businesses with real-time, unbiased foreign exchange data and transparent financial analytics.
        </p>
      </header>

      <div className="space-y-12 text-slate-700 leading-relaxed">
        {/* Mission Section */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            Our Mission
          </h2>
          <p className="mb-4">
            For decades, traditional financial institutions and high-street banks have operated in the shadows of the foreign exchange market. By advertising &quot;zero percent commission&quot; or &quot;fee-free international wire transfers,&quot; they conceal exorbitant 2% to 5% markups directly inside unfavorable exchange rates.
          </p>
          <p>
            SmartCurrencyTools was founded with a singular conviction: <strong>every consumer and business deserves complete transparency when exchanging currency.</strong> We believe access to accurate, institutional-grade exchange rate data is a fundamental financial right. We deliver real-time mid-market rates, historical volatility charting, and educational guides so you never overpay for an international money transfer again.
          </p>
        </section>

        {/* Core Pillars Grid */}
        <section className="grid sm:grid-cols-3 gap-6 my-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Database className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-display font-bold text-slate-900 mb-2">Central Bank Feeds</h3>
            <p className="text-sm text-slate-600">
              Direct institutional feeds synced hourly from the European Central Bank and official monetary authorities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-display font-bold text-slate-900 mb-2">Pure Mid-Market Rate</h3>
            <p className="text-sm text-slate-600">
              No hidden markups, no artificial spreads, and no commercial bias. What you see is the real interbank spot rate.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <TrendingUp className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-display font-bold text-slate-900 mb-2">Historical Analytics</h3>
            <p className="text-sm text-slate-600">
              Comprehensive 30-day to multi-year historical trend analysis to help you identify optimal conversion windows.
            </p>
          </div>
        </section>

        {/* Editorial Standards & Fact Checking */}
        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            Editorial Integrity &amp; Fact-Checking
          </h2>
          <p className="mb-4">
            Under Google&apos;s Search Quality Evaluator Guidelines for &quot;Your Money or Your Life&quot; (YMYL) content, we hold our articles, tutorials, and research guides to the highest standards of financial accuracy:
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Primary Sources Only:</strong> Our research relies directly on official reports from central banks (Federal Reserve, European Central Bank, Bank of England, Bank of Japan, Reserve Bank of Australia), the International Monetary Fund (IMF), and the Bank for International Settlements (BIS).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Strict Review &amp; Updates:</strong> Foreign exchange regulations, banking fees, and remittance products evolve rapidly. Our editorial team reviews and updates all financial guides quarterly to ensure ongoing accuracy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Independence &amp; Non-Advisory Nature:</strong> We do not offer personalized investment or forex trading advisory services. Our educational guides exist to inform consumers about market mechanics and consumer rights.</span>
            </li>
          </ul>
        </section>

        {/* Who We Are */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Our Editorial Team
          </h2>
          <p className="mb-6">
            The SmartCurrencyTools editorial and engineering team consists of financial software developers, macroeconomic researchers, and international business analysts with over a decade of combined experience in financial technologies, payment networks, and currency analysis.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900">FX &amp; Market Research Desk</div>
              <div className="text-xs text-emerald-600 font-medium mb-2">Macroeconomic Analysis</div>
              <p className="text-xs text-slate-500">
                Monitors central bank policy announcements, interest rate decisions, and currency volatility patterns to produce accessible educational breakdowns for consumers.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900">Data Engineering Desk</div>
              <div className="text-xs text-emerald-600 font-medium mb-2">Financial Systems &amp; APIs</div>
              <p className="text-xs text-slate-500">
                Ensures institutional-grade data ingestion, automated sanity checks, fast edge caching, and reliable mathematical precision across 170+ fiat and digital currencies.
              </p>
            </div>
          </div>
        </section>

        {/* Contact and Disclosures */}
        <section className="pt-8 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Get In Touch</h2>
          <p className="mb-4">
            Have a question about our methodology, spotted a data irregularity, or want to suggest a new currency tool? We welcome your feedback:
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <Link href="/contact" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
              Contact Form →
            </Link>
            <Link href="/methodology" className="inline-flex items-center text-slate-600 hover:text-slate-900">
              Read Data Methodology →
            </Link>
            <Link href="/disclaimer" className="inline-flex items-center text-slate-600 hover:text-slate-900">
              Financial Disclaimer →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}