import { H2 } from '@/components/ui/headings/RestPageHeadings';
import AddressProviderCards from '@/components/ui/address/providers/AddressProviderCards';
import SectionLayout from '@/layouts/SectionLayout';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function AddressProvidersSection({
    providers,
}: {
    providers: { name: string; img: string }[];
}) {
    const t = useTranslations('AddressPage');
    return (
        <SectionLayout className="py-8" bg="bg-primary-light">
            <H2>{t('providersSection.title')}</H2>
            <AddressProviderCards providers={providers} />
        </SectionLayout>
    );
}
