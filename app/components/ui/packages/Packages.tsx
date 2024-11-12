import PackagesTable from '@/components/ui/packages/PackagesTable';
import PackagesList from '@/components/ui/packages/PackagesList';
import { supabase } from '@/app/lib/supabase';
import SomethingWentWrongError from '@/components/ui/errors/SomethingWentWrongError';
import NoPackagesError from '@/components/ui/errors/NoPackagesError';

export default async function Packages({
    filter,
}: {
    filter: string;
}) {
    let { data, error } = await supabase.rpc('get_internet_packages_by_address', {
        p_filter: filter,
        p_city: 'Maardu linn',
        p_maakond: 'Harju Maakond',
        p_street: 'Ringi tn 25',
    });

    if (error) return <SomethingWentWrongError />
    if (data.length === 0) return <NoPackagesError />

    return (
        <>
            <PackagesList packages={data} />
            <PackagesTable packages={data} filter={filter} />
        </>
    );
}
