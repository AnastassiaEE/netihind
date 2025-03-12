import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['et', 'ru'],
  defaultLocale: 'et',
  localePrefix: 'as-needed',
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/about': {
      et: '/meist',
      ru: '/o-nas',
    },
    '/address': {
      et: '/aadress',
      ru: '/adres',
    },
    '/address/[slug]': {
      et: '/aadress/[slug]',
      ru: '/adres/[slug]',
    },
    '/blog': {
      et: '/blogi',
      ru: '/blog',
    },
    '/blog/[slug]': {
      et: '/blogi/[slug]',
      ru: '/blog/[slug]',
    },
    '/contacts': {
      et: '/kontaktid',
      ru: '/kontakty',
    },
    '/policy': {
      et: '/kasutustingimused',
      ru: '/usloviya-ispolzovaniya',
    },
    '/providers': {
      et: '/pakkujad',
      ru: '/provajdery',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
