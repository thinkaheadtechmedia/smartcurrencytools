import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | SmartCurrencyTools',
  description: 'Learn how SmartCurrencyTools collects, uses, and protects your data, including our cookie and Google AdSense advertising policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; Privacy Policy
      </nav>

      <header className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: January 15, 2026</p>
      </header>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">1. Introduction & Overview</h2>
          <p>
            At SmartCurrencyTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), accessible from smartcurrencytools.com, 
            protecting the privacy of our visitors is one of our top priorities. This Privacy Policy document outlines 
            the types of information that is collected and recorded by SmartCurrencyTools and how we utilize it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate 
            to contact us at <a href="mailto:privacy@smartcurrencytools.com" className="text-emerald-600 hover:underline">privacy@smartcurrencytools.com</a> or via our <Link href="/contact" className="text-emerald-600 hover:underline">Contact Page</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">2. Google AdSense & Advertising Cookies</h2>
          <p>
            SmartCurrencyTools is partnered with Google AdSense to display third-party advertisements when you visit our website. 
            Google and its advertising partners use cookies to serve ads based on your prior visits to our website or other websites on the internet.
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-4 space-y-3">
            <h3 className="font-semibold text-slate-900">Important Disclosures Regarding Google Advertising:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li>
                <strong>Third-party vendor cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to SmartCurrencyTools or other websites.
              </li>
              <li>
                <strong>Personalized advertising:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-out options:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">www.aboutads.info</a>.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">3. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you submit a query via our contact form, 
            sign up for currency rate alerts, or configure user preferences:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rate Alerts:</strong> When you subscribe to an exchange rate alert, we collect your email address, base currency, target currency, and target threshold. We use this strictly to deliver the requested notification.</li>
            <li><strong>Contact Submissions:</strong> If you contact us directly, we may receive additional information such as your name, email address, message contents, and attachments.</li>
            <li><strong>Log Files:</strong> Like most web applications, SmartCurrencyTools follows standard log file procedures. These files log internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to personally identifiable information.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">4. Cookies and Web Beacons</h2>
          <p>
            SmartCurrencyTools uses cookies to store information about visitors&apos; preferences, record user-specific information on which pages the visitor accesses, and customize web page content based on visitors&apos; browser type or other information.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">5. Google Analytics</h2>
          <p>
            We use Google Analytics to measure site traffic and engagement trends. Google Analytics collects information anonymously. It reports website trends without identifying individual visitors. You can opt out of Google Analytics without affecting how you visit our site by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">6. GDPR &amp; CCPA Privacy Rights</h2>
          <p>
            We respect the privacy rights of all users, including rights under the European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct inaccurate or incomplete data.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we delete your personal data under certain conditions.</li>
            <li><strong>The right to opt-out of data sale:</strong> We do not sell user personal information to any third parties.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">7. Children&apos;s Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. SmartCurrencyTools does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy periodically. We advise you to review this page periodically for any changes. Changes are effective immediately after they are posted on this page.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-2">Contact Us</h2>
          <p>If you have any questions or suggestions regarding our Privacy Policy, contact us at:</p>
          <p className="mt-2 font-medium text-slate-900">SmartCurrencyTools Compliance Team</p>
          <p>Email: <a href="mailto:privacy@smartcurrencytools.com" className="text-emerald-600 hover:underline">privacy@smartcurrencytools.com</a></p>
          <p>Website: <a href="https://smartcurrencytools.com" className="text-emerald-600 hover:underline">smartcurrencytools.com</a></p>
        </section>
      </div>
    </div>
  );
}