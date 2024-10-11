import ListBlogSection from '@/components/sections/blog/ListBlogSection';
import BlogCardsWrapper from '@/components/ui/blog/BlogCardsWrapper';
import ListBlogCards from '@/components/ui/blog/ListBlogCards';

export default function Blog({ params: { locale } }: { params: { locale: string } }) {
    return (
        <ListBlogSection>
            <BlogCardsWrapper locale={locale}>
                <ListBlogCards />
            </BlogCardsWrapper>
        </ListBlogSection>
    );
}
