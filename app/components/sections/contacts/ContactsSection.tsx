'use client'

import ContactCard from '@/components/ui/contacts/ContactCard';
import ContactCards from '@/components/ui/contacts/ContactCards';
import SectionLayout from '@/layouts/SectionLayout';
import { email, phone } from '@/data/contacts';
import ContactForm from '@/components/ui/form/ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactsSection() {
    const { t } = useTranslation(['contacts']);
    const contacts: {
        contactType: 'email' | 'phone' | 'address';
        data: { title: string; description: string; contact: string };
    }[] = [
            {
                contactType: 'email',
                data: {
                    title: t('cards.card1.title'),
                    description: t('cards.card1.description'),
                    contact: email,
                },
            },
            {
                contactType: 'phone',
                data: {
                    title: t('cards.card2.title'),
                    description: t('cards.card2.description'),
                    contact: phone,
                },
            },
        ];
    return (
        <SectionLayout>
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{t('title')}</h1>
            <div className="lg:flex justify-between items-center">
                <div className="lg:w-6/12 max-lg:mb-24">
                    <ContactCards>
                        {contacts.map((contact) => {
                            return (
                                <ContactCard
                                    key={contact.contactType}
                                    contactType={contact.contactType}
                                    data={contact.data}
                                />
                            );
                        })}
                    </ContactCards>
                </div>
                <div className="lg:w-5/12 bg-neutral-light px-7 md:px-12 py-9 p rounded-lg">
                    <h2 className="text-[calc(1.325rem+0.9vw)] md:text-3xl font-extrabold mb-10">
                        {t('form-title')}
                    </h2>
                    <ContactForm />
                </div>
            </div>
        </SectionLayout>
    );
}
