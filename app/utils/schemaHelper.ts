import { Image } from '@/types/schema.types';
import { TranslationFn } from '@/types/translation.types';
import { getPageUrl } from '@/utils/urlHelper';
import type { Locale } from 'next-intl';

// Base URL for generating absolute links in metadata
export const metadataBaseUrl = new URL('https://netihind.ee');

// Logo URL for Open Graph and schema
const logoUrl =
  'https://rxysmdetqttpdqfmrpym.supabase.co/storage/v1/object/public/website-logos//gradientmainlogo.png';

// Default Open Graph image (logo)
export const openGraphLogo: Image = {
  url: logoUrl,
  width: 1200,
  height: 630,
  alt: 'Netihind logo',
};

/**
 * Generates page metadata (for SEO, Open Graph, etc.)
 *
 * @param title - Page title
 * @param description - Page description
 * @param type - Open Graph type (e.g., 'website', 'article')
 * @param url - Page URL
 * @param websiteName - Website name
 * @param locale - Page locale (e.g., 'et', 'en')
 * @param images - Array of images for Open Graph
 * @param additional - Additional fields to include in the metadata object
 *
 * @returns Metadata object for the page
 */
export const getMetadata = async (
  title: string,
  description: string,
  type: string,
  url: string | URL,
  websiteName: string,
  locale: Locale,
  images: Image[] | undefined,
  additional?: Record<string, unknown>,
) => {
  const absoluteUrl = getPageUrl(url, metadataBaseUrl);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      type: type,
      url: absoluteUrl,
      site_name: websiteName,
      locale,
      images: images,
    },
    ...additional,
  };
};

/**
 * Generates structured data (JSON-LD) for a page
 *
 * @param title - Page title
 * @param description - Page description
 * @param url - Page URL
 * @param breadcrumbs - Array of breadcrumb items
 * @param isPartOf - Object representing parent entity (e.g., website)
 * @param locale - Page locale
 * @param extraGraphItems - Additional items to include in the `@graph` array
 *
 * @returns JSON-LD object for the page
 */
export const getSchema = (
  title: string,
  description: string,
  url: string | URL,
  breadcrumbs: {
    name: string;
    url: string | URL;
  }[],
  isPartOf: Record<string, unknown>,
  locale: Locale,
  extraGraphItems?: Record<string, unknown>[],
) => {
  const pageUrl = getPageUrl(url, metadataBaseUrl);

  return {
    '@context': 'https://schema.org' as const,
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: title,
        description: description,
        url: pageUrl,
        inLanguage: locale,
        isPartOf: isPartOf,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: getPageUrl(crumb.url, metadataBaseUrl),
        })),
      },
      ...(extraGraphItems || []),
    ],
  };
};

/**
 * Generates a JSON-LD schema for the website
 *
 * @param t - Translation function
 * @param locale - Website locale
 *
 * @returns JSON-LD object for the website
 */
export const getWebsiteSchema = (t: TranslationFn, locale: Locale) => {
  const websiteUrl = getPageUrl(t('website.url'), metadataBaseUrl);
  return {
    '@type': 'WebSite',
    '@id': `${websiteUrl}#website`,
    name: t('website.title'),
    description: t('website.description'),
    url: websiteUrl,
    inLanguage: locale,
  };
};

/**
 * Generates a JSON-LD schema for the organization
 *
 * @param t - Translation function
 * @returns JSON-LD object for the organization
 */
export const getOrganizationSchema = (t: TranslationFn) => {
  const websiteUrl = getPageUrl(t('website.url'), metadataBaseUrl);
  return {
    '@type': 'Organization',
    '@id': `${websiteUrl}#organization`,
    name: t('website.title'),
    url: websiteUrl,
    logo: logoUrl,
    sameAs: ['https://www.facebook.com/people/Netihind/61564967082896/'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+37255543735',
        contactType: 'customer service',
        email: 'info@netihind.ee',
        availableLanguage: ['Estonian', 'Russian'],
      },
    ],
  };
};

/**
 * Generates a JSON-LD schema for a blog article
 *
 * @param title - Article title
 * @param description - Article description
 * @param url - Article URL
 * @param datePublished - Date of publication (ISO string)
 * @param locale - Article locale
 *
 * @returns JSON-LD object for the article
 */
export const getPostSchema = (
  title: string,
  description: string,
  url: string | URL,
  datePublished: string,
  locale: Locale,
) => {
  const pageUrl = getPageUrl(url, metadataBaseUrl);
  return {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: title,
    description: description,
    url: pageUrl,
    inLanguage: locale,
    datePublished: datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
};
