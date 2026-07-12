'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Client-side honeypot check
    if (data.company_name) return; 

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        const resData = await res.json();
        setError(resData.error || 'Failed to send message.');
      }
    } catch {
      setError('Network error occurred.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-8 rounded-2xl">
          <h2 className="font-display text-2xl font-bold mb-2">Message Sent!</h2>
          <p>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
      <p className="text-slate-600 mb-8">Have questions, feedback, or business inquiries? Send us a message using the form below.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Honeypot field (hidden from humans) */}
        <input type="text" name="company_name" className="hidden" tabIndex={-1} autoComplete="off" />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input name="name" required type="text" className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input name="email" required type="email" className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea name="message" required rows={5} className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}