import QuestionsSection from '@/components/sections/home/QuestionsSection';
import ContactsSection from '@/components/sections/home/ContactsSection';
import StepsSection from '@/components/sections/home/StepsSection';
import SliderBlogSection from '@/components/sections/home/SliderBlogSection';
import InfoSection from '@/components/sections/home/InfoSection';
import TopSectionSecondary from '@/components/sections/home/TopSectionSecondary';

export default function Home() {
  return (
    <>
      {/* <TopSectionPrimary /> */}
      <TopSectionSecondary />
      <InfoSection />
      <StepsSection />
      <QuestionsSection />
      <SliderBlogSection />
      <ContactsSection />
    </>
  );
}
