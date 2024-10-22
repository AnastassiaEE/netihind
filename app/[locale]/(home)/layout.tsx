import MainFooter from '@/components/ui/footer/MainFooter';
import Header from '@/components/ui/header/Header';
import initTranslations from '@/i18n/i18n';
import TranslationProvider from '@/i18n/TranslationProvider';

const i18nNamespaces = ['navigation'];

export default async function Layout({
    params: { locale },
    children,
}: {
    params: { locale: string };
    children: React.ReactNode;
}) {
    const { resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <>
            <TranslationProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
                <Header variant="primary" />
            </TranslationProvider>
            <main>{children}</main>
            <TranslationProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
                <MainFooter />
            </TranslationProvider>
        </>
    );
}
