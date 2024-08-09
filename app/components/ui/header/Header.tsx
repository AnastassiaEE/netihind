'use client'

import useHeader from '../../../hooks/useHeader';
import Hamburger from './Hamburger';
import Overlay from '../Overlay';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const HEADER_SHOW_POSITION = 400;

export default function Header() {

    const {
        y,
        isSidebarOpened,
        handleSidebar
    } = useHeader();
    
    let style = 'absolute top-0 left-0';
    if (y > HEADER_SHOW_POSITION) {
        style = 'fixed animate-show shadow-md bg-white';
    }

    return (
        <header className={`${style} w-full z-50`}> 
            <div className="container">
                <Navbar>
                    <div className="ml-5 md:hidden">
                        <Hamburger handleClick={() => handleSidebar(true)}/>
                    </div>
                </Navbar>
                <Sidebar 
                    handleClose={() => handleSidebar(false)} 
                    isOpened={isSidebarOpened}/>
            </div>
            <Overlay 
                isVisible={isSidebarOpened} 
                handleClick={() => handleSidebar(false)}/>
        </header>
    )
}