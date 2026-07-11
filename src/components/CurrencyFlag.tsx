import React from 'react';

const currencyToCountry: Record<string, string> = {
  USD: 'us', EUR: 'eu', GBP: 'gb', JPY: 'jp', AUD: 'au', CAD: 'ca',
  CHF: 'ch', CNY: 'cn', INR: 'in', NZD: 'nz', SGD: 'sg', HKD: 'hk',
  SEK: 'se', NOK: 'no', DKK: 'dk', ZAR: 'za', MXN: 'mx', BRL: 'br',
  RUB: 'ru', KRW: 'kr', TRY: 'tr', PLN: 'pl', THB: 'th', IDR: 'id',
  MYR: 'my', PHP: 'ph', VND: 'vn', AED: 'ae', SAR: 'sa', ILS: 'il',
  EGP: 'eg', NGN: 'ng', KES: 'ke', GHS: 'gh', PKR: 'pk', BDT: 'bd',
  CZK: 'cz', HUF: 'hu', RON: 'ro', CLP: 'cl', XOF: 'sn', XAF: 'cf'
};

const cryptoIcons: Record<string, string> = {
  BTC: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  ETH: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  USDT: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  BNB: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  SOL: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
};

export default function CurrencyFlag({ code, className = '' }: { code: string; className?: string }) {
  const upperCode = code.toUpperCase();
  
  if (cryptoIcons[upperCode]) {
    return (
      <img 
        src={cryptoIcons[upperCode]}
        width={32}
        height={32}
        alt={`${upperCode} icon`}
        className={`rounded-full shadow-sm object-cover ${className}`}
      />
    );
  }

  const countryCode = currencyToCountry[upperCode] || upperCode.substring(0, 2).toLowerCase();
  
  return (
    <img 
      src={`https://flagcdn.com/w80/${countryCode}.png`}
      width={32}
      height={24}
      alt={`${upperCode} flag`}
      className={`rounded-sm shadow-sm object-cover ${className}`}
    />
  );
}