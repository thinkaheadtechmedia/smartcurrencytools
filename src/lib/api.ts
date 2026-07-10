const BASE_URL = 'https://api.frankfurter.app';
const CRYPTO_MAP: Record<string, string> = { BTC: 'bitcoin', ETH: 'ethereum', USDT: 'tether', BNB: 'binancecoin', SOL: 'solana' };

export function isCrypto(code: string) { return !!CRYPTO_MAP[code.toUpperCase()]; }

export async function fetchLatestRates(from: string, to: string) {
  from = from.toUpperCase(); to = to.toUpperCase();
  
  if (isCrypto(from) || isCrypto(to)) {
    const coingeckoId = isCrypto(from) ? CRYPTO_MAP[from] : CRYPTO_MAP[to];
    const fiat = isCrypto(from) ? to : from;
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=${fiat}`);
    if (!res.ok) throw new Error('Failed to fetch crypto rates');
    const data = await res.json();
    const rate = data[coingeckoId][fiat.toLowerCase()];
    return { rates: { [to]: isCrypto(from) ? rate : (1 / rate) } };
  }

  const res = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch rates');
  return res.json();
}

export async function fetchHistoricalRates(from: string, to: string, days: number = 7) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  const format = (d: Date) => d.toISOString().split('T')[0];
  const res = await fetch(`${BASE_URL}/${format(startDate)}..${format(endDate)}?from=${from}&to=${to}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error('Failed to fetch historical data');
  return res.json();
}