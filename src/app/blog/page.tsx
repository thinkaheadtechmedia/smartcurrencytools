import { posts } from '@/lib/blog-data';
import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-8">SmartCurrency Blog</h1>
      <p className="text-slate-600 mb-12">Guides, news, and insights on foreign exchange and global finance.</p>
      <div className="space-y-8">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">{post.title}</h2>
            <p className="text-slate-500 mb-3">{post.date}</p>
            <p className="text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}