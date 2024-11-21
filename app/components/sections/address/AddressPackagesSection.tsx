import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import ButtonsFilter from '@/components/ui/filter/ButtonsFilter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
// import SelectSort from '@/components/ui/filter/SelectSort';
import { getTranslations } from 'next-intl/server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getPackages } from '@/lib/addressDataFetch';
import PackagesError from '@/components/ui/errors/PackagesError';

export default async function AddressPackagesSection({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const t = await getTranslations(['AddressPage', 'Errors']);

    const filters: { [key: string]: boolean } = { all: false, internet: false, 'internet-tv': false };
    const activeFilter = Object.keys(filters).includes(searchParams.filter)
        ? searchParams.filter
        : 'all';
    filters[activeFilter] = true;

    const sortOptions = ['default', 'price_asc', 'price_desc'];
    const selectedSortOption = sortOptions.includes(searchParams.sort)
        ? searchParams.sort
        : 'default';

    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString);

    let err = 'noPackages';
    const packages = await getPackages(activeFilter, city, county, street, streetNr).catch(
        (error) => {
            err = error.message;
            return undefined;
        },
    );

    if (!packages || packages.length === 0)
        return (
            <div className="container">
                <PackagesError>{t(`Errors.${err}`)}</PackagesError>
            </div>
        );

    return (
        <SectionLayout className="pt-24">
            <H2>{t('AddressPage.packagesSection.title')}</H2>
            <div className="mb-12">
                <ButtonsFilter filters={filters} />
                {/* <SelectSort options={sortOptions} selectedOption={selectedSortOption} /> */}
            </div>
            <Packages filter={activeFilter} initialPackages={packages} />
        </SectionLayout>
    );
}
