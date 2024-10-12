import SectionLayout from '@/layouts/SectionLayout';
import ContactForm from '@/components/ui/form/ContactForm';
import ContactLinks from '@/components/ui/contacts/ContactLinks';
import ContactLink from '@/components/ui/contacts/ContactLink';
import { email, phone } from '@/data/contacts';
import { H2, H3 } from '@/components/ui/headings/HomePageHeadings';
import { i18n } from 'i18next';

export default function ContactsSection({ i18n }: { i18n: i18n }) {
    return (
        <SectionLayout className="py-24">
            <div className="md:flex md:justify-between md:items-center">
                <div className="md:w-1/2 max-md:mb-12">
                    <div className="mb-20">
                        <H2>{i18n.t('contacts-section.title')}</H2>
                        <p className="text-lg">{i18n.t('contacts-section.description')}</p>
                    </div>
                    <div>
                        <H3>{i18n.t('contacts-section.subtitle')}</H3>
                        <ContactLinks>
                            <ContactLink contactType="phone">{phone}</ContactLink>
                            <ContactLink contactType="email">{email}</ContactLink>
                        </ContactLinks>
                    </div>
                </div>
                <div className="md:w-1/3">
                    <div className="shadow-md rounded-lg p-6">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
