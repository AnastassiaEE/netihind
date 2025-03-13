import whitelogo from '@/public/images/whitelogo.svg';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import SocialLinks from '@/components/ui/social-links/SocialLinks';
import LinkLogo from '@/components/ui/logo/LinkLogo';
import Navigation from '@/components/ui/navigation/Navigation';
import Copyright from '@/components/ui/Copyright';
import SectionLayout from '@/layouts/SectionLayout';
import socialLinks from '@/data/socialLinks';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Navigation');
    return (
        <footer className="bg-dark py-12">
            <SectionLayout>
                <div className="mb-2 flex justify-center">
                    <LinkLogo src={whitelogo} sizeClass="w-36" />
                </div>
                <div className="pb-6 pt-4 text-center">
                    <Navigation className="text-white/80">
                        <NavigationItem href='/'>{t('home')}</NavigationItem>
                        <NavigationItem href='/blog'>{t('blog')}</NavigationItem>
                        <NavigationItem href='/about'>{t('about')}</NavigationItem>
                        <NavigationItem href='/policy'>{t('policy')}</NavigationItem>
                        <NavigationItem href='/contacts'>{t('contacts')}</NavigationItem>
                    </Navigation>
                </div>
                <div className="flex justify-center pt-6">
                    <SocialLinks data={socialLinks} />
                </div>
                <div className="pt-12">
                    <Copyright textColorClass="text-white/60" />
                </div>
            </SectionLayout>
        </footer>
    );
}
