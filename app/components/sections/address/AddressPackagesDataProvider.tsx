import { getProviders } from "@/lib/packagesDataFetch";
import AddressPackagesSection from "./AddressPackagesSection";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getAddressCookieValues } from "@/utils/addressCookieHelper";

export default async function AddressPackagesDataProvider() {
    const cookieString = getCookie('ADDRESS', { cookies });
    const { fullAddress, oid } = getAddressCookieValues(cookieString);
    const providers = await getProviders(oid);
    return <AddressPackagesSection providers={providers} />
} 