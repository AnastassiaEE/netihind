'use client';

import { usePathname, routing } from '@/i18n/routing';
import Language from './Language';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher({
  handleSidebarClose,
}: {
  handleSidebarClose?: Function;
}) {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleClick = () => {
    if (handleSidebarClose) handleSidebarClose();
  };

  return (
    <div className="flex items-center gap-4">
      {routing.locales.map((locale) => (
        <Language
          key={locale}
          href={pathname}
          locale={locale}
          current={currentLocale === locale}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
