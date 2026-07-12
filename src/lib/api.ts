const FRANKFURTER_URL = 'https://api.frankfurter.app';
const OPEN_ER_API_URL = 'https://open.er-api.com/v6/latest';
const CRYPTO_MAP: Record<string, string> = { 
  BTC: 'bitcoin', ETH: 'ethereum', USDT: 'tether', BNB: 'binancecoin', 
  SOL: 'solana', XRP: 'ripple', ADA: 'cardano' 
};

export function isCrypto(code: string) { return !!CRYPTO_MAP[code.toUpperCase()]; }

export async function fetchLatestRates(from: string, to: string) {
  try {
    if (isCrypto(from) || isCrypto(to)) {
      const coingeckoId = isCrypto(from) ? CRYPTO_MAP[from] : CRYPTO_MAP[to];
      const fiat = isCrypto(from) ? to : from;
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=${fiat}`);
      if (!res.ok) return null;
      const data = await res.json();
      const rate = data[coingeckoId][fiat.toLowerCase()];
      return { rates: { [to]: isCrypto(from) ? rate : (1 / rate) } };
    }

    const res = await fetch(`${OPEN_ER_API_URL}/${from}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result !== 'success' || !data.rates || !data.rates[to]) return null;
    return { rates: { [to]: data.rates[to] } };
  } catch (error) {
    console.error(`Failed to fetch latest rates for ${from}-${to}:`, error);
    return null;
  }
}

export async function fetchHistoricalRates(from: string, to: string, days: number = 7) {
  try {
    if (isCrypto(from) || isCrypto(to)) {
      const coingeckoId = isCrypto(from) ? CRYPTO_MAP[from] : CRYPTO_MAP[to];
      const fiat = isCrypto(from) ? to : from;
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=${fiat.toLowerCase()}&days=${days}`);
      if (!res.ok) return null;
      const data = await res.json();
      
      // Format CoinGecko array data to match Frankfurter's object structure
      const rates: Record<string, any> = {};
      data.prices.forEach((item: [number, number]) => {
        const d = new Date(item[0]);
        const dateStr = d.toISOString().split('T')[0];
        rates[dateStr] = { [to]: item[1] };
      });
      return { rates };
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const format = (d: Date) => d.toISOString().split('T')[0];
    const res = await fetch(`${FRANKFURTER_URL}/${format(startDate)}..${format(endDate)}?from=${from}&to=${to}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch historical rates for ${from}-${to}:`, error);
    return null;
  }
}