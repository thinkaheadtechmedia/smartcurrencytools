'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await fetch('/api/contact', { method: 'POST', body: formData });
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
      <p className="text-slate-600 mb-8">Have questions or feedback? Send us a message.</p>
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-6 rounded-xl">Thanks for reaching out! We'll get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div><label className="block text-sm font-medium mb-1">Name</label><input name="name" required type="text" className="w-full p-3 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-1">Email</label><input name="email" required type="email" className="w-full p-3 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium mb-1">Message</label><textarea name="message" required rows={4} className="w-full p-3 border rounded-lg"></textarea></div>
          <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800">Send Message</button>
        </form>
      )}
    </div>
  );
}