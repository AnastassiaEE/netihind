export {};
import et from '@/messages/et.json';
import { routing } from '@/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof et;
    Locale: (typeof routing.locales)[number];
  }
}
