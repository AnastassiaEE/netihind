'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    SERVICES,
    getProviderOptions,
    getSortOptions,
} from '@/utils/packagesHelper';
import React from 'react';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import Button from '@/components/ui/form/buttons/Button';
// import Modal from '@/components/ui/modal/Modal';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
// import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';
import { getProviders } from '@/lib/addressDataFetch';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';

export default function AddressPackagesSection() {
    const t = useTranslations('AddressPage');
    const searchParams = useSearchParams();
    const cookieString = getCookie('ADDRESS')!;
    const { fullAddress, oid } = getAddressCookieValues(cookieString);

    const sortOptions = getSortOptions(searchParams.get('sort'));

    // const providers = await getProviders(oid).catch((error) => {
    //     return [];
    // });
    // const providerOptions = getProviderOptions(providers);
    // //const selectedProviderOptions = getSelectedProviderOptions()
    // console.log(providerOptions)

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6">
                {t('packagesSection.title')}
            </h1>
            <div className="md:flex gap-5">
                <div className="md:w-4/5">
                    <div className="max-md:hidden my-4 flex justify-end">
                        <Sort options={sortOptions} variant="flat" />
                    </div>
                    {/* <Packages filter={activeFilter} initialPackages={packages} /> */}

                    <PackageCard originalPrice={50.99} promoPrice={40.99} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                    <PackageCard originalPrice={25.99} promoPrice={null} className="mb-4" />
                    {/* <div className="text-center">
                        <Button variant="flat" size="lg">
                            {t('buttons.showMore')}
                        </Button>
                    </div> */}
                </div>
                <div className="hidden md:block md:w-1/5">

                    {/* <CheckboxFilter name="providers" options={ } /> */}


                </div>
            </div>
            <SortingToolbar className="md:hidden">
                <Button>Filter</Button>
                <Sort options={sortOptions} variant="secondary" openDirection="top" />
            </SortingToolbar>
        </SectionLayout>
    );
}
