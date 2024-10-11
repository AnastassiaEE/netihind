import SectionLayout from '@/layouts/SectionLayout';
import SliderBlogSectionTitle from '@/components/sections/home/slider-blog-section/SliderBlogSectionTitle';
import BlogCardsWrapper from '@/components/ui/blog/BlogCardsWrapper';
import SliderBlogCards from '@/components/ui/blog/SliderBlogCards';

export default function SliderBlogSection({ locale }: { locale: string }) {
    return (
        <SectionLayout bg="bg-neutral-light" className="py-24">
            <SliderBlogSectionTitle />
            <BlogCardsWrapper locale={locale}>
                <SliderBlogCards />
            </BlogCardsWrapper>
        </SectionLayout>
    );
}
