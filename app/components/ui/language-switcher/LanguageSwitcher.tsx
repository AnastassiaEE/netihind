'use client';

import { usePathname, routing } from '@/i18n/routing';
import Language from '@/components/ui/language-switcher/Language';
import { useLocale } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const params = useParams();
  const searchParams = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams.entries());

  return (
    <div className="flex items-center gap-4">
      {routing.locales.map((locale) => (
        <Language
          key={locale}
          href={{
            pathname,
            params,
            query: searchParamsObject,
          }}
          locale={locale}
          current={currentLocale === locale}
        />
      ))}
    </div>
  );
}
