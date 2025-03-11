'use client';

import SectionLayout from '@/layouts/SectionLayout';
import Button from '@/components/ui/form/buttons/Button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function RelatedBlogPostsSection() {
    const t = useTranslations('BlogPage');
    return (
        <SectionLayout>
            <div className="md:flex md:justify-end">
                <Link href="/blog" passHref>
                    <Button variant="outlined" size="lg" className="w-full md:w-auto">
                        {t('buttons.allPosts')}
                    </Button>
                </Link>
            </div>
        </SectionLayout>
    );
}
