import whitelogo from '@/public/images/whitelogo.svg';
import NavigationItem from '@/components/ui/navigation/NavigationItem';
import SocialLinks from '@/components/ui/social-links/SocialLinks';
import SocialLink from '@/components/ui/social-links/SocialLink';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/ui/navigation/Navigation';
import Copyright from '@/components/ui/Copyright';
import SectionLayout from '@/layouts/SectionLayout';
import socialLinks from '@/data/socialLinks';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Navigation');
    return (
        <footer className="bg-gray-900 py-12">
            <SectionLayout>
                <div className="flex justify-center mb-2">
                    <Logo src={whitelogo} sizeClass="w-36" />
                </div>
                <div className="flex justify-center pt-4 pb-6">
                    <Navigation itemColorClass="text-white/80">
                        <NavigationItem href='/'>{t('home')}</NavigationItem>
                        <NavigationItem href='/blog'>{t('blog')}</NavigationItem>
                        <NavigationItem href='/about'>{t('about')}</NavigationItem>
                        <NavigationItem href='/policy'>{t('policy')}</NavigationItem>
                        <NavigationItem href='/contacts'>{t('contacts')}</NavigationItem>
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
