
import Header from "../components/ui/header/Header";
import Footer from "../components/ui/footer/Footer";

export default function PageLayout({
    headerVariant,
    headerPosition,
    children,
    
}: {
    headerVariant?: React.ComponentProps<typeof Header>['variant'],
    headerPosition?:  React.ComponentProps<typeof Header>['position'],
    children: React.ReactNode,
}) {
    return (
        <>
            <Header variant={headerVariant} position={headerPosition}/>
                {children}
            <Footer/>
        </>
    )
}