'use client';

import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';

export default function BottomHeader() {
    const { t, i18n } = useTranslation('navigation');
    const locale = i18n.language;
    const localePrefix = locale === i18nConfig.defaultLocale ? '' : `/${locale}`;
    const pathname = usePathname();

    return (
        <div className="p-2 flex justify-between">
            <Navigation>
                <NavigationItem
                    className={pathname === `${localePrefix}/blog` ? 'text-primary' : ''}
                    href="/blog"
                >
                    {t('blog')}
                </NavigationItem>
                <NavigationItem
                    className={pathname === `${localePrefix}/about` ? 'text-primary' : ''}
                    href="/about"
                >
                    {t('about-us')}
                </NavigationItem>
                <NavigationItem
                    className={pathname === `${localePrefix}/contacts` ? 'text-primary' : ''}
                    href="/contacts"
                >
                    {t('contacts')}
                </NavigationItem>
            </Navigation>
            <LanguageSwitcher />
        </div>
    );
}
