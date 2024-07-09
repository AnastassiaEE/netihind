'use client'

import Image from 'next/image'
import mainLogo from '../../public/images/gradientmainlogo.svg';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconLink from './IconLink';
import colors from 'tailwindcss/colors';


export default function Navbar() {

    const [y, setY] = useState(0);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const firstSectionBottomPos = useRef(0);
    
    let style = 'absolute top-0 left-0';
    if (y > firstSectionBottomPos.current) {
        style = 'fixed animate-show shadow-md bg-white';
    }

    const iconLinks = [
        {Icon: FavoriteIcon, link: '#', key: 'favourite'},
        {Icon: SignalCellularAltIcon, link: '#', key: 'compare'}
    ];

    const links = [
        {name: 'Link 1', link: '#'},
        {name: 'Link 2', link: '#'},
        {name: 'Link 3', link: '#'},
    ]

    const openSideNav = (state: boolean) => {
        if (state) {
            setIsSideNavOpen(true);
            document.body.style.cssText = 'overflow: hidden';
        } else {
            setIsSideNavOpen(false);
            document.body.style.cssText = 'overflow: scroll';
        }
    }

    const sideNavStyle = isSideNavOpen ? 'translate-x-0' : 'translate-x-full';

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
                <div className="flex justify-between p-4">
                    <div className="flex">
                        <Link href="/" className="mr-6">
                            <Image
                                className="w-36"
                                src={mainLogo}
                                alt="navbar logo"
                                width={0}
                                height={0}/>
                        </Link>   
                        <div className="flex items-center max-md:hidden">
                            <ul className="flex text-base text-muted-dark font-semibold">
                                {links.map(({name, link}) => {
                                    return (
                                        <li key={name}><Link href={link} className="px-4 py-2 hover:text-primary transition-colors">{name}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ul className="flex">
                            {iconLinks.map(iconLink => {
                                return (
                                    <li key={iconLink.key} className="p-2"> <IconLink iconLink={iconLink}/> </li>
                                )
                            })}
                            <button type="button" className="ml-6 md:hidden" onClick={() => openSideNav(true)}>
                                <MenuIcon fontSize="large"className="text-muted-dark"/>
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 w-80 max-w-full h-full z-50 bg-white shadow-md transition-transform duration-300 ${sideNavStyle} md:hidden`}>
                <div className="flex justify-between px-6 py-5 border-b border-muted-light">
                    <h5 className="text-xl font-extrabold">Menu</h5>
                    <button type="button" className="h-max" onClick={() => openSideNav(false)}><CloseIcon className="text-muted hover:text-black transition-colors duration-300"/></button>
                </div>
                <div className="p-6">
                    <ul className="text-base text-muted-dark font-semibold">
                        {links.map(({name, link}) => {
                            return (
                                <li key={name}><Link href={link} className="flex py-2 hover:text-primary transition-colors">{name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-screen h-screen bg-black/70 ${!isSideNavOpen ? "hidden" : undefined}`} onClick={() => openSideNav(false)}></div>
        </header>
    )
}