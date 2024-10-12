import SectionLayout from '@/layouts/SectionLayout';
import BlogCardsWrapper from '@/components/ui/blog/BlogCardsWrapper';
import SliderBlogCards from '@/components/ui/blog/SliderBlogCards';
import { H2 } from '@/components/ui/headings/HomePageHeadings';
import { i18n } from 'i18next';

export default function SliderBlogSection({
    i18n,
}: {
    i18n: i18n;
}) {
    return (
        <SectionLayout bg="bg-neutral-light" className="py-24">
            <H2 className="text-center mb-10">{i18n.t('blog-section.title')}</H2>
            <BlogCardsWrapper i18n={i18n}>
                <SliderBlogCards />
            </BlogCardsWrapper>
        </SectionLayout>
    );
}
