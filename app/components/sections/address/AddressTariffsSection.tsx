'use client'

import SectionLayout from '@/layouts/SectionLayout';
import addressTariffs from '@/data/addressTariffs';
import Tariffs from '@/components/ui/tariffs/Tariffs';
import TariffsButtonsFilter from '@/components/ui/tariffs/TariffsButtonsFilter';
import { useTranslation } from 'react-i18next';

export default function AddressTariffsSection() {
    const { t } = useTranslation(['tariffs'])
    return (
        <SectionLayout className="pt-24">
            <h2 className="text-3xl font-extrabold mb-10">{t('title')}</h2>
            <div className="mb-12">
                <TariffsButtonsFilter />
            </div>
            <Tariffs items={addressTariffs} />
        </SectionLayout>
    );
}
