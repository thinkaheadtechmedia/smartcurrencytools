'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
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
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-03PT1S3TVZ`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-03PT1S3TVZ');
        `}
      </Script>
    </>
  );
}