import Button from '@/components/ui/form/Button';
import Header from '@/components/ui/header/Header';
import SectionLayout from '@/layouts/SectionLayout';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import SecondaryFooter from '@/components/ui/footer/SecondaryFooter';

export default function NotFound() {
    return (
        <>
            <Header variant="primary" />
            <SectionLayout>
                <div className="flex justify-center items-center max-md:h-[calc(100dvh)] max-md:min-h-[500px] md:h-screen md:min-h-[720px]">
                    <div className="text-center">
                        <h1 className="text-9xl text-primary font-extrabold mb-6">404</h1>
                        <h2 className="text-5xl font-extrabold mb-8">Ooops!</h2>
                        <p className="text-xl text-muted-dark mb-12">
                            The page you are looking for is not available.
                        </p>
                        <Button size="lg" className="inline-flex">
                            <HomeIcon className="mr-2" />
                            <Link href="/">Return home</Link>
                        </Button>
                    </div>
                </div>
            </SectionLayout>
            <SecondaryFooter />
        </>
    );
}
