'use client'

import useHeader from '../../../hooks/useHeader';
import Hamburger from './Hamburger';
import Overlay from '../Overlay';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const TOOLBAR_SHOW_POSITION = 400;

const variants = {
    primary: 'bg-white',
    secondary: 'bg-white shadow-md'
}

export default function Header({
    variant = 'secondary'
}: {
    variant?: 'primary' | 'secondary'
}) {

    const {
        y,
        isSidebarOpened,
        handleSidebar
    } = useHeader();
    
    let toolbarVisibility = `hidden`;
    if (y > TOOLBAR_SHOW_POSITION) {
        toolbarVisibility = `animate-show`;
    }

    return (
        <>
            <header className={variants[variant]} > 
                <div className="container">
                    <Navbar>
                        <div className="ml-5 md:hidden">
                            <Hamburger handleClick={() => handleSidebar(true)}/>
                        </div>
                    </Navbar> 
                </div>
            </header>
            <div className={`${toolbarVisibility} ${variants.secondary} z-10 w-full fixed top-0`}>
                <div className="container">
                    <Navbar>
                        <div className="ml-5 md:hidden">
                            <Hamburger handleClick={() => handleSidebar(true)}/>
                        </div>
                    </Navbar> 
                </div>
            </div>
            <Sidebar 
                handleClose={() => handleSidebar(false)} 
                isOpened={isSidebarOpened}/>
            <Overlay 
                isVisible={isSidebarOpened} 
                handleClick={() => handleSidebar(false)}/>
        </>
    )
}