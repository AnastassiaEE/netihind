import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';
import ProvidersLogoSection from '@/components/sections/home/ProvidersLogoSection';
import TopSectionPrimary from '@/components/sections/home/TopSectionPrimary';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <>
      <TopSectionPrimary />
      {/* <TopSectionSecondary /> */}
      {/* <InfoSection i18n={t} /> */}
      {/* <ProvidersLogoSection /> */}
      <StepsSection />
      <QuestionsSection />
      <SliderBlogSection />
      <ContactsSection />
    </>
  );
}
