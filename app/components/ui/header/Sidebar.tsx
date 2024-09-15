'use client'

import CloseIcon from '@mui/icons-material/Close';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';

export default function Sidebar({
    isOpened,
    handleClose,
}: {
    isOpened: boolean,
    handleClose: React.MouseEventHandler,
}) {
    const { t } = useTranslation('navigation')

    return (
        <div className={`fixed top-0 right-0 w-80 max-w-full h-full z-50 bg-white shadow-md transition-transform duration-300 ${isOpened ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between px-6 py-5 border-b border-muted-light">
                <h5 className="text-xl font-extrabold">{t('menu')}</h5>
                <button type="button" className="h-max" onClick={handleClose}><CloseIcon className="text-muted hover:text-black transition-colors"/></button>
            </div>
            <div className="p-6">
                <Navigation type="vertical">
                    <NavigationItem href="/blog">{t('blog')}</NavigationItem>
                    <NavigationItem href="/about">{t('about-us')}</NavigationItem>
                    <NavigationItem href="/contacts">{t('contacts')}</NavigationItem>
                </Navigation>
                <div className="py-8">
                    <LanguageSwitcher/>
                </div>
                
            </div>
            
        </div>
    )
}