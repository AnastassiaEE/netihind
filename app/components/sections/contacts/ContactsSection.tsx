import ContactCards from '@/components/ui/contacts/ContactCards';
import SectionLayout from '@/layouts/SectionLayout';
import { email, phone } from '@/data/contacts';
import ContactForm from '@/components/ui/form/ContactForm';
import { i18n } from 'i18next';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';

export default function ContactsSection({ i18n }: { i18n: i18n }) {
    const contacts: {
        type: 'email' | 'phone' | 'address';
        data: { title: string; description: string; contact: string };
    }[] = [
            {
                type: 'email',
                data: {
                    title: i18n.t('cards.email.title'),
                    description: i18n.t('cards.email.description'),
                    contact: email,
                },
            },
            {
                type: 'phone',
                data: {
                    title: i18n.t('cards.phone.title'),
                    description: i18n.t('cards.phone.description'),
                    contact: phone,
                },
            },
        ];
    return (
        <SectionLayout>
            <H1>{i18n.t('title')}</H1>
            <div className="lg:flex justify-between items-center">
                <div className="lg:w-6/12 max-lg:mb-24">
                    <ContactCards contacts={contacts} i18n={i18n} />
                </div>
                <div className="lg:w-5/12 bg-neutral-light px-7 md:px-12 py-9 rounded-lg">
                    <H2>{i18n.t('form-title')}</H2>
                    <ContactForm />
                </div>
            </div>
        </SectionLayout>
    );
}
