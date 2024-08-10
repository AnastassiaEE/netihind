import Header from "../components/ui/header/Header";
import Footer from "../components/ui/footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import Main from "./Main";


export default function Page() {
    return (
        <Suspense fallback={<Loading/>}>
            <Header/>
            <Main/>
            <Footer/>
        </Suspense>
    )
}