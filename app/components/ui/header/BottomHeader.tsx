'use client';

import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import getLocalePrefix from '@/utils/getLocalePrefix';

export default function BottomHeader() {
    const { t, i18n } = useTranslation('navigation');
    const localePrefix = getLocalePrefix(i18n.language, i18nConfig.defaultLocale);
    const pathname = usePathname();

    return (
        <div className="p-2 flex justify-between">
            <Navigation>
                <NavigationItem
                    href={`${localePrefix}/blog`}
                    isActive={pathname === `${localePrefix}/blog`}
                >
                    {t('blog')}
                </NavigationItem>
                <NavigationItem
                    href={`${localePrefix}/about`}
                    isActive={pathname === `${localePrefix}/about`}
                >
                    {t('about-us')}
                </NavigationItem>
                <NavigationItem
                    href={`${localePrefix}/contacts`}
                    isActive={pathname === `${localePrefix}/contacts`}
                >
                    {t('contacts')}
                </NavigationItem>
            </Navigation>
            <LanguageSwitcher />
        </div>
    );
}
