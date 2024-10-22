import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import initTranslations from '@/i18n/i18n';
import TranslationsProvider from '@/i18n/TranslationProvider';

export const i18nNamespaces = ['home', 'not-found', 'form']

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { i18n, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
      <TopSectionPrimary i18n={i18n} />
      {/* <TopSectionSecondary /> */}
      {/* <InfoSection i18n={t} /> */}
      {/* <ProvidersLogoSection /> */}
      <StepsSection i18n={i18n} />
      <QuestionsSection i18n={i18n} />
      <SliderBlogSection i18n={i18n} />
      <ContactsSection i18n={i18n} />
    </TranslationsProvider>
  );
}
