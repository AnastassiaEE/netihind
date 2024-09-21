import { Suspense } from 'react';
import AddressProvidersSection from '@/components/sections/address/AddressProvidersSection';
import AddressTariffsSection from '@/components/sections/address/AddressTariffsSection';
import Loading from './loading';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <AddressProvidersSection />
            <AddressTariffsSection />
        </Suspense>
    );
}
