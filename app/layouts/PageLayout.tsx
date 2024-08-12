
import Header from "../components/ui/header/Header";
import { AddressProvider } from "../contexts/AddressContext";
import Footer from "../components/ui/footer/Footer";

export default function PageLayout({
    children,
    headerVariant
}: {
    children: React.ReactNode,
    headerVariant: React.ComponentProps<typeof Header>['variant']
}) {
    return (
        <AddressProvider>
            <Header variant={headerVariant}/>
            {children}
            <Footer/>
        </AddressProvider>
    )
}