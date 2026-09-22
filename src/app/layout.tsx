import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import AdSense from '@/components/AdSense';


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Smart Currency Tools | Live Exchange Rates & Converter",
  description: "Convert 170+ world currencies with live exchange rates, historical charts, and rate alerts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined') {
                    var currentFetch = window.fetch;
                    try {
                      Object.defineProperty(window, 'fetch', {
                        configurable: true,
                        enumerable: true,
                        get: function() { return currentFetch; },
                        set: function(fn) { currentFetch = fn; }
                      });
                    } catch (e1) {
                      try {
                        if (typeof Window !== 'undefined' && Window.prototype) {
                          Object.defineProperty(Window.prototype, 'fetch', {
                            configurable: true,
                            enumerable: true,
                            get: function() { return currentFetch; },
                            set: function(fn) { currentFetch = fn; }
                          });
                        }
                      } catch (e2) {}
                    }

                    window.addEventListener('error', function(event) {
                      if (event && event.message && event.message.indexOf('fetch') !== -1 && event.message.indexOf('getter') !== -1) {
                        event.preventDefault();
                      }
                    });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-bold tracking-tight text-slate-900">
              Smart<span className="text-emerald-500">Currency</span>
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                <Link href="/" className="hover:text-emerald-500 transition-colors">Converter</Link>
                <Link href="/currencies" className="hover:text-emerald-500 transition-colors">Currencies</Link>
                <Link href="/crypto" className="hover:text-emerald-500 transition-colors">Crypto</Link>
                <Link href="/blog" className="hover:text-emerald-500 transition-colors">Blog</Link>
                <Link href="/rate-alerts" className="hover:text-emerald-500 transition-colors">Rate Alerts</Link>
                {/* Add this line: */}
                <Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>
            </div>
          </nav>
        </header>
        
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

        <footer className="bg-slate-950 text-slate-400 py-16 mt-24 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Currency Tools</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/" className="hover:text-emerald-400 transition-colors">Currency Converter</Link></li>
                  <li><Link href="/currencies" className="hover:text-emerald-400 transition-colors">World Currencies Index</Link></li>
                  <li><Link href="/crypto" className="hover:text-emerald-400 transition-colors">Cryptocurrency Tracker</Link></li>
                  <li><Link href="/rate-alerts" className="hover:text-emerald-400 transition-colors">Rate Alerts</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Company &amp; Editorial</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us &amp; Team</Link></li>
                  <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Fx Market Guides</Link></li>
                  <li><Link href="/methodology" className="hover:text-emerald-400 transition-colors">Data Methodology</Link></li>
                  <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Legal &amp; Compliance</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">Financial Disclaimer</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-display font-semibold mb-4 text-sm uppercase tracking-wider">Market Data Benchmark</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Benchmark foreign exchange rates synchronized hourly against European Central Bank (ECB) concertation data and interbank market quotes.
                </p>
                <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Hourly Live Sync Active
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>
                © {new Date().getFullYear()} SmartCurrencyTools. All rights reserved. Mid-market rates are indicative benchmarks for informational purposes only.
              </p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
                <Link href="/disclaimer" className="hover:text-slate-400 transition-colors">Disclaimer</Link>
                <Link href="/methodology" className="hover:text-slate-400 transition-colors">Methodology</Link>
              </div>
            </div>
          </div>
        </footer>
          {/* Analytics, Ads, and Consent */}
          <AdSense />
          <GoogleAnalytics />
          <CookieConsent />
      </body>
    </html>
  );
}