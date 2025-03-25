import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
import {
  SORT_OPTIONS,
  getFilterData,
  getSortSelectedOption,
} from '@/utils/packagesHelper';
import React from 'react';
import Sort from '@/components/ui/sorting/Sort';
import SortingToolbar from '@/components/ui/sorting/SortingToolbar';
import { getCookie } from 'cookies-next';
import { getAddressCookieValues } from '@/utils/addressCookieHelper';
import { cookies } from 'next/headers';
import {
  getPackages,
  getProviders,
  getTechnologies,
} from '@/lib/packagesDataFetch';
import { getTranslations } from 'next-intl/server';
import CheckboxFilters from '@/components/ui/sorting/CheckboxFilters';
import PackagesError from '@/components/ui/errors/PackagesError';
import { Link } from '@/i18n/routing';
import HomeIcon from '@mui/icons-material/Home';

export default async function AddressPackagesSection({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const t = await getTranslations(['AddressPage', 'Packages']);
  const cookieString = getCookie('ADDRESS', { cookies });
  const { fullAddress: address, oid } = getAddressCookieValues(cookieString);
  const providers = await getProviders(oid);
  const technologies = await getTechnologies(oid);

  // Sort options
  const selectedSortOption = getSortSelectedOption(searchParams['sort'] || '');

  // Provider options
  const providerFilterData = getFilterData(
    searchParams,
    'providers',
    'id',
    'name',
    providers,
  );
  const providerSelectedIds = providerFilterData.selected.map(
    (option) => option.value,
  );

  // Technology options
  const technologyFilterData = getFilterData(
    searchParams,
    'technologies',
    'id',
    'abbr',
    technologies,
  );
  const technologySelectedIds = technologyFilterData.selected.map(
    (option) => option.value,
  );

  const filters = {
    providers: providerFilterData,
    technologies: technologyFilterData,
  };

  // Packages
  let error = null;
  const packages: { [key: string]: any }[] = await getPackages(
    oid,
    selectedSortOption,
    providerSelectedIds,
    technologySelectedIds,
  ).catch((e: Error) => {
    error = e?.message;
  });

  return (
    <SectionLayout>
      <h1 className="mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl">
        {t('AddressPage.packagesSection.title')}
      </h1>
      <p className="mb-6 font-medium">
        <HomeIcon className="mr-1 inline align-sub text-primary" />
        {address}
      </p>
      {providers.length === 0 && technologies.length === 0 && error ? (
        <PackagesError>
          {t.rich('Packages.' + error, {
            a: (chunks) => (
              <Link href="/contacts" className="font-extrabold underline">
                {chunks}
              </Link>
            ),
          })}
        </PackagesError>
      ) : (
        <>
          <div className="md:flex md:justify-between">
            <div className="md:w-8/12">
              <div className="my-4 flex justify-end max-md:hidden">
                <Sort
                  name="packages"
                  variant="desktop"
                  options={SORT_OPTIONS}
                  selected={selectedSortOption}
                  className="rounded-md border border-muted-light"
                />
              </div>
              <Packages
                oid={oid}
                address={address}
                initialPackages={packages}
                initialError={error}
                sortOption={selectedSortOption}
                providers={providerSelectedIds}
                technologies={technologySelectedIds}
              />
            </div>
            <div className="hidden md:block md:w-3/12">
              <CheckboxFilters
                filters={filters}
                className="rounded-lg bg-primary-light/40 p-8 shadow-md"
              />
            </div>
          </div>
          <SortingToolbar
            className="md:hidden"
            sortOptions={{
              options: SORT_OPTIONS,
              selected: selectedSortOption,
            }}
            filters={filters}
          />
        </>
      )}
    </SectionLayout>
  );
}
