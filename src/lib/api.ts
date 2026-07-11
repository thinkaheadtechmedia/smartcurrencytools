const BASE_URL = 'https://api.frankfurter.app';

export async function fetchLatestRates(from: string, to: string) {
  try {
    const res = await fetch(`${BASE_URL}/latest?from=${from}&to=${to}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    console.log(`[API DEBUG] Fetched latest for ${from}-${to}:`, data); // <-- DEBUG LOG
    return data;
  } catch (error) {
    console.error(`Failed to fetch latest rates for ${from}-${to}:`, error);
    return null;
  }
}

export async function fetchHistoricalRates(from: string, to: string, days: number = 7) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    
    const format = (d: Date) => d.toISOString().split('T')[0];
    const res = await fetch(`${BASE_URL}/${format(startDate)}..${format(endDate)}?from=${from}&to=${to}`, {
      next: { revalidate: 86400 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch historical rates for ${from}-${to}:`, error);
    return null;
  }
}