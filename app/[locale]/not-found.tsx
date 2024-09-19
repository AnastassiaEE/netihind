import Button from '@/components/ui/form/buttons/Button';
import Header from '@/components/ui/header/Header';
import SectionLayout from '@/layouts/SectionLayout';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import SecondaryFooter from '@/components/ui/footer/SecondaryFooter';
import classNames from 'classnames';
import IconButton from '@/components/ui/form/buttons/IconButton';

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
    return (
        <>
            <Header variant="primary" />
            <div className={contentWrapperClasses}>
                <SectionLayout className="flex grow">
                    <div className="h-full flex flex-col justify-center items-center">
                        <h1 className="text-9xl text-primary font-extrabold mb-6">404</h1>
                        <h2 className="text-5xl font-extrabold mb-8">Ooops!</h2>
                        <p className="text-xl text-muted-dark mb-12">
                            The page you are looking for is not available.
                        </p>
                        <IconButton size="lg" className="w-max" Icon={HomeIcon}>
                            <Link href="/">Return home</Link>
                        </IconButton>
                    </div>
                </SectionLayout>
                <SecondaryFooter />
            </div>
        </>
    );
}
