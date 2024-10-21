import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import initTranslations from '@/i18n/i18n';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { i18n } = await initTranslations(locale, ['home', 'not-found']);
  return (
    <>
      <TopSectionPrimary i18n={i18n} />
      {/* <TopSectionSecondary /> */}
      {/* <InfoSection i18n={t} /> */}
      {/* <ProvidersLogoSection /> */}
      <StepsSection i18n={i18n} />
      <QuestionsSection i18n={i18n} />
      <SliderBlogSection i18n={i18n} />
      <ContactsSection i18n={i18n} />
    </>
  );
}
