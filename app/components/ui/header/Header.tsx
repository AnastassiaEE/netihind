import DesktopHeader from '@/components/ui/header/DesktopHeader';
import MobileHeader from '@/components/ui/header/MobileHeader';
import classNames from 'classnames';

const variants = {
    primary: 'absolute',
    secondary: 'shadow-lg',
};

export default function Header({ variant = 'secondary' }: { variant?: 'primary' | 'secondary' }) {
    const headerClasses = classNames('bg-white w-full top-0 z-50', variants[variant]);

    return (
        <header className={headerClasses}>
            <DesktopHeader />
            <MobileHeader />
        </header>
    );
}
