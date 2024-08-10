
import Header from "../components/ui/header/Header";
import { AddressProvider } from "../contexts/AddressContext";
import Footer from "../components/ui/footer/Footer";

export default function PageLayout({children}: {children: React.ReactNode}) {
    return (
        <AddressProvider>
            <Header/>
            {children}
            <Footer/>
        </AddressProvider>
    )
}