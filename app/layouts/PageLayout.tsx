
import Header from "../components/ui/header/Header";
import Footer from "../components/ui/footer/Footer";

export default function PageLayout({
    children,
    headerVariant
}: {
    children: React.ReactNode,
    headerVariant?: React.ComponentProps<typeof Header>['variant']
}) {
    return (
        <>
            <Header variant={headerVariant}/>
            {children}
            <Footer/>
        </>
    )
}