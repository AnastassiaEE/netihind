'use client'

import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslation } from 'react-i18next';

export default function BottomHeader() {
    const { t } = useTranslation('navigation')

    return (
        <div className="p-2 flex justify-between">
            <Navigation>
                <NavigationItem href="/blog">{t('blog')}</NavigationItem>
                <NavigationItem href="/about">{t('about-us')}</NavigationItem>
                <NavigationItem href="/contacts">{t('contacts')}</NavigationItem>
            </Navigation>
            <LanguageSwitcher/>
        </div>
    )
}