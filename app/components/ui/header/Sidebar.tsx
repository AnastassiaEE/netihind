'use client';

import CloseIcon from '@mui/icons-material/Close';
import Navigation from '@/components/ui/navigation/Navigation';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/language-switcher/LanguageSwitcher';
import classNames from 'classnames';
import i18nConfig from '@/i18nConfig';
import { usePathname } from 'next/navigation';
import getLocalePrefix from '@/utils/getLocalePrefix';

export default function Sidebar({
    isOpened,
    handleClose,
}: {
    isOpened: boolean;
    handleClose: React.MouseEventHandler;
}) {
    const { t, i18n } = useTranslation('navigation');
    const localePrefix = getLocalePrefix(i18n.language, i18nConfig.defaultLocale);
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
                <h5 className="text-xl font-extrabold">{t('menu')}</h5>
                <button type="button" className="h-max" onClick={handleClose}>
                    <CloseIcon className="text-muted hover:text-black transition-colors" />
                </button>
            </div>
            <div className="p-6">
                <Navigation type="vertical">
                    <NavigationItem
                        href={`${localePrefix}/blog`}
                        isActive={pathname === `${localePrefix}/blog`}
                        handleClick={handleClose}
                    >
                        {t('blog')}
                    </NavigationItem>
                    <NavigationItem
                        href={`${localePrefix}/about`}
                        isActive={pathname === `${localePrefix}/about`}
                        handleClick={handleClose}
                    >
                        {t('about-us')}
                    </NavigationItem>
                    <NavigationItem
                        href={`${localePrefix}/contacts`}
                        isActive={pathname === `${localePrefix}/contacts`}
                        handleClick={handleClose}
                    >
                        {t('contacts')}
                    </NavigationItem>
                </Navigation>
                <div className="py-8">
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
}
