import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import classNames from 'classnames';

const variants = {
    primary: '',
    secondary: 'shadow-lg'
}

export default function Header({
    variant = 'secondary',
    position = 'static'
}: {
    variant?: 'primary' | 'secondary',
    position?: 'static' | 'absolute'
}) {

    const headerClasses = classNames('bg-white w-full top-0', variants[variant], position);

    return (
        <header className={headerClasses}> 
            <div className="max-md:hidden"><DesktopHeader/></div>
            <div className="md:hidden"><MobileHeader/></div>
        </header> 
    )
}