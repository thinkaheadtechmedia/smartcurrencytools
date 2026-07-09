import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Currency Tools | Live Exchange Rates & Currency Converter",
  description: "Convert 170+ world currencies with live exchange rates, historical charts, and rate alerts. Fast, accurate, and free currency conversion tools.",
  metadataBase: new URL("https://smartcurrencytools.com"),
  openGraph: {
    title: "Smart Currency Tools | Live Exchange Rates & Converter",
    description: "Convert 170+ world currencies with live exchange rates.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-gray-200 bg-white">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SmartCurrency<span className="text-gray-900">Tools</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600">Converter</Link>
              <Link href="/currencies" className="hover:text-blue-600">Currencies</Link>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
            </div>
          </nav>
        </header>
        
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} SmartCurrencyTools. Data provided by Frankfurter.app, updated hourly.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}