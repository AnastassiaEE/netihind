'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import Language from './Language';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    
    const newLocale = (e.target as HTMLSpanElement).getAttribute('data-lang');

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
        router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <Language 
        lang="et" 
        current={currentLocale === 'et'}
        handleClick={handleClick}/>
      <Language 
        lang="ru"
        current={currentLocale === 'ru'} 
        handleClick={handleClick}/>
    </div>
   
  );
}