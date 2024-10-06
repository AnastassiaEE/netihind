'use client';

import SectionLayout from '@/layouts/SectionLayout';
import { useTranslation } from 'react-i18next';

export default function ListBlogSection({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation('blog');
    return (
        <SectionLayout>
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{t('title')}</h1>
            {children}
        </SectionLayout>
    );
}
