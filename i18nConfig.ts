import { Config } from 'next-i18n-router/dist/types';

const i18nConfig: Config = {
  locales: ['et', 'ru'],
  defaultLocale: 'et',
  serverSetCookie: 'never',
};

export default i18nConfig;
