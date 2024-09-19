import MainFooter from '@/components/ui/footer/MainFooter';
import Header from '@/components/ui/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header variant="primary" />
            {children}
            <MainFooter />
        </>
    );
}
