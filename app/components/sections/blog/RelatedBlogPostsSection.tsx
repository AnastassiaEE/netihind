'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Button from '@/components/ui/form/buttons/Button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function RelatedBlogPostsSection() {
    const { t } = useTranslation('blog');
    return (
        <SectionLayout>
            <div className="flex justify-end">
                <Link href="/blog" className="w-full md:w-72">
                    <Button variant="secondary" size="lg" className="w-full">
                        {t('buttons.all-posts')}
                    </Button>
                </Link>
            </div>
        </SectionLayout>
    );
}
