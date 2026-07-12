import { MetadataRoute } from 'next';
import { CURRENCIES } from '@/lib/currencies';
import { posts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartcurrencytools.com';
  
  // 1. Static Routes
  const staticRoutes = [
    '', '/currencies', '/crypto', '/blog', '/about', '/contact', '/rate-alerts'
  ].map(r => ({
    url: `${baseUrl}${r}`, 
    lastModified: new Date(), 
    changeFrequency: 'weekly' as const, 
    priority: r === '' ? 1.0 : 0.8
  }));

  // 2. Individual Currency Pages
  const currencyPages = CURRENCIES.map(c => ({
    url: `${baseUrl}/currencies/${c.code.toLowerCase()}`, 
    lastModified: new Date(), 
    changeFrequency: 'daily' as const, 
    priority: 0.7
  }));

  // 3. Currency Pair Pages (10,000+ URLs)
  const pairPages = CURRENCIES.flatMap(from => 
    CURRENCIES.filter(to => to.code !== from.code).map(to => ({
      url: `${baseUrl}/convert/${from.code}-to-${to.code}`, 
      lastModified: new Date(), 
      changeFrequency: 'daily' as const, 
      priority: 0.9
    }))
  );

  // 4. Blog Post Pages
  const blogPages = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`, 
    lastModified: new Date(p.date), 
    changeFrequency: 'monthly' as const, 
    priority: 0.6
  }));

  return [...staticRoutes, ...currencyPages, ...pairPages, ...blogPages];
}