'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    // Tell the GoogleAnalytics component to start loading
    window.dispatchEvent(new Event('consentUpdated'));
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 shadow-2xl border-t border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300 flex-1">
          We use cookies to understand how you use our site and to improve your experience. This includes analytics tracking. By clicking "Accept", you consent to the use of cookies.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={handleDecline} className="px-4 py-2 text-sm font-semibold text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors">
            Decline
          </button>
          <button onClick={handleAccept} className="px-4 py-2 text-sm font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}