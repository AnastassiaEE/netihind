import MainFooter from '@/components/ui/footer/MainFooter';
import Header from '@/components/ui/header/Header';
import { setRequestLocale } from 'next-intl/server';

export default function Layout({
    params: { locale },
    children,
}: {
    params: { locale: string };
    children: React.ReactNode;
}) {
    setRequestLocale(locale);
    return (
        <>
            <Header variant="primary" />
            <main>{children}</main>
            <MainFooter />
        </>
    );
}
