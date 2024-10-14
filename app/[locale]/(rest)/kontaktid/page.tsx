import initTranslations from "@/app/i18n";
import ContactsSection from "@/components/sections/contacts/ContactsSection";

export default async function Contacts({ params: { locale } }: { params: { locale: string } }) {
    const { i18n } = await initTranslations(locale, ['contacts'])
    return <ContactsSection i18n={i18n} />
}