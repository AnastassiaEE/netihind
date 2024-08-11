import { Suspense } from "react";
import TariffsSection from "../components/sections/TariffsSection";
import Loading from "./loading";

export default function Main() {
    return (
        <Suspense fallback={<Loading/>}>
            <TariffsSection/>
        </Suspense>
    )
}