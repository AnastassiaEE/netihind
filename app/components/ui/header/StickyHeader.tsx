'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import useScrollPosition from '@/hooks/useScrollPosition';
import Hamburger from '@/components/ui/header/Hamburger';
import Logo from '@/components/ui/Logo';
import classNames from 'classnames';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';

const TOOLBAR_SHOW_POSITION = 400;

export default function StickyHeader() {
    const y = useScrollPosition();
    const { openSidebarMenu } = useSidebarMenuContext();

    let toolbarVisibility = 'hidden';
    if (y > TOOLBAR_SHOW_POSITION) {
        toolbarVisibility = 'animate-show';
    }

    const wrapperClasses = classNames(
        'sticky-header',
        'bg-white',
        'shadow-lg',
        'fixed',
        'top-0',
        'inset-x-0',
        'z-10',
        'p-4',
        toolbarVisibility,
    );

    return (
        <div className={wrapperClasses}>
            <div className="container">
                <div className="flex flex-wrap justify-between">
                    <Logo src={secondaryLogo} sizeClass="w-12" />
                    <div className="flex items-center">
                        <Hamburger handleClick={openSidebarMenu}></Hamburger>
                    </div>
                </div>
            </div>
        </div>
    );
}
