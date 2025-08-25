import { use } from 'react';
import ContactCards from '@/components/ui/contacts/ContactCards';
import ContactForm from '@/components/ui/form/forms/ContactForm';
import { H1, H2 } from '@/components/ui/headings/RestPageHeadings';
import SectionLayout from '@/layouts/SectionLayout';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { contacts } from '@/data/contacts';
import {
  metadataBaseUrl,
  openGraphLogo,
  organization,
  website,
} from '@/app/shared-metadata';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('contactsPage.name'),
    alternates: {
      canonical: t('contactsPage.url'),
    },
    openGraph: {
      title: t('contactsPage.name'),
      type: 'website',
      url: t('contactsPage.url'),
      site_name: t('website.name'),
      locale: locale,
      images: [openGraphLogo],
    },
  };
}

export default function Contacts(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = use(props.params);

  const { locale } = params;

  setRequestLocale(locale);

  const tContacts = useTranslations('ContactsPage');
  const tSEO = useTranslations('SEO');

  const contactsList = Object.keys(contacts).map((type) => ({
    contactType: type as 'email' | 'phone' | 'address',
    title: tContacts(`cards.${type}.title`),
    description: tContacts(`cards.${type}.description`),
    contact: contacts[type as keyof typeof contacts],
  }));

  const contactsPageUrl = new URL(
    tSEO('contactsPage.url'),
    metadataBaseUrl,
  ).toString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': contactsPageUrl,
        name: tSEO('aboutPage.name'),
        url: contactsPageUrl,
        inLanguage: locale,
        isPartOf: website(tSEO, locale),
      },
      organization(tSEO),
      {
        '@type': 'BreadcrumbList',
        '@id': `${contactsPageUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tSEO('breadcrumbs.home.name'),
            item: new URL(tSEO('homePage.url'), metadataBaseUrl).toString(),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tSEO('breadcrumbs.contacts.name'),
            item: contactsPageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionLayout>
        <H1>{tContacts('title')}</H1>
        <div className="items-center justify-between lg:flex">
          <div className="max-lg:mb-24 lg:w-6/12">
            <ContactCards contacts={contactsList} />
          </div>
          <div className="rounded-lg bg-primary-light px-7 py-9 shadow-md md:px-12 lg:w-5/12">
            <H2>{tContacts('formTitle')}</H2>
            <ContactForm />
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
