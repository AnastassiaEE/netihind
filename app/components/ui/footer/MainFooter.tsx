import whitelogo from '@/public/images/whitelogo.svg';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import SocialLinks from '@/components/ui/social-links/SocialLinks';
import Logo from '@/components/ui/Logo';
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
                    <Logo src={whitelogo} sizeClass="w-36" />
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
                <div className="pt-6 flex justify-center">
                    <SocialLinks data={socialLinks} />
                </div>
                <div className="pt-12">
                    <Copyright textColorClass="text-white/60" />
                </div>
            </SectionLayout>
        </footer>
    );
}
