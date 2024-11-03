import Header from '@/components/ui/header/Header';
import SectionLayout from '@/layouts/SectionLayout';
import { Link } from '@/i18n/routing';
import HomeIcon from '@mui/icons-material/Home';
import SecondaryFooter from '@/components/ui/footer/SecondaryFooter';
import classNames from 'classnames';
import IconButton from '@/components/ui/form/buttons/IconButton';
import { useTranslations } from 'next-intl';

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

export default function NotFound() {
    const t = useTranslations('NotFoundPage');
    return (
        <>
            <Header variant="primary" />
            <div className={contentWrapperClasses}>
                <SectionLayout className="flex grow">
                    <div className="h-full flex flex-col justify-center items-center">
                        <h1 className="text-9xl text-primary font-extrabold mb-6">404</h1>
                        <h2 className="text-5xl font-extrabold mb-8">{t('title')}</h2>
                        <p className="text-xl text-center mb-12">
                            {t.rich('description', {
                                br: () => <br />,
                            })}
                        </p>
                        <Link href="/">
                            <IconButton size="lg" Icon={HomeIcon}>
                                {t('buttons.returnHome')}
                            </IconButton>
                        </Link>
                    </div>
                </SectionLayout>
                <SecondaryFooter />
            </div>
        </>
    );
}
