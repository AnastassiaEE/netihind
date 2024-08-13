import QuestionsSection from "./components/sections/QuestionsSection";
import ContactsSection from "./components/sections/ContactsSection";
import StepsSection from "./components/sections/StepsSection";
import BlogSection from "./components/sections/BlogSection";
import InfoSection from "./components/sections/InfoSection";
import TopSection from "./components/sections/TopSection";
import PageLayout from './layouts/PageLayout';

export default function Page() {
  return (
    <PageLayout headerVariant="primary">
      <TopSection/>
      <InfoSection/>
      <StepsSection/>
      <QuestionsSection/>
      <BlogSection/>
      <ContactsSection/>
    </PageLayout>
  )
}
