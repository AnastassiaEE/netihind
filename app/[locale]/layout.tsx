import '@/app/globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import ScrollTopButton from '@/components/ui/buttons/ScrollTopButton';
import { routing } from 'i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
//import CookieConsent from '@/components/ui/cookies/CookieConsent';
import { headers } from 'next/headers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { NonceProvider } from '@/context/NonceContext';

const inter = Manrope({ subsets: ['latin'] });

export const metadataBaseUrl = new URL('https://netihind.ee');

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
  const messages = await getMessages();

  const nonce = headers().get('x-nonce') ?? '';

  return (
    <html lang={locale}>
      <body className={`${inter.className} relative`}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider
            options={{
              key: 'mui',
              nonce: nonce,
              prepend: true,
            }}
          >
            <NonceProvider nonce={nonce}>
              <ScrollTopButton />
              {children}
            </NonceProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
