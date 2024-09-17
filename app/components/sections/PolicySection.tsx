'use client';

import SectionLayout from '@/layouts/SectionLayout';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import PingLoader from '../loaders/PingLoader';
import MdxLayout from '@/layouts/MdxLayout';

export default function PolicySection() {
    const { t } = useTranslation('policy');

    const PolicyMdx = dynamic(() => import('' + '@/markdown/et/policy.mdx'), {
        loading: () => <PingLoader />,
    });
    return (
        <SectionLayout>
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{t('title')}</h1>
            <MdxLayout>
                <PolicyMdx />
            </MdxLayout>
        </SectionLayout>
    );
}
