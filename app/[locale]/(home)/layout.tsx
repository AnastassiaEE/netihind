import Footer from '@/components/ui/footer/Footer';
import Header from '@/components/ui/header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header variant="primary" position="absolute" />
            {children}
            <Footer />
        </>
    );
}
