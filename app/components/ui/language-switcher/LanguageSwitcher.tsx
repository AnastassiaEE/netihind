'use client';

import { usePathname, routing } from '@/i18n/routing';
import Language from '@/components/ui/language-switcher/Language';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

export default function LanguageSwitcher({
  handleSidebarClose,
}: {
  handleSidebarClose?: Function;
}) {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const params = useParams();

  const handleClick = () => {
    if (handleSidebarClose) handleSidebarClose();
  };

  return (
    <div className="flex items-center gap-4">
      {routing.locales.map((locale) => (
        <Language
          key={locale}
          href={{
            pathname: pathname,
            params: params
          }}
          locale={locale}
          current={currentLocale === locale}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
