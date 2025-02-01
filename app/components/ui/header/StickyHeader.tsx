'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import useScrollPosition from '@/hooks/useScrollPosition';
import ConsultationButton from '@/components/ui/buttons/ConsultationButton';
import Hamburger from '@/components/ui/header/Hamburger';
import Logo from '@/components/ui/Logo';
import classNames from 'classnames';
import { useSidebarMenuContext } from '@/app/contexts/SidebarMenuContext';

const TOOLBAR_SHOW_POSITION = 400;

export default function StickyHeader({ type = 'desktop' }: { type?: 'desktop' | 'mobile' }) {
    const y = useScrollPosition();
    const { openModal: openSidebar } = useSidebarMenuContext();

    let toolbarVisibility = 'hidden';
    if (y > TOOLBAR_SHOW_POSITION) {
        toolbarVisibility = 'animate-show';
    }

    const stickyHeaderWrapperClasses = classNames(
        'sticky-header',
        'bg-white',
        'shadow-lg',
        'w-full',
        'fixed',
        'top-0',
        'left-0',
        'p-4',
        'z-30',
        toolbarVisibility,
    );

    const buttonsWrapperClasses = classNames('flex flex-wrap', {
        'gap-10': type === 'desktop',
        'gap-6': type === 'mobile',
    });

    return (
        <div className={stickyHeaderWrapperClasses}>
            <div className="container">
                <div className="flex flex-wrap justify-between">
                    <Logo src={secondaryLogo} sizeClass="w-12" />
                    <div className={buttonsWrapperClasses}>
                        <ConsultationButton type={type} />
                        <Hamburger handleClick={openSidebar}></Hamburger>
                    </div>
                </div>
            </div>
        </div>
    );
}
