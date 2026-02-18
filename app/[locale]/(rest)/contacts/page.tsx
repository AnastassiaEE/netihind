import { use } from 'react';
import ContactCards from '@/components/ui/contacts/ContactCards';
import ContactForm from '@/components/ui/form/forms/ContactForm';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';
import SectionLayout from '@/layouts/SectionLayout';
import { Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { contacts } from '@/data/contacts';
import {
  getMetadata,
  getOrganizationSchema,
  getSchema,
  getWebsiteSchema,
  openGraphLogo,
} from '@/utils/seoHelper';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return await getMetadata(
    t('contactsPage.title'),
    t('contactsPage.description'),
    'website',
    t('contactsPage.url'),
    t('website.title'),
    locale,
    [openGraphLogo],
  );
}

export default function Contacts(props: {
  params: Promise<{ locale: Locale }>;
}) {
  const params = use(props.params);

  const { locale } = params;

  setRequestLocale(locale);

  const tContacts = useTranslations('ContactsPage');
  const tSEO = useTranslations('SEO');

  const cardTypes = ['email', 'phone'] as const;

  const contactsList = cardTypes.map((type) => ({
    contactType: type,
    title: tContacts(`cards.${type}.title`),
    description: tContacts(`cards.${type}.description`),
    contact: contacts[type],
  }));

  const breadcrumbs = [
    { name: tSEO('breadcrumbs.home.name'), url: tSEO('homePage.url') },
    { name: tSEO('breadcrumbs.contacts.name'), url: tSEO('contactsPage.url') },
  ];

  const organizationGraphItem = getOrganizationSchema(tSEO);

  return (
    <>
      <JsonLd
        data={getSchema(
          tSEO('contactsPage.title'),
          tSEO('contactsPage.description'),
          tSEO('contactsPage.url'),
          breadcrumbs,
          getWebsiteSchema(tSEO, locale),
          locale,
          [organizationGraphItem],
        )}
      />
      <SectionLayout>
        <H1>{tContacts('title')}</H1>
        <div className="items-center justify-between lg:flex">
          <div className="space-y-3 max-lg:mb-24 lg:w-6/12">
            <ContactCards contacts={contactsList} />
          </div>
          <div className="bg-primary-light rounded-md px-7 py-9 shadow-md md:px-12 lg:w-5/12">
            <H2>{tContacts('formTitle')}</H2>
            <ContactForm />
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
