'use client'

import SectionLayout from '@/layouts/SectionLayout';
import addressTariffs from '@/data/addressTariffs';
import Tariffs from '@/components/ui/tariffs/Tariffs';
import TariffsButtonsFilter from '@/components/ui/tariffs/TariffsButtonsFilter';

export default function AddressTariffsSection() {
    return (
        <SectionLayout className="pt-24">
            <h2 className="text-3xl font-extrabold mb-10">{'title'}</h2>
            <div className="mb-12">
                <TariffsButtonsFilter />
            </div>
            <Tariffs items={addressTariffs} />
        </SectionLayout>
    );
}
