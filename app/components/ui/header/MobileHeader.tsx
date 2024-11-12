'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import ConsultationButton from '@/components/ui/buttons/ConsultationButton';
import StickyHeader from '@/components/ui/header/StickyHeader';
import Hamburger from '@/components/ui/header/Hamburger';
import Sidebar from '@/components/ui/header/Sidebar';
import Overlay from '@/components/ui/Overlay';
import useSidebar from '@/hooks/useSidebar';
import Logo from '@/components/ui/Logo';

export default function MobileHeader() {
    const { isSidebarOpened, handleSidebar } = useSidebar();
    return (
        <div className="container md:hidden">
            <div className="flex flex-wrap justify-between p-4">
                <div>
                    <Logo src={secondaryLogo} sizeClass="w-12" />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                    <ConsultationButton type="mobile" />
                    <Hamburger handleClick={() => handleSidebar(true)}></Hamburger>
                </div>
            </div>
            <StickyHeader type="mobile" />
            <Sidebar handleClose={() => handleSidebar(false)} isOpened={isSidebarOpened} />
            <Overlay isVisible={isSidebarOpened} handleClick={() => handleSidebar(false)} />
        </div>
    );
}
