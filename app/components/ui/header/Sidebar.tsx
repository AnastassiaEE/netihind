'use client';
import CloseIcon from '@mui/icons-material/Close';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

export default function Sidebar({
    isOpened,
    handleClose,
}: {
    isOpened: boolean;
    handleClose: React.MouseEventHandler;
}) {
    const t = useTranslations('Navigation');
    const pathname = usePathname();

    const sidebarWrapperClasses = classNames(
        'fixed',
        'top-0',
        'right-0',
        'w-80',
        'max-w-full',
        'h-full',
        'z-50',
        'bg-white',
        'shadow-md',
        'transition-transform duration-300',
        {
            'translate-x-0': isOpened,
            'translate-x-full': !isOpened,
        },
    );
    return (
        <div className={sidebarWrapperClasses}>
            <div className="flex justify-between px-6 py-5 border-b border-muted-light">
                <p className="text-xl font-extrabold text-black">{t('menu')}</p>
                <button type="button" className="h-max" onClick={handleClose}>
                    <CloseIcon className="text-muted hover:text-black transition-colors" />
                </button>
            </div>
            <div className="p-6">
                <Navigation type="vertical">
                    <NavigationItem href="/blog" isActive={pathname === '/blog'} handleClick={handleClose}>
                        {t('blog')}
                    </NavigationItem>
                    <NavigationItem href="/about" isActive={pathname === '/about'} handleClick={handleClose}>
                        {t('about')}
                    </NavigationItem>
                    <NavigationItem
                        href="/contacts"
                        isActive={pathname === '/contacts'}
                        handleClick={handleClose}
                    >
                        {t('contacts')}
                    </NavigationItem>
                </Navigation>
                <div className="py-8">
                    <LanguageSwitcher handleSidebarClose={handleClose} />
                </div>
            </div>
        </div>
    );
}
