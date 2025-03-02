import ContactCards from '@/components/ui/contacts/ContactCards';
import ContactForm from '@/components/ui/form/forms/ContactForm';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';
import SectionLayout from '@/layouts/SectionLayout';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { contacts } from '@/data/contacts';

export default function Contacts({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    const t = useTranslations('ContactsPage');

    const contactsList = Object.keys(contacts).map((type) => ({
        contactType: type as 'email' | 'phone' | 'address',
        title: t(`cards.${type}.title`),
        description: t(`cards.${type}.description`),
        contact: contacts[type as keyof typeof contacts],
    }));

    return (
        <SectionLayout>
            <H1>{t('title')}</H1>
            <div className="items-center justify-between lg:flex">
                <div className="max-lg:mb-24 lg:w-6/12">
                    <ContactCards contacts={contactsList} />
                </div>
                <div className="rounded-lg bg-primary-light px-7 py-9 shadow-md md:px-12 lg:w-5/12">
                    <H2>{t('formTitle')}</H2>
                    <ContactForm />
                </div>
            </div>
        </SectionLayout>
    );
}
