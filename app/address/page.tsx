import { Suspense } from "react";
import Loading from "./loading";
import Main from "./Main";
import PageLayout from "../layouts/PageLayout";

export default function Page() {
    return (
        
            <PageLayout>
                <Main/>
            </PageLayout>
       
    )
}