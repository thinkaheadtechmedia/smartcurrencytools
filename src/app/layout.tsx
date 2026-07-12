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
          <AdSense />
        </header>
        
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-emerald-400">Converter</Link></li>
                <li><Link href="/currencies" className="hover:text-emerald-400">Currencies</Link></li>
              </ul>
            </div>
            <div>
                <h3 className="text-white font-display font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="hover:text-emerald-400">About</Link></li>
                  {/* Add this line: */}
                  <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
                </ul>
            </div>
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-emerald-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-display font-semibold mb-4">Data Source</h3>
              <p className="text-sm">Rates provided by Frankfurter.app. Updated hourly.</p>
            </div>
          </div>
        </footer>
          {/* Add these two lines right before the closing body tag */}
          <GoogleAnalytics />
          <CookieConsent />
      </body>
    </html>
  );
}