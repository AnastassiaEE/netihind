import QuestionsSection from "@/components/sections/home/QuestionsSection";
import ContactsSection from "@/components/sections/home/ContactsSection";
import StepsSection from "@/components/sections/home/StepsSection";
import SliderBlogSection from "@/components/sections/home/SliderBlogSection";
import InfoSection from "@/components/sections/home/InfoSection";
import TopSection from "@/components/sections/home/TopSection";

export default function Home() {
  return (
    <>
      <TopSection />
      <InfoSection />
      <StepsSection />
      <QuestionsSection />
      <SliderBlogSection />
      <ContactsSection />
    </>

  )
}
