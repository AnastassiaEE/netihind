'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Tariffs from '@/components/ui/tariffs/Tariffs';
import Select from '@/components/ui/form/fields/Select';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ButtonsFilter from '@/components/ui/filter/ButtonsFilter';

export default function AddressProvidersSection({
    packages,
    searchParams,
}: {
    packages: { [key: string]: any }[],
    searchParams: { [key: string]: {} }
}) {
    return (
        <SectionLayout className="pt-24">
            <h2 className="text-3xl font-extrabold mb-10">{'title'}</h2>
            <div className="mb-12">
                <ButtonsFilter filters={searchParams.filters} />
                <Select name={''} value={''}>
                    hello
                </Select>
            </div>
            {/* <Tariffs items={filteredTariffs} /> */}
        </SectionLayout>
    );
}
