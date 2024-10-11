'use client';

import whitelogo from '@/public/images/whitelogo.svg';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import SocialLinks from '@/components/ui/social-links/SocialLinks';
import SocialLink from '@/components/ui/social-links/SocialLink';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/ui/navigation/Navigation';
import { useTranslation } from 'react-i18next';
import Copyright from '@/components/ui/Copyright';
import SectionLayout from '@/layouts/SectionLayout';
import socialLinks from '@/data/socialLinks';
import getLocalePrefix from '@/utils/getLocalePrefix';
import i18nConfig from '@/i18nConfig';

export default function Footer() {
    const { t, i18n } = useTranslation('navigation');
    const localePrefix = getLocalePrefix(i18n.language, i18nConfig.defaultLocale)

    return (
        <footer className="bg-gray-900 py-12">
            <SectionLayout>
                <div className="flex justify-center mb-2">
                    <Logo src={whitelogo} sizeClass="w-36" />
                </div>
                <div className="flex justify-center pt-4 pb-6">
                    <Navigation itemColorClass="text-white/80">
                        <NavigationItem href={`/`}>{t('home')}</NavigationItem>
                        <NavigationItem href={`/blogi`}>{t('blog')}</NavigationItem>
                        <NavigationItem href={`/meist`}>{t('about-us')}</NavigationItem>
                        <NavigationItem href={`/kasutustingimused`}>{t('privacy-policy')}</NavigationItem>
                        <NavigationItem href={`/kontaktid`}>{t('contacts')}</NavigationItem>
                    </Navigation>
                </div>
                <div className="flex justify-center pt-6">
                    <SocialLinks>
                        {Object.keys(socialLinks).map((type) => {
                            return <SocialLink key={type} type={type} href={socialLinks[type]} />;
                        })}
                    </SocialLinks>
                </div>
                <div className="pt-12">
                    <Copyright textColorClass="text-white/60" />
                </div>
            </SectionLayout>
        </footer>
    );
}
