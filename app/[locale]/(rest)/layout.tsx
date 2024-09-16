import Footer from "@/components/ui/footer/Footer"
import Header from "@/components/ui/header/Header"

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Header/>
        <div className="py-24">
            {children}
        </div>   
        <Footer/>
        </>
    )
}