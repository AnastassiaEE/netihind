'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/address/packages/Packages';
import ButtonsFilter from '@/components/ui/sorting/ButtonsFilter';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    SERVICES,
    SORT_OPTIONS,
    getActiveService,
    getSelectedSortOption,
} from '@/utils/packagesHelper';
import React from 'react';
import PackageCard from '@/components/ui/address/packages/PackageCard';
import Button from '@/components/ui/form/buttons/Button';
// import Modal from '@/components/ui/modal/Modal';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
// import CheckboxFilter from '@/components/ui/sorting/CheckboxFilter';

export default function AddressPackagesSection({
    packages,
}: {
    packages?: { [key: string]: string }[];
}) {
    const t = useTranslations('AddressPage');
    const searchParams = useSearchParams();

    // const activeService = getActiveService(searchParams.get('filter'));

    // const servicesWithState = SERVICES.reduce(
    //     (acc, service) => ({
    //         ...acc,
    //         [service]: service === activeService,
    //     }),
    //     {},
    // );

    const selectedSortOption = getSelectedSortOption(searchParams.get('sort'));

    return (
        <SectionLayout>
            <h1 className="text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6">
                {t('packagesSection.title')}
            </h1>
            <div className="md:flex gap-5">
                <div className="md:w-4/5">
                    {/* <div className="mb-6">
                        <ButtonsFilter options={servicesWithState} />
                    </div> */}
                    <div className="max-md:hidden my-4 flex justify-end">
                        <Sort options={SORT_OPTIONS} selectedOption={selectedSortOption} variant="flat" />
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

                    {/* <CheckboxFilter name="providers" /> */}


                </div>
            </div>
            <SortingToolbar className="md:hidden">
                <Button>Filter</Button>
                <Sort options={SORT_OPTIONS} selectedOption={selectedSortOption} variant="secondary" openDirection="top" />
            </SortingToolbar>
        </SectionLayout>
    );
}
