const FRANKFURTER_URL = 'https://api.frankfurter.app';
const OPEN_ER_API_URL = 'https://open.er-api.com/v6/latest';

export async function fetchLatestRates(from: string, to: string) {
  try {
    // Using open.er-api.com because it supports 160+ currencies (including XOF, NGN, etc.) for free
    const res = await fetch(`${OPEN_ER_API_URL}/${from}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    
    const data = await res.json();
    
    if (data.result !== 'success' || !data.rates || !data.rates[to]) {
      console.error(`[API DEBUG] Currency ${to} not supported or API error.`);
      return null;
    }
    
    const rate = data.rates[to];
    console.log(`[API DEBUG] Fetched latest for ${from}-${to}:`, rate);
    
    // Return in the same shape as the old API so the frontend doesn't break
    return { rates: { [to]: rate } };
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
    const res = await fetch(`${FRANKFURTER_URL}/${format(startDate)}..${format(endDate)}?from=${from}&to=${to}`, {
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