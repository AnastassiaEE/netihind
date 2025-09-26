import MainFooter from '@/components/ui/footer/MainFooter';
import Header from '@/components/ui/header/Header';
import { TranslationsProvider } from '@/context/TranslationsContext';
import { getStringTranslations } from '@/lib/packagesDataFetch';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function Layout(props: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  setRequestLocale(locale as Locale);

  const translations = await getStringTranslations();

  return (
    <>
      <Header isSticky={false} />
      <TranslationsProvider rawTranslations={translations}>
        <main className="py-24">{children}</main>
      </TranslationsProvider>
      <MainFooter />
    </>
  );
}
