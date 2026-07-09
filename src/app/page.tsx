import ConverterWidget from "@/components/ConverterWidget";
import { CURRENCIES } from "@/lib/currencies";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          Smart Currency Converter
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Check live foreign exchange rates, convert 170+ currencies, and view historical charts. Fast, accurate, and free.
        </p>
      </div>

      {/* Converter Widget */}
      <div className="max-w-md mx-auto">
        <ConverterWidget initialFrom="USD" initialTo="EUR" initialRate={0.92} />
      </div>

      {/* Trust Indicators */}
      <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live Rates
        </span>
        <span>•</span>
        <span>Updated Hourly</span>
        <span>•</span>
        <span>170+ Currencies</span>
      </div>

      {/* SEO Content & Internal Linking */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Currency Pairs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CURRENCIES.slice(0, 8).map((currency) => (
            <Link 
              key={currency.code} 
              href={`/convert/usd-to-${currency.code.toLowerCase()}`}
              className="p-4 bg-white border rounded-lg hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="text-sm font-semibold text-gray-900">USD to {currency.code}</div>
              <div className="text-xs text-gray-500">US Dollar to {currency.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}