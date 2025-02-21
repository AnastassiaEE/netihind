'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import Hamburger from '@/components/ui/header/Hamburger';
import Logo from '@/components/ui/Logo';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';

export default function MobileHeader() {
    const { openModal: openSidebarMenu } = useSidebarMenuContext();
    return (
        <div className="container md:hidden">
            <div className="flex flex-wrap justify-between p-4">
                <div>
                    <Logo src={secondaryLogo} sizeClass="w-12" />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                    <Hamburger handleClick={openSidebarMenu}></Hamburger>
                </div>
            </div>
        </div>
    );
}
