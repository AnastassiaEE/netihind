import BlogCardsWrapper from '@/components/dataWrappers/BlogCardsWrapper';
import BlogList from '@/components/ui/blog/BlogList';
import SectionLayout from '@/layouts/SectionLayout';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import { useTranslations } from 'next-intl';

export default function BlogSection() {
  const t = useTranslations('BlogPage');
  return (
    <SectionLayout>
      <H1>{t('title')}</H1>
      <BlogCardsWrapper>
        <BlogList />
      </BlogCardsWrapper>
    </SectionLayout>
  );
}
