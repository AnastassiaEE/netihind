import '@/app/globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import ScrollTopButton from '@/components/ui/buttons/ScrollTopButton';
import { routing } from 'i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import CookieConsent from '@/components/ui/cookies/CookieConsent';

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

  return (
    <html lang={locale}>
      <body className={`${inter.className} relative`}>
        <NextIntlClientProvider messages={messages}>
          <ScrollTopButton />
          <CookieConsent />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
