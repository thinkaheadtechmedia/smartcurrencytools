export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Basic HTML content
}

export const posts: BlogPost[] = [
  {
    slug: 'how-exchange-rates-work',
    title: 'How Exchange Rates Work: A Beginner\'s Guide',
    date: '2023-10-01',
    excerpt: 'Understand the basics of foreign exchange markets and what makes currency values fluctuate.',
    content: '<p>Exchange rates determine how much one currency is worth in relation to another. They are driven by supply and demand in the global forex market.</p><h2>Factors Influencing Rates</h2><p>Interest rates, inflation, and political stability all play massive roles. If you want to see live data, check out our <a href="/convert/USD-to-EUR">USD to EUR</a> converter.</p>'
  },
  {
    slug: 'best-time-to-exchange-usd-to-eur',
    title: 'Best Time to Exchange USD to EUR',
    date: '2023-10-05',
    excerpt: 'Timing the market is hard, but these tips can help you get the best rate.',
    content: '<p>The forex market is open 24/5. Generally, the highest liquidity is during the overlap of the London and New York sessions.</p><p>Track the live charts on our <a href="/convert/USD-to-EUR">USD to EUR page</a> before making a transfer.</p>'
  },
  {
    slug: 'mid-market-rate-vs-bank-rate',
    title: 'Mid-Market Rate vs Bank Rate: What\'s the Difference',
    date: '2023-10-10',
    excerpt: 'Banks often hide fees in bad exchange rates. Learn the difference to save money.',
    content: '<p>The mid-market rate is the real exchange rate. Banks add a spread to make a profit. Our tools always show the pure mid-market rate.</p>'
  },
  {
    slug: 'digital-nomad-currency-guide',
    title: 'Digital Nomad\'s Guide to Currency Conversion',
    date: '2023-10-15',
    excerpt: 'Managing multiple currencies while traveling? Here\'s what you need to know.',
    content: '<p>Always use a reliable converter to check rates. Avoid airport kiosks. Use our <a href="/convert/EUR-to-GBP">EUR to GBP</a> or <a href="/convert/USD-to-JPY">USD to JPY</a> tools on the go.</p>'
  },
  {
    slug: 'how-central-banks-move-exchange-rates',
    title: 'How Central Bank Decisions Move Exchange Rates',
    date: '2023-10-20',
    excerpt: 'The Fed, ECB, and BOJ have massive power over currency values.',
    content: '<p>When a central bank raises interest rates, its currency usually appreciates. Track the impacts on our <a href="/convert/GBP-to-USD">GBP to USD</a> page.</p>'
  }
];