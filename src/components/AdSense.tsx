'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function AdSense() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent === 'accepted') {
      setConsent(true);
    }

    // Listen for the moment the user clicks "Accept" in the banner
    const handleConsentUpdate = () => {
      if (localStorage.getItem('cookie-consent') === 'accepted') {
        setConsent(true);
      }
    };
    window.addEventListener('consentUpdated', handleConsentUpdate);

    return () => window.removeEventListener('consentUpdated', handleConsentUpdate);
  }, []);

  if (!consent) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1983675798905014"
      crossOrigin="anonymous"
    />
  );
}