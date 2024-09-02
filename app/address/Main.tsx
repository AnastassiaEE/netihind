import AddressProvidersSection from "../components/sections/AddressProvidersSection";
import AddressTariffsSection from "../components/sections/AddressTariffsSection";
import { Suspense } from "react";
import Loading from "./loading";


export default function Main() {
    return (
        <Suspense fallback={<Loading/>}>
            <AddressProvidersSection/>
            <AddressTariffsSection/>
        </Suspense>
    )
}