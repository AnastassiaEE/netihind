import { SidebarMenuProvider } from '@/app/contexts/SidebarMenuContext';
import DesktopHeader from '@/components/ui/header/DesktopHeader';
import MobileHeader from '@/components/ui/header/MobileHeader';
import classNames from 'classnames';
import SidebarMenu from '@/components/ui/header/SidebarMenu';
import StickyHeader from '@/components/ui/header/StickyHeader';

const variants = {
    primary: 'absolute top-0 inset-x-0 z-10',
    secondary: 'shadow-lg',
};

export default function Header({ variant = 'secondary' }: { variant?: 'primary' | 'secondary' }) {
    const headerClasses = classNames('bg-white', variants[variant]);

    return (
        <SidebarMenuProvider>
            <SidebarMenu />
            <header className={headerClasses}>
                <DesktopHeader />
                <MobileHeader />
            </header>
            <StickyHeader />
        </SidebarMenuProvider>
    );
}
