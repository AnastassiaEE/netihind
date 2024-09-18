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
                <NavigationItem href="/blog" isActive={pathname === `${localePrefix}/blog`}>
                    {t('blog')}
                </NavigationItem>
                <NavigationItem href="/about" isActive={pathname === `${localePrefix}/about`}>
                    {t('about-us')}
                </NavigationItem>
                <NavigationItem href="/contacts" isActive={pathname === `${localePrefix}/contacts`}>
                    {t('contacts')}
                </NavigationItem>
            </Navigation>
            <LanguageSwitcher />
        </div>
    );
}
