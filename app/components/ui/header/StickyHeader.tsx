'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import useScrollPosition from '@/hooks/useScrollPosition';
import Hamburger from '@/components/ui/header/Hamburger';
import Logo from '@/components/ui/Logo';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';
import { useTranslations } from 'next-intl';

const TOOLBAR_SHOW_POSITION = 400;

export default function StickyHeader() {
    const y = useScrollPosition();
    const { openSidebarMenu } = useSidebarMenuContext();
    const t = useTranslations('Overlay')

    let toolbarVisibility = 'hidden';
    if (y > TOOLBAR_SHOW_POSITION) {
        toolbarVisibility = 'animate-show';
    }

    return (
        <div
            className={`sticky-header fixed inset-x-0 top-0 z-10 bg-white p-4 shadow-lg ${toolbarVisibility}`}
        >
            <div className="container">
                <div className="flex flex-wrap justify-between">
                    <Logo src={secondaryLogo} sizeClass="w-12" />
                    <div className="flex items-center">
                        <Hamburger label={t('menu.open')} handleClick={openSidebarMenu}></Hamburger>
                    </div>
                </div>
            </div>
        </div>
    );
}
