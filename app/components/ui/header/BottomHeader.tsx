'use client';
import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Suspense } from 'react';

export default function BottomHeader() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();

    return (
        <div className="flex justify-between p-2">
            <Navigation>
                <NavigationItem href="/blog" isActive={pathname === '/blog'}>
                    {t('blog')}
                </NavigationItem>
                <NavigationItem href="/about" isActive={pathname === '/about'}>
                    {t('about')}
                </NavigationItem>
                <NavigationItem href="/contacts" isActive={pathname === '/contacts'}>
                    {t('contacts')}
                </NavigationItem>
            </Navigation>
            <Suspense>
                <LanguageSwitcher />
            </Suspense>
        </div>
    );
}
