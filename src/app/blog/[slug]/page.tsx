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
  return { 
    title: post.title, 
    description: post.metaDescription,
    alternates: { canonical: `https://smartcurrencytools.com/blog/${post.slug}` }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": post.author }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link> &gt; <Link href="/blog" className="hover:text-emerald-600">Blog</Link> &gt; {post.title}
      </nav>
      
      <div className="aspect-video w-full bg-slate-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <img 
          src={post.image} 
          alt={post.altText} 
          className="w-full h-full object-cover"
        />
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/blog" className="text-emerald-600 hover:underline font-medium">← Back to all posts</Link>
      </div>
    </div>
  );
}