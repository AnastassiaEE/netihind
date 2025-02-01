import { SidebarMenuProvider } from '@/app/contexts/SidebarMenuContext';
import DesktopHeader from '@/components/ui/header/DesktopHeader';
import MobileHeader from '@/components/ui/header/MobileHeader';
import classNames from 'classnames';
import SidebarMenu from '@/components/ui/header/SidebarMenu';

const variants = {
    primary: 'absolute',
    secondary: 'shadow-lg',
};

export default function Header({ variant = 'secondary' }: { variant?: 'primary' | 'secondary' }) {
    const headerClasses = classNames('bg-white w-full top-0 z-30', variants[variant]);

    return (
        <SidebarMenuProvider>
            <SidebarMenu />
            <header className={headerClasses}>
                <DesktopHeader />
                <MobileHeader />
            </header>
        </SidebarMenuProvider>
    );
}
