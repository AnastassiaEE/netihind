'use client';
import CloseIcon from '@mui/icons-material/Close';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import Sidebar from '@/components/ui/modal/Sidebar';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';
import { Suspense } from 'react';

export default function SidebarMenu() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const { isSidebarMenuOpened, closeSidebarMenu, sidebarMenuRef } = useSidebarMenuContext();

    const handleLinkClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLLinkElement;
        if (target.tagName === 'A') {
            closeSidebarMenu();
        }
    };

    return (
        <Sidebar isOpened={isSidebarMenuOpened} ref={sidebarMenuRef}>
            <div className="flex justify-between border-b border-muted-light px-6 py-5">
                <p className="text-xl font-extrabold text-black">{t('menu')}</p>
                <button type="button" className="h-max" onClick={closeSidebarMenu}>
                    <CloseIcon className="text-muted transition-colors hover:text-black" />
                </button>
            </div>
            <div className="p-6" onClick={handleLinkClick}>
                <Navigation type="vertical">
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
                <div className="py-8">
                    <Suspense>
                        <LanguageSwitcher />
                    </Suspense>
                </div>
            </div>
        </Sidebar>
    );
}
