import React from 'react';

// Map currency codes to ISO 3166-1 alpha-2 country codes for the flag API
const currencyToCountry: Record<string, string> = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca',
  CHF: 'ch', CNY: 'cn', INR: 'in', NZD: 'nz', BRL: 'br', MXN: 'mx',
  ZAR: 'za', SGD: 'sg', HKD: 'hk'
  // Add more mappings as you expand your currency list
};

export default function CurrencyFlag({ code, className = '' }: { code: string; className?: string }) {
  const countryCode = currencyToCountry[code.toUpperCase()] || code.substring(0, 2).toLowerCase();
  
  return (
    <img 
      src={`https://flagcdn.com/w80/${countryCode}.png`}
      width={32}
      height={24}
      alt={`${code} flag`}
      className={`rounded-sm shadow-sm object-cover ${className}`}
    />
  );
}