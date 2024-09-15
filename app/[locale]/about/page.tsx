import initTranslations from "@/app/i18n";
import AboutSection from "@/components/sections/AboutSection";
import TranslationsProvider from "@/components/TranslationProvider";
import PageLayout from "@/layouts/PageLayout";

const i18nNamespaces = ['about', 'navigation', 'form'];

export default async function About({
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
            <PageLayout>
                <AboutSection locale={locale}/>
            </PageLayout>
        </TranslationsProvider>
    )
}