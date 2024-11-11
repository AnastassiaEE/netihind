import SectionLayout from '@/layouts/SectionLayout';
import Packages from '@/components/ui/packages/Packages';
//import Select from '@/components/ui/form/fields/Select';
import ButtonsFilter from '@/components/ui/filter/ButtonsFilter';
import { H2 } from '@/components/ui/headings/RestPageHeadings';
import { useTranslations } from 'next-intl';

export default function AddressProvidersSection({
    packages,
    searchParams,
}: {
    packages: { [key: string]: any }[];
    searchParams: { [key: string]: {} };
}) {
    const t = useTranslations('AddressPage');
    const activeFilter =
        Object.entries(searchParams.filters).find(([filter, state]) => state === true)?.[0] ?? 'all';
    return (
        <SectionLayout className="pt-24">
            <H2>{t('packagesSection.title')}</H2>
            <div className="mb-12">
                <ButtonsFilter filters={searchParams.filters} />
                {/* <Select name={''} value={''}>
                    hello
                </Select> */}
            </div>
            <Packages packages={packages} filter={activeFilter} />
        </SectionLayout>
    );
}
