'use client'

import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Hamburger from './Hamburger';
import Overlay from '../../Overlay';

export default function Header() {

    const [y, setY] = useState(0);
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    const firstSectionBottomPos = useRef(0);
    
    let style = 'absolute top-0 left-0';
    if (y > firstSectionBottomPos.current) {
        style = 'fixed animate-show shadow-md bg-white';
    }

    const openSidebar = (state: boolean) => {
        if (state) {
            setIsSidebarOpened(true);
            document.body.style.cssText = 'overflow: hidden';
        } else {
            setIsSidebarOpened(false);
            document.body.style.cssText = 'overflow-y: scroll';
        }
    }

    useEffect(() => {
        const firstSection = document.getElementsByTagName('section')[0];
        firstSectionBottomPos.current = firstSection.offsetTop + firstSection.offsetHeight;
        const handleNavigation = () => {
            setY(window.scrollY);
         }
        window.addEventListener("scroll", handleNavigation);
        return () => window.removeEventListener("scroll", handleNavigation);
    }, []);
  
    return (
        <header className={`${style} w-full z-50`}> 
            <div className="container">
                <Navbar>
                    <div className="ml-5 md:hidden">
                        <Hamburger handleClick={() => openSidebar(true)}/>
                    </div>
                </Navbar>
                <Sidebar 
                    handleClose={() => openSidebar(false)} 
                    isOpened={isSidebarOpened}/>
            </div>
            <Overlay 
                isVisible={isSidebarOpened} 
                handleClick={() => openSidebar(false)}/>
        </header>
    )
}