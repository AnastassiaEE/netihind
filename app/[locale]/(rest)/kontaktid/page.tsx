import initTranslations from '@/i18n/i18n';
import ContactsSection from '@/components/sections/contacts/ContactsSection';
import TranslationProvider from '@/i18n/TranslationProvider';

const i18Namespaces = ['contacts', 'form'];

export default async function Contacts({ params: { locale } }: { params: { locale: string } }) {
    const { i18n, resources } = await initTranslations(locale, ['contacts', 'form']);
    return (
        <TranslationProvider locale={locale} namespaces={i18Namespaces} resources={resources}>
            <ContactsSection i18n={i18n} />
        </TranslationProvider>
    );
}
