'use client';

import secondaryLogo from '@/public/images/gradientsecondarylogo.svg';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ConsultationButton from '@/components/ui/buttons/ConsultationButton';
import StickyHeader from './StickyHeader';
import HeaderItems from './HeaderItems';
import HeaderItem from './HeaderItem';
import Hamburger from './Hamburger';
import Sidebar from './Sidebar';
import Overlay from '@/components/ui/Overlay';
import useSidebar from '@/hooks/useSidebar';
import Logo from '@/components/ui/Logo';

export default function MobileHeader() {
    const { isSidebarOpened, handleSidebar } = useSidebar();

    return (
        <>
            <div className="container">
                <div className="flex flex-wrap justify-between p-4">
                    <div className="mr-6">
                        <Logo src={secondaryLogo} sizeClass="w-12" />
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                        <ConsultationButton type="mobile" />
                        {/* <HeaderItems>
                            <HeaderItem href="#" Icon={FavoriteIcon} />
                            <HeaderItem href="#" Icon={SignalCellularAltIcon} />
                        </HeaderItems> */}
                        <Hamburger handleClick={() => handleSidebar(true)}></Hamburger>
                    </div>
                </div>
                <StickyHeader type="mobile" />
            </div>
            <Sidebar handleClose={() => handleSidebar(false)} isOpened={isSidebarOpened} />
            <Overlay isVisible={isSidebarOpened} handleClick={() => handleSidebar(false)} />
        </>
    );
}
