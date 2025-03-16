import BlogCardsWrapper from '@/components/dataWrappers/BlogCardsWrapper';
import ListBlogCards from '@/components/ui/blog/ListBlogCards';
import SectionLayout from '@/layouts/SectionLayout';
import { H1 } from '@/components/ui/headings/RestPageHeadings';
import { useTranslations } from 'next-intl';

export default function ListBlogSection() {
  const t = useTranslations('BlogPage');
  return (
    <SectionLayout>
      <H1>{t('title')}</H1>
      <BlogCardsWrapper>
        <ListBlogCards />
      </BlogCardsWrapper>
    </SectionLayout>
  );
}
