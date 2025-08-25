'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useConsentContext } from '@/context/ConsentContext';
import Script from 'next/script';

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
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', ga_measurement_id, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (window.gtag) {
      const statisticsConsent = consent.statistics ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        analytics_storage: statisticsConsent,
      });
    }
  }, [consent]);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga_measurement_id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });

                gtag('config', '${ga_measurement_id}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
}
