import SectionLayout from '@/layouts/SectionLayout';
import BlogCardsWrapper from '@/components/dataWrappers/BlogCardsWrapper';
import BlogSlider from '@/components/ui/blog/BlogSlider';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import PingLoader from '@/components/ui/loaders/PingLoader';

export default function BlogSection() {
  const t = useTranslations('HomePage.blogSection');
  return (
    <SectionLayout bg="bg-primary-light" className="py-24">
      <H2 className="mb-10! text-center">{t('title')}</H2>
      <Suspense fallback={<PingLoader />}>
        <BlogCardsWrapper>
          <BlogSlider />
        </BlogCardsWrapper>
      </Suspense>
    </SectionLayout>
  );
}
