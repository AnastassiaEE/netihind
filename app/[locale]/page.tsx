import QuestionsSection from "@/components/sections/QuestionsSection";
import ContactsSection from "@/components/sections/ContactsSection";
import StepsSection from "@/components/sections/StepsSection";
import SliderBlogSection from "@/components/sections/SliderBlogSection";
import InfoSection from "@/components/sections/InfoSection";
import TopSection from "@/components/sections/TopSection";
import PageLayout from '@/layouts/PageLayout';
import initTranslations from '@/app/i18n';
import TranslationsProvider from "@/components/TranslationProvider";

const i18nNamespaces = ['top-section', 'info-section', 'address-form'];

export default async function Home({
  params: { locale } 
}: {
  params: { locale: string }
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <PageLayout headerVariant="primary" headerPosition="absolute">
        <TopSection/>
        <InfoSection/>
        <StepsSection/>
        <QuestionsSection/>
        <SliderBlogSection/>
        <ContactsSection/>
      </PageLayout>
    </TranslationsProvider>
  )
}
