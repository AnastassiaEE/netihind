'use client';

import { useEffect } from 'react';
import { useConsentContext } from '@/context/ConsentContext';
import Script from 'next/script';
import { useNonceContext } from '@/context/NonceContext';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export default function GoogleAnalytics({
  ga_measurement_id,
}: {
  ga_measurement_id: string;
}) {
  const { consent } = useConsentContext();
  const nonce = useNonceContext();

  useEffect(() => {
    if (window.dataLayer) {
      const statisticsConsent = consent.statistics ? 'granted' : 'denied';
      window.dataLayer.push({
        event: 'consent_update',
        consent: { analytics_storage: statisticsConsent },
      });
    }
  }, [consent]);

  if (process.env.NODE_ENV === 'development') return null;

  return (
    <>
      <Script
        id="gtm-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'consent_default',
              consent: { analytics_storage: 'denied' }
            });
          `,
        }}
        nonce={nonce}
      />

      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${ga_measurement_id}');
          `,
        }}
        nonce={nonce}
      />

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${ga_measurement_id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
