import ListBlogSectionHeader from "@/components/sections/blog/ListBlogSectionHeader";
import BlogCardsWrapper from "@/components/ui/blog/BlogCardsWrapper";
import ListBlogCards from "@/components/ui/blog/ListBlogCards";
import SectionLayout from "@/layouts/SectionLayout";

export default function ListBlogSection({ locale }: { locale: string }) {
    return (
        <SectionLayout>
            <ListBlogSectionHeader />
            <BlogCardsWrapper locale={locale}>
                <ListBlogCards />
            </BlogCardsWrapper>
        </SectionLayout >
    )
}