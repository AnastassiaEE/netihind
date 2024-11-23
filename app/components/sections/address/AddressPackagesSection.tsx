import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import ButtonsFilter from '@/components/ui/sorting/ButtonsFilter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
// import SelectSort from '@/components/ui/sorting/SelectSort';
import { getTranslations } from 'next-intl/server';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { getPackages } from '@/lib/addressDataFetch';
import PackagesError from '@/components/ui/errors/PackagesError';

const DEFAULT_FILTER = 'all';
const DEFAULT_SORT = 'default';
const FILTER_OPTIONS = ['all', 'internet', 'internet-tv'];
const SORT_OPTIONS = ['default', 'price_asc', 'price_desc', 'speed_desc'];

export default async function AddressPackagesSection({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const t = await getTranslations(['AddressPage', 'Errors']);

    const activeFilter = FILTER_OPTIONS.includes(searchParams.filter)
        ? searchParams.filter
        : DEFAULT_FILTER;
    const selectedSortOption = SORT_OPTIONS.includes(searchParams.sort)
        ? searchParams.sort
        : DEFAULT_SORT;

    const cookieString = getCookie('ADDRESS', { cookies }) as string;
    const { city, county, street, streetNr } = getAddressCookieValues(cookieString);

    let err = 'noPackages';
    const packages = await getPackages(activeFilter, city, county, street, streetNr).catch(
        (error) => {
            err = error.message;
            return [];
        },
    );

    if (packages.length === 0)
        return (
            <div className="container">
                <PackagesError>{t(`Errors.${err}`)}</PackagesError>
            </div>
        );

    return (
        <SectionLayout className="pt-24">
            <H2>{t('AddressPage.packagesSection.title')}</H2>
            <div className="mb-12">
                <ButtonsFilter filters={FILTER_OPTIONS.reduce((acc, filter) => ({
                    ...acc,
                    [filter]: filter === activeFilter,
                }), {})} />
                {/* <SelectSort options={SORT_OPTIONS} selectedOption={selectedSortOption} /> */}
            </div>
            <Packages filter={activeFilter} initialPackages={packages} />
        </SectionLayout>
    );
}
