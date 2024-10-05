'use client';

import SectionLayout from '@/layouts/SectionLayout';
import posts from '@/data/posts';
import { useTranslation } from 'react-i18next';
import SliderBlogCards from '@/components/ui/blog/SliderBlogCards';

export default function SliderBlogSection({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    return (
        <SectionLayout bg="bg-neutral-light" className="py-24">
            <h2 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold text-center mb-10">
                {t('blog-section.title')}
            </h2>
            {children}
        </SectionLayout>
    );
}
