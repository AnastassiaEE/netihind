import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/slider-blog-section/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import initTranslations from '@/app/i18n';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ['home']);
  return (
    <>
      <TopSectionPrimary t={t} />
      {/* <TopSectionSecondary /> */}
      {/* <InfoSection t={t} /> */}
      {/* <ProvidersLogoSection /> */}
      <StepsSection t={t} />
      <QuestionsSection t={t} />
      <SliderBlogSection locale={locale} />
      <ContactsSection />
    </>
  );
}
