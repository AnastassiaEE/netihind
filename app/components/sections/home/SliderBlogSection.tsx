import SectionLayout from '@/layouts/SectionLayout';
import BlogCardsWrapper from '@/components/ui/blog/BlogCardsWrapper';
import SliderBlogCards from '@/components/ui/blog/SliderBlogCards';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';

export default function SliderBlogSection() {
    const t = useTranslations('HomePage');
    return (
        <SectionLayout bg="bg-primary-light" className="py-24">
            <H2 className="!mb-10 text-center">{t('blogSection.title')}</H2>
            <Suspense fallback={<PingLoader />}>
                <BlogCardsWrapper>
                    <SliderBlogCards />
                </BlogCardsWrapper>
            </Suspense>
        </SectionLayout>
    );
}
