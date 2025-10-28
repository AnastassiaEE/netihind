import '@/app/globals.css';
import { Manrope } from 'next/font/google';
import ScrollTopButton from '@/components/ui/buttons/ScrollTopButton';
import { routing } from 'i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CookiesModal from '@/components/ui/cookies/CookiesModal';
import GoogleAnalytics from '@/components/tracking/GoogleAnalytics';
import { ConsentProvider } from '@/context/ConsentContext';
import { metadataBaseUrl } from '@/app/shared-metadata';
import { NonceProvider } from '@/context/NonceContext';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  metadataBase: metadataBaseUrl,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const nonce = (await headers()).get('x-nonce') ?? ' ';

  return (
    <html lang={locale}>
      <body className={`${manrope.className} relative`}>
        <NextIntlClientProvider timeZone={timeZone}>
          <AppRouterCacheProvider
            options={{
              enableCssLayer: true,
              key: 'mui',
              nonce: nonce,
              prepend: true,
            }}
          >
            <ScrollTopButton />
            <ConsentProvider>
              <NonceProvider nonce={nonce}>
                <GoogleAnalytics
                  ga_measurement_id={
                    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string
                  }
                />
              </NonceProvider>
              <CookiesModal />
            </ConsentProvider>
            <NonceProvider nonce={nonce}>{children}</NonceProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
