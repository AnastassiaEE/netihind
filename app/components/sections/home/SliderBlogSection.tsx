import SectionLayout from '@/layouts/SectionLayout';
import BlogCardsWrapper from '@/components/ui/blog/BlogCardsWrapper';
import SliderBlogCards from '@/components/ui/blog/SliderBlogCards';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { useTranslations } from 'next-intl';

export default function SliderBlogSection() {
    const t = useTranslations('HomePage');
    return (
        <SectionLayout bg="bg-neutral-light" className="py-24">
            <H2 className="text-center !mb-10">{t('blogSection.title')}</H2>
            <BlogCardsWrapper>
                <SliderBlogCards />
            </BlogCardsWrapper>
        </SectionLayout>
    );
}
