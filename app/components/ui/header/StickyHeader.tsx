'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
//import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import useScrollPosition from '@/hooks/useScrollPosition';
import useSidebar from '@/hooks/useSidebar';
import ConsultationButton from '@/components/ui/buttons/ConsultationButton';
import Hamburger from './Hamburger';
import Logo from '@/components/ui/Logo';
//import HeaderItems from './HeaderItems';
//import HeaderItem from './HeaderItem';
import Sidebar from './Sidebar';
import Overlay from '@/components/ui/Overlay';
import classNames from 'classnames';

const TOOLBAR_SHOW_POSITION = 400;

export default function StickyHeader({ type = 'desktop' }: { type?: 'desktop' | 'mobile' }) {
    const y = useScrollPosition();

    const { isSidebarOpened, handleSidebar } = useSidebar();

    let toolbarVisibility = `hidden`;
    if (y > TOOLBAR_SHOW_POSITION) {
        toolbarVisibility = `animate-show`;
    }

    const stickyHeaderWrapperClasses = classNames(
        'sticky-header',
        'bg-white',
        'shadow-lg',
        'z-20',
        'w-full',
        'fixed',
        'top-0',
        'left-0',
        'p-4',
        toolbarVisibility,
    );

    const buttonsWrapperClasses = classNames('flex flex-wrap items-center', {
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
                        {/* <HeaderItems>
                            <HeaderItem href="#" Icon={FavoriteIcon} />
                            <HeaderItem href="#" Icon={SignalCellularAltIcon} />
                        </HeaderItems> */}
                        <Hamburger handleClick={() => handleSidebar(true)}></Hamburger>
                    </div>
                </div>
            </div>
            <Sidebar handleClose={() => handleSidebar(false)} isOpened={isSidebarOpened} />
            <Overlay isVisible={isSidebarOpened} handleClick={() => handleSidebar(false)} />
        </div>
    );
}
