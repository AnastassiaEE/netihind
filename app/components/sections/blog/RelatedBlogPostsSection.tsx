'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Button from '@/components/ui/form/buttons/Button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function RelatedBlogPostsSection() {
    const { t } = useTranslation('blog');
    return (
        <SectionLayout>
            <div className="md:flex md:justify-end">
                <Link href="/blog" className="md:inline-block">
                    <Button variant="secondary" size="lg" className="w-full">
                        {t('buttons.all-posts')}
                    </Button>
                </Link>
            </div>
        </SectionLayout>
    );
}
