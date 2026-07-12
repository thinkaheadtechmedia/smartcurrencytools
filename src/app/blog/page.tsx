import { posts } from '@/lib/blog-data';
import { Pool } from 'pg';
import Link from 'next/link';

export const metadata = {
  title: 'SmartCurrency Blog | FX Guides & Market Insights',
  description: 'Guides, news, and insights on foreign exchange, mid-market rates, and global finance.',
};

export const revalidate = 3600; // Revalidate every hour to pick up new DB posts

export default async function BlogIndex() {
  let dbPosts: any[] = [];
  
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY date DESC');
    dbPosts = rows;
    await pool.end();
  }

  // Combine DB posts and static posts
  const allPosts = [
    ...dbPosts.map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: new Date(p.date).toLocaleDateString('en-CA'),
      author: 'SmartCurrencyTools Editorial Team',
      image: p.image_url,
      altText: p.alt_text
    })),
    ...posts
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-8">SmartCurrency Blog</h1>
      <p className="text-slate-600 mb-12">Guides, news, and insights on foreign exchange and global finance.</p>
      <div className="space-y-12">
        {allPosts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.altText} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 text-sm mb-3">{post.date} • {post.author}</p>
                <p className="text-slate-600">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}