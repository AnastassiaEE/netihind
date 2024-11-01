import ContactCards from '@/components/ui/contacts/ContactCards';
import ContactForm from '@/components/ui/form/ContactForm';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';
import { email, phone } from '@/data/contacts';
import SectionLayout from '@/layouts/SectionLayout';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function Contacts({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    const t = useTranslations('ContactsPage');
    const contacts: {
        type: 'email' | 'phone' | 'address';
        data: { title: string; description: string; contact: string };
    }[] = [
            {
                type: 'email',
                data: {
                    title: t('cards.email.title'),
                    description: t('cards.email.description'),
                    contact: email,
                },
            },
            {
                type: 'phone',
                data: {
                    title: t('cards.phone.title'),
                    description: t('cards.phone.description'),
                    contact: phone,
                },
            },
        ];
    return (
        <SectionLayout>
            <H1>{t('title')}</H1>
            <div className="lg:flex justify-between items-center">
                <div className="lg:w-6/12 max-lg:mb-24">
                    <ContactCards contacts={contacts} />
                </div>
                <div className="lg:w-5/12 bg-neutral-light px-7 md:px-12 py-9 rounded-lg">
                    <H2>{t('formTitle')}</H2>
                    <ContactForm />
                </div>
            </div>
        </SectionLayout>
    );
}
