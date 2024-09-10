import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

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

    return (
        <header className={`bg-white ${variants[variant]} ${position} w-full top-0`}> 
            <div className="max-md:hidden"><DesktopHeader/></div>
            <div className="md:hidden"><MobileHeader/></div>
        </header> 
    )
}