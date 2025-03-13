// import { getProviders } from "@/app/lib/wpProviders";
// import React, { Suspense } from "react";
// import PingLoader from "../loaders/PingLoader";
// import NothingToPreview from "../NothingToPreview";

// export default async function ProvidersWrapper({
//     locale,
//     children,
// }: {
//     locale: string;
//     children: React.ReactNode;
// }) {
//     const providers = await getProviders(locale.toUpperCase());
//     console.log(providers);
//     const notProviders = providers === undefined || providers?.length === 0;
//     const childrenWithProviders = React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//             return React.cloneElement(child as React.ReactElement, { providers: providers });
//         }
//         return child;
//     });
//     return (
//         <Suspense fallback={<PingLoader />}>
//             {notProviders ? <NothingToPreview message="posts-not-found" /> : childrenWithProviders}
//         </Suspense>
//     );
// }