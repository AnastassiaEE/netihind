'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import Language from './Language';
import { setCookie } from 'cookies-next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const etPath = '/et' + currentPathname.replace(`/${currentLocale}`, '');
  const ruPath = '/ru' + currentPathname.replace(`/${currentLocale}`, '');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newLocale = (e.target as HTMLAnchorElement).getAttribute('lang');

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <Language
        href={etPath}
        lang={'et'}
        current={currentLocale === 'et'}
        handleClick={handleClick}
      />
      <Language
        href={ruPath}
        lang={'ru'}
        current={currentLocale === 'ru'}
        handleClick={handleClick}
      />
    </div>
  );
}
