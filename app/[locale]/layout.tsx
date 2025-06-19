import '@/app/globals.css';
import { Manrope } from 'next/font/google';
import ScrollTopButton from '@/components/ui/buttons/ScrollTopButton';
import { routing } from 'i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { headers } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { NonceProvider } from '@/context/NonceContext';
import CookiesModal from '@/components/ui/cookies/CookiesModal';
import GoogleAnalytics from '@/components/tracking/GoogleAnalytics';
import { ConsentProvider } from '@/context/ConsentContext';
import { metadataBaseUrl } from '@/app/shared-metadata';

const inter = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: metadataBaseUrl,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const messages = await getMessages();

  const nonce = headers().get('x-nonce') ?? ' ';

  return (
    <html lang={locale}>
      <body className={`${inter.className} relative`}>
        <NextIntlClientProvider timeZone={timeZone} messages={messages}>
          <AppRouterCacheProvider
            options={{
              key: 'mui',
              nonce: nonce,
              prepend: true,
            }}
          >
            <ScrollTopButton />
            <ConsentProvider>
              <GoogleAnalytics
                ga_measurement_id={
                  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string
                }
              />
              <CookiesModal />
            </ConsentProvider>
            <NonceProvider nonce={nonce}>{children}</NonceProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
