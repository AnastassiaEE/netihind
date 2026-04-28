import SectionLayout from '@/layouts/SectionLayout';
import ContactForm from '@/components/ui/form/forms/ContactForm';
import ContactLinks from '@/components/ui/contacts/ContactLinks';
import ContactLink from '@/components/ui/contacts/ContactLink';
import { contacts } from '@/data/contacts';
import { H2, H3 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';

export default function ContactsSection() {
  const t = useTranslations('HomePage.contactsSection');
  const { phone, email } = contacts;
  return (
    <SectionLayout className="py-24">
      <div className="md:flex md:items-center md:justify-between">
        <div className="max-md:mb-12 md:w-1/2">
          <div className="mb-20">
            <H2>{t('title')}</H2>
            <p className="text-lg">{t('description')}</p>
          </div>
          <div>
            <H3>{t('subtitle')}</H3>
            <ContactLinks>
              <ContactLink contactType="phone" contact={phone} />
              <ContactLink contactType="email" contact={email} />
            </ContactLinks>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-md p-6 shadow-md">
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
