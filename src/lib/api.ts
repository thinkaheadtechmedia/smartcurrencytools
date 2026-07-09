const BASE_URL = 'https://api.frankfurter.app';

export async function fetchLatestRates(from: string, to: string) {
  const res = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`, {
    next: { revalidate: 3600 } // Cache for 1 hour (ISR)
  });
  if (!res.ok) throw new Error('Failed to fetch rates');
  return res.json();
}

export async function fetchHistoricalRates(from: string, to: string, days: number = 365) {
  const endDate = new Date();
  const startDate = new Date();
  // Fixed syntax error here:
  startDate.setDate(endDate.getDate() - days);
  
  const format = (d: Date) => d.toISOString().split('T')[0];
  const res = await fetch(`${BASE_URL}/${format(startDate)}..${format(endDate)}?from=${from}&to=${to}`, {
    next: { revalidate: 86400 } // Cache historical data for 24 hours
  });
  if (!res.ok) throw new Error('Failed to fetch historical data');
  return res.json();
}