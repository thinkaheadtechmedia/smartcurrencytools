import { MetadataRoute } from 'next';
import { CURRENCIES } from '@/lib/currencies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartcurrencytools.com';
  const routes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const currencyPages = CURRENCIES.map(c => ({
    url: `${baseUrl}/currencies/${c.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }));

  const pairPages = CURRENCIES.flatMap(from => 
    CURRENCIES.filter(to => to.code !== from.code).map(to => ({
      url: `${baseUrl}/convert/${from.code}-to-${to.code}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    }))
  );

  return [...routes, ...currencyPages, ...pairPages];
}