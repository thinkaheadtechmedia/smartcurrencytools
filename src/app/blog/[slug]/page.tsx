import { posts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "SmartCurrencyTools" }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; <Link href="/blog" className="hover:text-emerald-600">Blog</Link> &gt; {post.title}
      </nav>
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
      <p className="text-slate-500 mb-8">{post.date}</p>
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-12 pt-8 border-t">
        <Link href="/blog" className="text-emerald-600 hover:underline">← Back to all posts</Link>
      </div>
    </div>
  );
}