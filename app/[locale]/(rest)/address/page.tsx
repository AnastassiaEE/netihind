import { Suspense } from 'react';
import AddressProvidersSection from '@/components/sections/AddressProvidersSection';
import AddressTariffsSection from '@/components/sections/AddressTariffsSection';
import Loading from './loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <AddressProvidersSection />
            <AddressTariffsSection />
        </Suspense>
    );
}
