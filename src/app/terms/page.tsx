import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SmartCurrencyTools',
  description: 'Review the Terms of Service and user agreement for SmartCurrencyTools, including our financial data disclaimers and limitations of liability.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; Terms of Service
      </nav>

      <header className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: January 15, 2026</p>
      </header>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
          <p>
            Welcome to SmartCurrencyTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website located at 
            smartcurrencytools.com and associated tools, widgets, rate alerts, and content (collectively, the &quot;Services&quot;), 
            you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Services.
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-amber-900">
          <h2 className="font-display text-xl font-bold mb-2 text-amber-900">2. Financial &amp; Investment Disclaimer (Non-Advisory Notice)</h2>
          <p className="text-sm leading-relaxed mb-3">
            <strong>SMARTCURRENCYTOOLS IS NOT A REGISTERED FINANCIAL ADVISOR, BROKER, OR MONEY TRANSMITTER.</strong>
          </p>
          <p className="text-sm leading-relaxed">
            All foreign exchange rates, conversion calculations, historical charts, financial articles, and currency analytics 
            provided on SmartCurrencyTools are presented strictly for informational and educational purposes only. Nothing on 
            this website constitutes financial, legal, tax, or investment advice. You must not rely on the information provided 
            as an alternative to financial advice from an appropriately certified financial services provider. Before executing 
            any foreign exchange transactions, international wire transfers, or currency trades, always consult with your bank 
            or a licensed financial professional.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">3. Exchange Rate Accuracy &amp; Data Availability</h2>
          <p>
            While we strive to ensure that all exchange rates and financial data displayed on SmartCurrencyTools are accurate, 
            reliable, and sourced from reputable financial institutions (such as the European Central Bank and central monetary authorities), 
            we make no warranties or representations of any kind, express or implied, regarding:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The completeness, accuracy, or timeliness of any exchange rate displayed.</li>
            <li>The suitability of rates for executing retail transactions, trading, or contractual settlements.</li>
            <li>Continuous, uninterrupted availability of our services or rate alert notifications.</li>
          </ul>
          <p className="mt-3">
            Foreign exchange markets are subject to rapid volatility. The rates shown on our website reflect indicative mid-market rates 
            and do not include the retail transaction fees, spreads, or markups that your bank or money transfer provider may charge.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">4. Acceptable Use of Services</h2>
          <p>You agree not to use the Services to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Engage in automated scraping, data harvesting, or continuous API bombardment without our prior written authorization.</li>
            <li>Transmit malicious code, viruses, or spam through our rate alert forms or contact channels.</li>
            <li>Circumvent or attempt to circumvent security controls or rate-limiting features.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any entity.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">5. Intellectual Property</h2>
          <p>
            The content, design, logo, user interface, software, text, graphics, and compilation of data on SmartCurrencyTools 
            are the property of SmartCurrencyTools and are protected by applicable copyright, trademark, and intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall SmartCurrencyTools, its directors, employees, 
            or partners be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your access to or use of, or inability to access or use, the Services.</li>
            <li>Any currency transaction losses, business delays, or missed financial opportunities based on data or alerts provided.</li>
            <li>Any bugs, viruses, or third-party advertisements encountered on the website.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">7. External Links &amp; Third-Party Advertisements</h2>
          <p>
            Our website may contain links to third-party websites or services (including advertising partners like Google AdSense) 
            that are not owned or controlled by SmartCurrencyTools. We have no control over, and assume no responsibility for, 
            the content, privacy policies, or practices of any third-party websites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">8. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of applicable jurisdictions, without regard 
            to its conflict of law provisions.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Contact Information</h2>
          <p>For inquiries regarding these Terms of Service, please reach out to:</p>
          <p className="mt-2 font-medium text-slate-900">SmartCurrencyTools Legal Team</p>
          <p>Email: <a href="mailto:legal@smartcurrencytools.com" className="text-emerald-600 hover:underline">legal@smartcurrencytools.com</a></p>
          <p>Website: <a href="https://smartcurrencytools.com" className="text-emerald-600 hover:underline">smartcurrencytools.com</a></p>
        </section>
      </div>
    </div>
  );
}