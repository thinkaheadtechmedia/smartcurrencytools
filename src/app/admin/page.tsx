'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Publishing...');
    
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, slug, title, excerpt, content, image_url: imageUrl, alt_text: altText })
    });
    
    const data = await res.json();
    if (res.ok) {
      setMessage('Article published successfully!');
      // Clear fields
      setSlug(''); setTitle(''); setExcerpt(''); setImageUrl(''); setAltText(''); setContent('');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-bold mb-8 text-slate-900">Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Admin Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (e.g., best-crypto-wallets)</label>
            <input type="text" required value={slug} onChange={e => setSlug(e.target.value)} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input type="text" disabled value="Auto-set to today" className="w-full p-3 border rounded-lg bg-slate-100 text-slate-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt (Short summary for blog list)</label>
          <textarea required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full p-3 border rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image URL</label>
            <input type="text" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image Alt Text (SEO Keyword)</label>
            <input type="text" required value={altText} onChange={e => setAltText(e.target.value)} className="w-full p-3 border rounded-lg" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Article Content (Paste HTML here)</label>
          <textarea required value={content} onChange={e => setContent(e.target.value)} rows={12} className="w-full p-3 border rounded-lg font-mono text-sm" placeholder="<h1>Title</h1><p>Content...</p>" />
        </div>

        {message && <p className="text-sm font-medium text-emerald-600">{message}</p>}

        <button type="submit" className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600">
          Publish Article
        </button>
      </form>
    </div>
  );
}