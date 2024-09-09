import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const variants = {
    primary: '',
    secondary: 'shadow-lg'
}

export default function Header({
    variant = 'secondary'
}: {
    variant?: 'primary' | 'secondary'
}) {

    return (
        <header className={`bg-white ${variants[variant]} absolute w-full z-50`}> 
            <div className="max-md:hidden"><DesktopHeader/></div>
            <div className="md:hidden"><MobileHeader/></div>
        </header> 
    )
}