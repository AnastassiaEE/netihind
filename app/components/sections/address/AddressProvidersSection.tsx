import AddressProvidersLoader from '@/components/ui/loaders/AddressProvidersLoader';
import AddressProviderCards from '@/components/ui/providers/AddressProviderCards';
import AddressProviderCardsWrapper from '@/components/ui/providers/AddressProviderCardsWrapper';
import SectionLayout from '@/layouts/SectionLayout';
import React, { Suspense } from 'react';

export default function AddressProvidersSection() {
    return (
        <SectionLayout className="py-16" bg="bg-neutral-light">
            <Suspense fallback={<AddressProvidersLoader />}>
                <AddressProviderCardsWrapper>
                    <AddressProviderCards />
                </AddressProviderCardsWrapper>
            </Suspense>
        </SectionLayout>
    );
}
