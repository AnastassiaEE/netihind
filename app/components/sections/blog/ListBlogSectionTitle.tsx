'use client';

import { useTranslation } from 'react-i18next';

export default function ListBlogSectionTitle() {
    const { t } = useTranslation('blog');
    return (
        <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10">{t('title')}</h1>
    );
}
