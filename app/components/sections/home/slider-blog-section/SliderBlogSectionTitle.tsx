'use client';

import { useTranslation } from 'react-i18next';

export default function SliderBlogSectionTitle() {
    const { t } = useTranslation();
    return (
        <h2 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold text-center mb-10">
            {t('blog-section.title')}
        </h2>
    );
}
