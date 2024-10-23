import Header from '@/components/ui/header/Header';
import SectionLayout from '@/layouts/SectionLayout';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import SecondaryFooter from '@/components/ui/footer/SecondaryFooter';
import classNames from 'classnames';
import IconButton from '@/components/ui/form/buttons/IconButton';
import { headers } from 'next/headers';
import initTranslations from '@/i18n/i18n';
import TranslationProvider from '@/i18n/TranslationProvider';

const contentWrapperClasses = classNames(
    'h-[calc(100dvh)]',
    'md:h-screen',
    'min-h-[500px]',
    'md:min-h-[720px]',
    'md:h-screen',
    'pt-[80px]',
    'md:pt-[140px]',
    'flex',
    'flex-col',
);

const i18Namespaces = ['not-found', 'navigation'];

export default async function NotFound() {
    const headersList = headers();
    const locale = headersList.get('x-next-i18n-router-locale') || 'et';
    const { resources, t } = await initTranslations(locale, i18Namespaces);
    return (
        <>
            <TranslationProvider locale={locale} namespaces={['navigation']} resources={resources}>
                <Header variant="primary" />
            </TranslationProvider>
            <div className={contentWrapperClasses}>
                <SectionLayout className="flex grow">
                    <div className="h-full flex flex-col justify-center items-center">
                        <h1 className="text-9xl text-primary font-extrabold mb-6">404</h1>
                        <h2 className="text-5xl font-extrabold mb-8">{t('title')}</h2>
                        <p className="text-xl text-muted-dark mb-12">{t('description')}</p>
                        <Link href="/">
                            <IconButton size="lg" Icon={HomeIcon}>
                                {t('buttons.return-home')}
                            </IconButton>
                        </Link>
                    </div>
                </SectionLayout>
                <SecondaryFooter />
            </div>
        </>
    );
}
